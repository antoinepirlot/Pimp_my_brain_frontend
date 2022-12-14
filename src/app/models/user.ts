import { Category } from "./category";

export interface User {
  id_user?: number;
  lastname?: string;
  firstname?: string;
  email: string;
  pseudo?: string;
  sexe?: string;
  phone?: string;
  password?: string;
  average_rating?:number;
  skills?: Array<Category>;
}
