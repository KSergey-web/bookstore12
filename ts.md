Implement an SPA application “Book catalog”. You can use any framework or library.

Requirements:
    1. Store data using Firestore and Firestore SDK;
    2. On the main page the list of all books should be displayed;
    3. Books should be grouped by publication year. Groups should be sorted in descending order (new
    books come first). Books inside a group are sorted alphabetically;
    4. User should be able to add and delete books;
    5. The system should be able to recommend a good book to the user:
        a. A good book should be published at least 3 years ago or earlier;
        b. From all these books you should pick ones with the highest rating;
        c. If there are several good books matching the criteria - pick one at random;

Book data:
- name (required, no longer than 100 characters);
- list of authors (book should have at least one author);
- publication year (optional, greater than 1800);
- rating (optional, integer value from 0 to 10, 0 by default);
- ISBN (optional);

Data output structure sample:
    ● Recommended book
    ● 2020
        ○ Book A
        ○ Book B
    ● 2018
        ○ Book I
        ○ Book W
        ○ Book Q
    ● 2015
         ○ Book E
    ● Books without a year
         ○ Book P
    Additional functionality (optional to implement):

        1. ISBN validation;
        2. Ability to change the grouping criteria (group by rating, author);
        3. Book editing;
    Test data sample:

        The Clean Coder: A Code of Conduct for Professional Programmers
        Author: Martin, Robert
        Publication year: 2011
        Rating: 9
        ISBN: 978-0137081073

        7 Habits Of Highly Effective People
        Author: Covey, Stephen R.
        Publication year: 2004
        Rating: 9
        ISBN: 978-1863500296

        The Color of Magic
        Author: Pratchett, Terry
        Publication year: 2013
        Rating: 8
        ISBN: 9780062225672

        Press Reset: Ruin and Recovery in the Video Game Industry
        Author: Jason Schreier
        Publication year: 2021
        Rating: 10

        The Inmates Are Running the Asylum
        Author: Cooper, Alan
        Publication year: 2004
        Rating: 8
        ISBN: 978-0672326141

        The Three Musketeers
        Author: Alexandre Dumas

        Clean Code: A Handbook of Agile Software Craftsmanship
        Author: Robert C. Martin
        Publication year: 2008
        Rating: 9
        ISBN: 978-0132350884

        George and the Big BangККККККККККККККККККККККККоооооооооооооооооооосяк
        Author: Hawking, Stephen; Hawking, Lucy
        Publication year: 2013
        ISBN: 978-1442440067