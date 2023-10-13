import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DiagnosesForm, Diagnosis} from '../models/diagnosis.model';
import {DiagnosesDisclosure} from '../models/diagnoses-disclosure.model';
import {SystemCode} from '../enums/diagnose';

@Injectable({
   providedIn: 'root'
})
export class DiagnosisService {
   constructor(private http: HttpClient) { }

   getDiagnoses() {
      const params = {IsPublic: 'true', Search: 'Ост'};
      return this.http.get<Diagnosis[]>(`/api/Dictionaries/icpc2`, {params});
   }

   createDiagnosesDisclosure({encounter, diagnoses}: DiagnosesForm): DiagnosesDisclosure {
      const encounterDate = new Date(encounter);
      const timedEncounterDate = new Date();
      timedEncounterDate.setFullYear(encounterDate.getFullYear(), encounterDate.getMonth(), encounterDate.getDate());

      return {
         encounter: {
            date: timedEncounterDate,
         },
         ...(diagnoses.length && {
            conditions: diagnoses.map(({diagnosis: {id, code}, comment}) => {
               return ({
                  onset_date: timedEncounterDate,
                  id: crypto.randomUUID(),
                  context: {
                     identifier: {
                        value: id,
                        type: {
                           coding: [
                              {
                                 code: 'encounter',
                                 system: SystemCode.ENCOUNTER,
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
                           system: SystemCode.DIAGNOSIS,
                        }
                     ]
                  }
               });
            })
         }),
      };
   }
}
