import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Diagnosis, NewDiagnoses} from "../models/diagnosis.model";
import {delay, Observable, of} from "rxjs";
import {DiagnosisDisclosure} from "../models/diagnosis-disclosure.model";
import {API_URL} from "../../../api/constants";

@Injectable({
   providedIn: 'root'
})
export class DiagnosesService {
   constructor(private http: HttpClient) { }

   getDiagnoses(): Observable<Diagnosis[]> {
      const params = {
         IsPublic: 'true', Search: 'Ост'
      }

      /*this.http.get<Diagnosis[]>(`${API_URL}/Dictionaries/icpc2`, {params})*/
      return of([{
         id: 1823,
         chapterNumber: null,
         chapterName: "",
         blockNumber: "",
         blockName: "",
         code: "P01",
         name: "Відчуття тривоги/нервування/напруженості",
         shortName: "",
         isPublic: true
      }, {
         id: 1824,
         chapterNumber: null,
         chapterName: "",
         blockNumber: "",
         blockName: "",
         code: "P02",
         name: "Гостра реакція на стрес",
         shortName: "",
         isPublic: true
      }]).pipe(delay(1000))
   }

   createDiagnosesDisclosure({encounter, diagnoses}: NewDiagnoses): DiagnosisDisclosure {
      return {
         encounter: {
            date: new Date(encounter),
         }, conditions: diagnoses.map(({diagnosis: {id, code}, comment}) => ({
            onset_date: new Date(), id: crypto.randomUUID(), context: {
               identifier: {
                  value: id, type: {
                     coding: [{
                        code: 'encounter', system: 'eHealth/resources',
                     }]
                  },
               },
            }, notes: comment, code: {
               coding: [{
                  code, system: 'eHealth/ICPC2/condition_codes',
               }]
            }
         })),
      }
   }
}
