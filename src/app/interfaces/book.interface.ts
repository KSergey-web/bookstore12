import { StringMap } from "@angular/compiler/src/compiler_facade_interface";

export interface Book{
    name: string;
    authors: Array<string>;
    year?: number;
    rating?: number;
    isbn?: string;
}