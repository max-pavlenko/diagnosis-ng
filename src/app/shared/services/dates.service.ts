import {Injectable} from '@angular/core';

@Injectable({
   providedIn: 'root'
})
export class DatesService {
   static formatDateToYYYYMMDD(date: Date) {
      const year = date.getFullYear();
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');

      return `${year}-${month}-${day}`;
   }

   static isDate(context: unknown): context is Date {
      return context instanceof Date;
   }
}
