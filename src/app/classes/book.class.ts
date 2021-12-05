import { IBook } from "../interfaces/book.interface";
import validator from 'validator';

export class Book {

    static isValidName(name: string): boolean {
        if (!(name)) return false;
        if (validator.isEmpty(name)) return false;
        if (validator.isLength(name, { min: 2, max: 100}) ) return true;
        return false;
    }

    static isISBN(isbn: string): boolean {
        return validator.isISBN(isbn);
    }

    static isValidAuthor(author: string): boolean {
        if (!(author)) return false;
        if (validator.isEmpty(author)) return false;
        if (validator.isLength(author, { min: 2, max: 20}) ) return true;
        return false;
    }

}