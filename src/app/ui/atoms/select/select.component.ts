import {ChangeDetectionStrategy, Component, forwardRef, Input, OnChanges} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Unique} from '../../../shared/types/utility';
import {ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule} from '@angular/forms';
import {TransformerService} from '../../../shared/services/transformer.service';

@Component({
   selector: 'app-select',
   standalone: true,
   imports: [CommonModule, ReactiveFormsModule],
   templateUrl: './select.component.html',
   styleUrls: ['./select.component.scss'],
   providers: [
      {provide: NG_VALUE_ACCESSOR, multi: true, useExisting: forwardRef(() => SelectComponent)},
   ],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectComponent<T extends Unique> implements ControlValueAccessor, OnChanges {
   @Input({required: true}) options: T[] = [];
   @Input({required: true}) getItemName!: (item: T) => string;

   value?: T;
   optionsIdMap: ReturnType<typeof this.toIdMap> = {};
   private onTouch!: () => void;
   private onModelChange!: (value: T) => void;

   constructor(private transformerService: TransformerService) {}

   ngOnChanges() {
      if (!this.options.length) return;
      this.optionsIdMap = this.toIdMap();
      this.writeValue(this.options[0]);
   }

   toIdMap() {
      return this.transformerService.toIdMap(this.options)
   }

   registerOnTouched(fn: typeof this.onTouch) {
      this.onTouch = fn;
   }

   registerOnChange(fn: typeof this.onModelChange) {
      this.onModelChange = fn;
   }

   writeValue(value: T) {
      this.value = value;
   }

   setSelected(id: Unique['id']) {
      const option = this.optionsIdMap[id];
      this.writeValue(option)
      this.onModelChange(option);
      this.onTouch();
   }

   handleSelectChange(event: Event) {
      const target = event.target as HTMLSelectElement;
      this.setSelected(target.value);
   }
}
