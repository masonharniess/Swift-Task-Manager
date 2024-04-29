// Interface for form values and API responses

export interface LoginData {
    email: string;
    password: string;
}

export interface RegistrationData extends LoginData {
    firstName: string;
    lastName: string;
}

export interface ApiResponse {
    message: string;
}
