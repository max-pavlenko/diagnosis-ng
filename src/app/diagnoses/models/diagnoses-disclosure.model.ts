export interface DiagnosesDisclosure {
   encounter: {
      date: Date;
   };
   conditions?: Condition[]
}

type Condition = {
   id: string;
   context: Context;
   code: {
      coding: Coding[];
   };
   notes: string;
   onset_date: Date;
};

type Context = {
   identifier: {
      type: {
         coding: Coding[];
      };
      value: number;
   };
};

type Coding = {
   system: string;
   code: string;
};
