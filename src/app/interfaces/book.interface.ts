import { StringMap } from '@angular/compiler/src/compiler_facade_interface';

export interface Book {
  id?: string;
  name: string;
  authors: Array<string>;
  year?: number;
  rating?: number;
  isbn?: string;
}
