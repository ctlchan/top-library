let myLibrary = [new Book('1984', 'George Orwell', 300, false),
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

function displayBooks(bookList) {

    let htmlBookList = document.querySelector('.book-list');
    

    // Reset list
    while (htmlBookList.lastChild) { htmlBookList.removeChild(htmlBookList.lastChild) };

    let index = 0;

    bookList.forEach((book) => {
        let card = document.createElement('li');
        let title = document.createElement('div');
        let author = document.createElement('div');
        let pages = document.createElement('div');
        let status = document.createElement('div');

        card.classList.add('card');

        // Add information to title div
        title.textContent = book.title;
        title.classList.add('book-title');

        // Add information to author, pages, and status divs
        author.innerHTML = `<span class='bold'>Author: </span>${book.author}`;
        pages.innerHTML =`<span class='bold'>Pages: </span>${book.numPages}`;
        status.innerHTML =`<span class='bold'>Status: </span>${book.complete ? 'Complete':'In progress'}`;

        // Nest created divs to parent card element
        card.appendChild(title);
        card.appendChild(author);
        card.appendChild(pages);
        card.appendChild(status);


        // TODO: Render Delete button
        let deleteBook = document.createElement('button');
        deleteBook.textContent = "Remove";
        deleteBook.addEventListener('click', removeBook);
        card.appendChild(deleteBook);


        card.dataset.index = index;
        index++;


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

function addBook(form, library) {

    // Get form inputs and convert to Array to utilize Array methods
    let temp = form.querySelectorAll('input, select');

    let inputs = Array.from(temp);

    let values = inputs.map((input) => input.value);

    let [title, author, pages, status] = values;

    // Create a new Book object with form values
    library.push(new Book(title, author, pages, (status==="complete" ? true:false)));
    hideAddForm(form);

    // Re-render to UI with the updated array
    displayBooks(library);
}

function removeBook(e) {
    let targetIndex = e.target.parentElement.dataset.index;
    myLibrary.splice(targetIndex, 1);
    displayBooks(myLibrary);
}


// MAIN SCRIPT
displayBooks(myLibrary);

let form = document.querySelector('form');
let [formCancel, formConfirm] = document.querySelectorAll('form button');

formCancel.addEventListener('click', () => { hideAddForm(form) });

form.addEventListener('submit', (e) => {
    e.preventDefault();
    addBook(e.target, myLibrary);
})

