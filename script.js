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
    

    // Reset list
    while (htmlBookList.lastChild) { htmlBookList.removeChild(htmlBookList.lastChild) };


    bookList.forEach((book) => {
        let card = document.createElement('li');
        let title = document.createElement('div');
        let author = document.createElement('div');
        let pages = document.createElement('div');
        // add element for read status

        card.classList.add('card');

        title.textContent = book.title;
        title.classList.add('book-title')
        author.innerHTML = `<span class='bold'>Author: </span>${book.author}`;
        pages.innerHTML =`<span class='bold'>Pages: </span>${book.numPages}`;

        card.appendChild(title);
        card.appendChild(author);
        card.appendChild(pages);

        htmlBookList.appendChild(card);
    });

    // Render "new book" button
    let buttonContainer = document.createElement('li');
    let newBookButton = document.createElement('button');
    newBookButton.textContent = "+";
    newBookButton.classList.add('new-book-btn', 'card');
    newBookButton.addEventListener('click', showAddForm); 


    buttonContainer.appendChild(newBookButton);
    htmlBookList.appendChild(buttonContainer);
}

function showAddForm() {
    let form = document.querySelector('form');
    form.style.visibility = 'visible';
}

function hideAddForm(form) {
    form.style.visibility = 'hidden';
    form.reset();
}

function updateLibrary(form, library) {
    let temp = form.querySelectorAll('input, select');
    console.log(temp);

    let inputs = Array.from(temp);

    let values = inputs.map((input) => input.value);

    let [title, author, pages, status] = values;

    library.push(new Book(title, author, pages, (status==="complete" ? true:false)));
    hideAddForm(form);
    displayBooks(library);
}


// MAIN SCRIPT
displayBooks(myLibrary);

let form = document.querySelector('form');
let [formCancel, formConfirm] = document.querySelectorAll('form button');

formCancel.addEventListener('click', () => { hideAddForm(form) });

form.addEventListener('submit', (e) => {
    e.preventDefault();
    updateLibrary(e.target, myLibrary);
})

