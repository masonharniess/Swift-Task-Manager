// authService.ts

const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const register = async (email: string, password: string, firstName: string, lastName: string) =>
{
    const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email,
            password,
            firstName,
            lastName,
        }),
    });

    if (!response.ok) {
        throw new Error('Registration failed');
    }

    return await response.json()
};

export const login = async (email: string, password: string) => {
    const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email,
            password,
        }),
    });

    if (!response.ok) {
        throw new Error('Login failed');
    }

    const data = await response.json();
    localStorage.setItem('token', data.token);

    return data;
};

export const logout = (): void => {
    localStorage.removeItem('token');
    window.location.href = '/login';
};

export const isAuthenticated = (): boolean => {
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        if (token && !isTokenExpired(token)) {
            return true;
        } else {
            localStorage.removeItem('token'); // Proactively remove expired/invalid tokens
            return false;
        }
    }
    return false;
};
function isTokenExpired(token: string): boolean {
    try {
        const payloadBase64 = token.split('.')[1];
        const decodedJson = atob(payloadBase64); // Decode base64
        const decoded = JSON.parse(decodedJson);
        const exp = decoded.exp; // JWT's "exp" claim, indicating expiration time
        const now = Date.now() / 1000; // Current time in seconds since epoch
        return now > exp;
    } catch (error) {
        console.error("Failed to decode JWT", error);
        return true; // Assume expired on failure to decode
    }
}