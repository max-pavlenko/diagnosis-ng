import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ButtonComponent} from "../../../ui/atoms/button/button.component";
import {SelectComponent} from "../../../ui/atoms/select/select.component";
import {DatePickerComponent} from "../../../ui/atoms/date-picker/date-picker.component";
import {NonNullableFormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {InputComponent} from "../../../ui/atoms/input/input.component";
import {Diagnosis, NewDiagnoses} from "../../models/diagnosis.model";

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
   @Output() submitted = new EventEmitter<NewDiagnoses>();

   today = new Date();
   form = this.nnfb.group({
      encounter: ['', [Validators.required]],
      diagnoses: this.nnfb.array([this.getDefaultDiagnosisGroup()], [Validators.required]),
   });

   constructor(private nnfb: NonNullableFormBuilder) {}

   ngOnChanges() {
      this.diagnosesOptions && this.form.controls.diagnoses.at(0).patchValue({diagnosis: this.diagnosesOptions[0]});
   }

   addDiagnosis() {
      this.form.controls.diagnoses.push(this.getDefaultDiagnosisGroup())
   }

   handleSubmit() {
      if (this.form.invalid) return;
      const value = this.form.getRawValue();
      this.submitted.emit(value);
   }

   getDefaultDiagnosisGroup(diagnosis = this.diagnosesOptions![0]) {
      return this.nnfb.group({
         diagnosis: [diagnosis, [Validators.required]],
         comment: [''],
      });
   }

   getDiagnoseOptionName = ({code, name}: Diagnosis) => {
      return `${code} ${name}`;
   }

   get diagnoses() {
      return this.form.controls.diagnoses;
   }

   get areDiagnoseOptionsAvailable() {
      return !!this.diagnosesOptions;
   }
}
