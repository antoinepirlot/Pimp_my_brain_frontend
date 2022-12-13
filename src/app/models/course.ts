import {Category} from "./category";
import {User} from "./user";

export interface Course {
  id_course?: number;
  id_category?: number;
  category?: Category
  id_teacher?: number;
  teacher?: User
  course_description: string;
  price_per_hour?: number;
  city?: string;
  country?: string;
  level: string;
  sum_stars?:number,
  total_tuples_stars?:number
}