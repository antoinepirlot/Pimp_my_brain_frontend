import { User } from "./user";

export interface Rating {
    rating_text: string;
    rating_number: number;
    id_rater?: number;
    id_rated: number;
    rater?: User
  }
  