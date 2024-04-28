export interface User {
    id?: number;
    firstname?: string;
    lastname?: string;
    email?: string;
    password?: string;
    gender?: string;
    birthdate?: any;
    address?: string;
    city?: string;
    zip?: string;
    insurance_type?: string;
    role?: string;
}

export interface PatientNames {
    id?: number;
    name?: string;
}

export interface LoginUser {
    userEmail?: string;
    userPwd?: string;
}