import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ButtonComponent} from '../../../ui/atoms/button/button.component';
import {SelectComponent} from '../../../ui/atoms/select/select.component';
import {DatePickerComponent} from '../../../ui/atoms/date-picker/date-picker.component';
import {NonNullableFormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {InputComponent} from '../../../ui/atoms/input/input.component';
import {DiagnosesForm, Diagnosis} from '../../models/diagnosis.model';

@Component({
   selector: 'app-form-diagnoses',
   standalone: true,
   imports: [CommonModule, ButtonComponent, SelectComponent, DatePickerComponent, ReactiveFormsModule, InputComponent],
   templateUrl: './form-diagnoses.component.html',
   styleUrls: ['./form-diagnoses.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormDiagnosesComponent implements OnChanges {
   @Input({required: true}) diagnosesOptions: Diagnosis[] | null = [];
   @Output() submitted = new EventEmitter<DiagnosesForm>();

   today = new Date();
   form = this.nnfb.group({
      encounter: ['', [Validators.required]],
      diagnoses: this.nnfb.array([this.getDefaultDiagnosisGroup()]),
   });

   constructor(private nnfb: NonNullableFormBuilder) {}

   get diagnoses() {
      return this.form.controls.diagnoses;
   }

   get areDiagnoseOptionsAvailable() {
      return !!this.diagnosesOptions;
   }

   ngOnChanges() {
      const defaultDiagnosisOption = this.getDefaultDiagnosisGroup().value.diagnosis;
      if (!defaultDiagnosisOption) return;
      this.diagnoses.controls.forEach(control => {
         control.patchValue({diagnosis: defaultDiagnosisOption});
      });
   }

   addDiagnosis() {
      this.form.controls.diagnoses.push(this.getDefaultDiagnosisGroup());
   }

   removeDiagnosis() {
      if (this.diagnoses.length === 0) return;
      const {length} = this.form.controls.diagnoses;
      this.form.controls.diagnoses.removeAt(length - 1);
   }

   handleSubmit() {
      if (this.form.invalid) return;
      const value = this.form.getRawValue();
      this.submitted.emit(value);
   }

   getDefaultDiagnosisGroup(diagnosis = this.diagnosesOptions?.[0]!) {
      return this.nnfb.group({
         diagnosis: [diagnosis, [Validators.required]],
         comment: [''],
      });
   }

   getDiagnoseOptionName = ({code, name}: Diagnosis) => {
      return `${code} ${name}`;
   };
}
