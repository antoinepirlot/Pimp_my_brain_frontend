import { HttpErrorResponse} from '@angular/common/http';
import { throwError } from "rxjs";

export function handleError(error : HttpErrorResponse) {
    return throwError(() => {
        if(error) throw error;
        else new Error('Server Error')}
    ); 
}