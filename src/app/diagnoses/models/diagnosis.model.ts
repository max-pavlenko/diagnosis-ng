export interface Diagnosis {
   name: string;
   code: string;
   id: number;
}

export interface NewDiagnoses {
   encounter: string,
   diagnoses: { diagnosis: Diagnosis, comment: string }[]
}
