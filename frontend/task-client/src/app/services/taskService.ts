// taskService.ts

const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

// Helper function to enable secure fetch requests
async function secureFetch(url: string, options: RequestInit): Promise<any> {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('Authentication token not found');
    }

    const headers = {
        ...options.headers,
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    };

    const response = await fetch(url, { ...options, headers });

    if (!response.ok) {
        const text = await response.text();
        try {
            const errorData = JSON.parse(text);
            throw new Error(errorData.message || 'An error occurred');
        } catch {
            throw new Error(text || 'An error occurred');
        }
    }

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.indexOf('application/json') !== -1) {
        return response.json();
    }

    return null;
}

// CREATE REQUESTS

export const createTask = async (name: string) => {
    return secureFetch(`${API_URL}/task`, {
        method: 'POST',
        body: JSON.stringify({ name }),
    });
};

// READ REQUESTS

export const fetchTasks = async () => {
    return secureFetch(`${API_URL}/tasks`, {
        method: 'GET',
    });
};

// UPDATE REQUESTS

export const archiveTask = async (taskId: string): Promise<void> => {
    const patchDocument = [
        { op: "replace", path: "/isArchived", value: true }
    ];

    return secureFetch(`${API_URL}/task/${taskId}`, {
        method: 'PATCH',
        body: JSON.stringify(patchDocument),
    });
};

export const unarchiveTask = async (taskId: string): Promise<void> => {
    const patchDocument = [
        { op: "replace", path: "/isArchived", value: false }
    ];

    return secureFetch(`${API_URL}/task/${taskId}`, {
        method: 'PATCH',
        body: JSON.stringify(patchDocument),
    });
};

export const updateTaskCompletion = async (taskId: string, isCompleted: boolean) => {
    const patchDocument = [
        { op: "replace", path: "/isCompleted", value: isCompleted }
    ];

    return secureFetch(`${API_URL}/task/${taskId}`, {
        method: 'PATCH',
        body: JSON.stringify(patchDocument),
    });
};

export const updateTaskName = async (taskId: string, newName: string) => {
    const patchDocument = [
        { op: "replace", path: "/name", value: newName }
    ];

    return secureFetch(`${API_URL}/task/${taskId}`, {
        method: 'PATCH',
        body: JSON.stringify(patchDocument),
    });
};

// DELETE REQUESTS

export const deleteTask = async (taskId: string): Promise<void> => {
    return secureFetch(`${API_URL}/task/${taskId}`, {
        method: 'DELETE',
    });
};



