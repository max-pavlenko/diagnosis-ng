import {ChangeDetectionStrategy, Component, inject, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DatesService} from '../../../shared/services/dates.service';
import {ControlContainer, ReactiveFormsModule} from '@angular/forms';

function formatDate(date?: unknown) {
   if (!DatesService.isDate(date)) return '';
   return DatesService.formatDateToYYYYMMDD(date);
}

@Component({
   selector: 'app-date-picker',
   standalone: true,
   imports: [CommonModule, ReactiveFormsModule],
   templateUrl: './date-picker.component.html',
   styleUrls: ['./date-picker.component.scss'],
   viewProviders: [{provide: ControlContainer, useFactory: () => inject(ControlContainer, {skipSelf: true})}],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatePickerComponent {
   @Input() class = '';
   @Input() label = '';
   @Input({required: true}) name = '';
   @Input({transform: formatDate}) min?: Date;
   @Input({transform: formatDate}) max?: Date;
}
