import {ChangeDetectionStrategy, Component, inject, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ControlContainer, ReactiveFormsModule} from "@angular/forms";

@Component({
   selector: 'app-input',
   standalone: true,
   imports: [CommonModule, ReactiveFormsModule],
   templateUrl: './input.component.html',
   styleUrls: ['./input.component.scss'],
   viewProviders: [{provide: ControlContainer, useFactory: () => inject(ControlContainer, {skipSelf: true})}],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputComponent {
   @Input() placeholder = '';
   @Input({required: true}) name = '';
}
