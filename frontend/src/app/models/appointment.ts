export interface Appointment {
    id?: number;
    user_patient_id?: number;
    appointment_date?: string;
    appointment_time?: string;
    appointment_doctor_type?: string;
    appointment_doctor_id?: number;
    appointment_reason?: string;
    appointment_status?: string;
    patient_name?: string;
    doctor?: string;
    place?: string;
    patient?: string;
    date_time?: string;
}

// for calendar on doctor's dashboard
export interface AppointmentsCalendar {
    id?: number;
    title?: string;
    start?: string;
    url?: string; // actually appointment_reason -> fullcalendar doesn't allow additional variables, can only used the provided ones
}