import { StringMap } from "@angular/compiler/src/compiler_facade_interface";

export interface Book{
    
    name: string;
    yaer: Date;
    rating: number;
    authors: Array<string>;
    ISBN: string;
    
}