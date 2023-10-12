export interface Diagnosis {
   name: string;
   code: string;
   id: number;
}

export interface DiagnosesForm {
   encounter: string,
   diagnoses: { diagnosis: Diagnosis, comment: string }[]
}
