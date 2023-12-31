let myLibrary = [];

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
        let statusText = document.createElement('div');
        let statusUpdate = document.createElement('img');
        let cardHeading = document.createElement('div');
        let mainInfo = document.createElement('div');
        let otherInfo = document.createElement('div');

        card.classList.add('card');

        // Add information to title div
        title.textContent = book.title;
        title.classList.add('book-title');


        // Render Delete button
        let deleteImg = document.createElement('img');
        deleteImg.alt = 'Delete book';
        deleteImg.src = './icons/close.svg';
        deleteImg.addEventListener('click', removeBook);
        deleteImg.classList.add('delete-icon');

        // cardHeading = title + delete button
        cardHeading.appendChild(title);
        cardHeading.appendChild(deleteImg);
        cardHeading.classList.add('flex-space-between');
        
        // Set up author div, append as mainInfo
        author.textContent = `by ${book.author}`;
        mainInfo.append(cardHeading, author);

        pages.innerHTML =`<span class='bold'>Pages: </span>${book.numPages}`;

        // Create status div, and set-up behavior for updating the status
        statusText.innerHTML =`<span class='bold'>Status: </span>${book.complete ? 'Complete':'In progress'}`;
        statusUpdate.src = './icons/square-edit-outline.svg';
        statusUpdate.addEventListener('click', showStatusMenu);
        status.append(statusText, statusUpdate);
        status.classList.add('status', 'flex-space-between');

        otherInfo.append(pages, status);

        card.dataset.index = index;
        index++;

        // Append nested children to main .card div
        card.append(mainInfo, otherInfo)

        card.classList.add('flex-space-between-col')

        htmlBookList.appendChild(card);
    });

    // Render "new book" buttons
    let buttonContainer = document.createElement('li');
    let newBookButton = document.createElement('img');
    newBookButton.src = './icons/plus.svg';
    newBookButton.alt = 'Button to add a new book';
    buttonContainer.id = 'new-book-btn';
    buttonContainer.classList.add('card', 'flex-full-center');
    newBookButton.classList.add('new-book-btn');
    buttonContainer.addEventListener('click', showAddForm); 


    buttonContainer.appendChild(newBookButton);
    htmlBookList.appendChild(buttonContainer);
}

function showAddForm() {
    console.log('click');
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

function showStatusMenu(e) {

    let menu = document.querySelector('div.pop-up');
    menu.style.visibility = 'visible';

    // Get buttons by querying, converting NodeList to Array, and destructuring
    let [incomplete, complete] = Array.from(document.querySelectorAll('div.pop-up input'));

    let targetIndex = e.target.parentElement.parentElement.parentElement.dataset.index;

    if (myLibrary[targetIndex].complete) {
        complete.checked = true;
    }
    else {
        incomplete.checked = true;
    }


    let confirm = document.querySelector('div.pop-up button');
    confirm.addEventListener('click', function hideMenu() {
        menu.style.visibility = 'hidden';
        updateStatus(complete, targetIndex);
        confirm.removeEventListener('click', hideMenu);
    });

}

function updateStatus(complete, index) {

    let currentStatus = myLibrary[index].complete;

    // Compare existing status (true or false) with whether "complete" was toggled -> toggle status if they aren't the same
    if (complete.checked != currentStatus) {
        myLibrary[index].complete = !myLibrary[index].complete;
        displayBooks(myLibrary);
        
        /* Truth Table
            complete.checked | currentStatus | action
                    T        |       T       |  do nothing
                    T        |       F       | toggle F to T
                    F        |       T       | toggle T to F
                    F        |       F       | do nothing

            
            Explanation: if complete.checked is False, then incomplete.checked is True - thus, the state of complete.checked reflects the desired state of currentStatus
        */
    }

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

