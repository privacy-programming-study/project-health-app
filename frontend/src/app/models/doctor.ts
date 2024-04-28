export interface Doctor {
    id?: number;
    firstname?: string;
    lastname?: string;
    email?: string;
    password?: string;
    birthdate?: any;
    gender?: string;
    work_address?: string;
    work_city?: string;
    work_zip?: string;
    specialization_type?: string;
    role?: string;
}

export interface LoginDoctor {
    docEmail?: string;
    docPwd?: string;
}

export interface DoctorNameSpecialization {
    id?: number;
    name?: string;
    specialization_type?: string;
}