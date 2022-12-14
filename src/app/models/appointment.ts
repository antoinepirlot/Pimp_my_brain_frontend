export interface Appointment {
  id_course: number;
  id_student: number;
  appointment_state?: string;
  appointment_date: string;
  street: string;
  number_house: number;
  box_house?: string;
}
