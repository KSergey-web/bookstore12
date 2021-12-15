import { StringMap } from '@angular/compiler/src/compiler_facade_interface';
import { BookOptionalProperties } from './book-optional-properties.interface';

export interface Book extends BookOptionalProperties {
  id?: string;
  name: string;
  authors: Array<string>;
}
