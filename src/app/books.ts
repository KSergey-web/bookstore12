import { Book } from "./interfaces/book.interface";
let date: Date = new Date()
export const books: Array<Book> = [{
    name: 'The Clean Coder: A Code of Conduct for Professional Programmers',
    authors: ["Martin", "Robert"],
    year: date,
    rating: 9,
    isbn: "978-0137081073",
},
{
    name: "7 Habits Of Highly Effective People",
    authors: ["Covey", "Stephen R."],
    year: date,
    rating: 9,
    isbn: "978-1863500296",
},
{
    name: "The Color of Magic",
    authors: ["Pratchett", "Terry"],
    year: date,
    rating: 8,
    isbn: "9780062225672",
},
{
    name: "Press Reset: Ruin and Recovery in the Video Game Industry",
    authors: ["Jason Schreier"],
    year: date,
    rating: 10,
},
{
    name: "The Inmates Are Running the Asylum",
    authors: ["Cooper", "Alan"],
    year: date,
    rating: 8,
    isbn: "978-0672326141",
},
{
    name: "The Three Musketeers",
    authors: ["Alexandre Dumas"],
},
{
    name: "Clean Code: A Handbook of Agile Software Craftsmanship",
    authors: ["Robert C. Martin"],
    year: date,
    rating: 9,
    isbn: "978-0132350884",
},
{
    name: "George and the Big Bang",
    authors: ["Hawking Stephen", "Hawking Lucy"],
    year: date,
    isbn: "978-1442440067",
}
]