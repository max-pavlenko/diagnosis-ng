import {Injectable} from '@angular/core';
import {Unique} from "../types";

@Injectable({
  providedIn: 'root'
})
export class TransformerService {
  toIdMap<T extends Unique>(items: T[]) {
    return items.reduce((acc, item) => ({...acc, [item.id]: item}), {} as Record<Unique['id'], T>);
  }
}
