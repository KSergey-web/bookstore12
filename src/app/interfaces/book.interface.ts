import { StringMap } from "@angular/compiler/src/compiler_facade_interface";

export interface Book{
    name: string;
    year?: Date;
    rating?: number;
    authors: Array<string>;
    isbn?: string;
}