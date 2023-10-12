import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ButtonComponent} from './ui/atoms/button/button.component';
import {DatePickerComponent} from './ui/atoms/date-picker/date-picker.component';
import {SelectComponent} from './ui/atoms/select/select.component';
import {FormDiagnosesComponent} from './diagnoses/components/form-diagnoses/form-diagnoses.component';
import {DiagnosesService} from './diagnoses/services/diagnoses.service';
import {AsyncPipe, JsonPipe} from '@angular/common';
import {DiagnosesForm} from './diagnoses/models/diagnosis.model';
import {DiagnosesDisclosure} from './diagnoses/models/diagnosis-disclosure.model';

@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.scss'],
   standalone: true,
   imports: [
      ButtonComponent,
      DatePickerComponent,
      SelectComponent,
      FormDiagnosesComponent,
      AsyncPipe,
      JsonPipe
   ],
   changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
   diagnoses$ = this.diagnosesService.getDiagnoses();
   diagnosesDisclosure?: DiagnosesDisclosure;

   constructor(private diagnosesService: DiagnosesService) {}

   handleDiagnosesSubmit(newDiagnoses: DiagnosesForm) {
      this.diagnosesDisclosure = this.diagnosesService.createDiagnosesDisclosure(newDiagnoses);
   }
}
