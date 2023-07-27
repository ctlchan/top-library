let myLibrary = [new Book('1985', 'George Orwell', 300, false),
                    new Book('Green Eggs and Ham', 'Dr. Seuss', 72, true)];

function Book(title, author, numPages, complete) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.complete = complete;
}

Book.prototype.info = function() {
    return `${this.title} by ${this.author}, ${this.numPages} pages, ${this.complete ? 'complete' : 'not read yet'}`;
}

function addBookToLibrary() {

}

function displayBooks(bookList) {

    let htmlBookList = document.querySelector('.book-list');

    bookList.forEach((book) => {
        let card = document.createElement('li');
        let title = document.createElement('div');
        let author = document.createElement('div');
        let pages = document.createElement('div');
        // add element for read status

        card.classList.add('card')

        title.textContent = book.title;
        title.classList.add('book-title')
        author.innerHTML = `<span class='bold'>Author: </span>${book.author}`;
        pages.innerHTML =`<span class='bold'>Pages: </span>${book.numPages}`;

        card.appendChild(title);
        card.appendChild(author);
        card.appendChild(pages);

        htmlBookList.appendChild(card);

        console.log(book);
    })
}

displayBooks(myLibrary);