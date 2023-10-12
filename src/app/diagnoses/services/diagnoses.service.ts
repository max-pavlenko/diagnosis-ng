import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DiagnosesForm, Diagnosis} from '../models/diagnosis.model';
import {DiagnosesDisclosure} from '../models/diagnosis-disclosure.model';
import {SystemCodes} from '../enums/diagnose';

@Injectable({
   providedIn: 'root'
})
export class DiagnosesService {
   constructor(private http: HttpClient) { }

   getDiagnoses() {
      const params = {IsPublic: 'true', Search: 'Ост'};
      return this.http.get<Diagnosis[]>(`/api/Dictionaries/icpc2`, {params});
   }

   createDiagnosesDisclosure({encounter, diagnoses}: DiagnosesForm): DiagnosesDisclosure {
      const encounterDate = new Date(encounter);
      const timedEncounteredDate = new Date();
      timedEncounteredDate.setFullYear(encounterDate.getFullYear(), encounterDate.getMonth(), encounterDate.getDate());

      return {
         encounter: {
            date: timedEncounteredDate,
         },
         ...(diagnoses.length && {
            conditions: diagnoses.map(({diagnosis: {id, code}, comment}) => {
               return ({
                  onset_date: timedEncounteredDate,
                  id: crypto.randomUUID(),
                  context: {
                     identifier: {
                        value: id,
                        type: {
                           coding: [
                              {
                                 code: 'encounter',
                                 system: SystemCodes.ENCOUNTER,
                              }
                           ]
                        },
                     },
                  },
                  notes: comment,
                  code: {
                     coding: [
                        {
                           code,
                           system: SystemCodes.DIAGNOSIS,
                        }
                     ]
                  }
               });
            })
         }),
      };
   }
}
