const bookContainer = document.querySelector('.book-container');
const popup = document.querySelector('.popup');
const addBookBtn = document.querySelector('.add-book-btn');
const addBookBtnForm = document.querySelector('.add-book');
const cancelBtn = document.querySelector('.cancel');
const inputTitle = document.getElementById('title');
const inputAuthor = document.getElementById('author');
const inputPages = document.getElementById('pages');
const inputRead = document.getElementById('read');
let myLibrary = [];

addBookBtn.addEventListener('click', () => {
    clearInput()
    popup.style.display = 'block';
    addBookBtn.style.display = 'none';
});

cancelBtn.addEventListener('click', () => {
    clearInput()
    popup.style.display = 'none';
    addBookBtn.style.display = 'block';
});

addBookBtnForm.addEventListener('click', () => {
    addBookToLibrary()
    addBookToPage(myLibrary[myLibrary.length - 1])
    clearInput()
    popup.style.display = 'none';
    addBookBtn.style.display = 'block';
})

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
};

function clearInput() {
    inputTitle.value = '';
    inputAuthor.value = '';
    inputPages.value = '';
    inputRead.checked = false;
};

function addBookToLibrary() {
    if (inputTitle.value || inputAuthor.value || inputPages.value) {
        const title = inputTitle.value;
        const author = inputAuthor.value;
        const pages = inputPages.value;
        const read = inputRead.checked;
        const book = new Book(title, author, pages, read);
        myLibrary.push(book);
    };
};

function addBookToPage(book) {
    const indexOfBook = myLibrary.indexOf(book);

    const div = document.createElement('div');
    const title = document.createElement('h3');
    const author = document.createElement('h3');
    const pages = document.createElement('h3');
    const buttonDiv = document.createElement('div');
    const toggleBtn = document.createElement('button');
    const deleteBtn = document.createElement('button');

    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-book');

    div.classList.add('card');
    div.setAttribute('data-index', indexOfBook);
    
    if (book.title) {
        title.textContent = book.title;
    } else {
        title.textContent = 'No title'
    }

    if (book.author) {
        author.textContent = book.author;
    } else {
        author.textContent = 'Unknown author'
    }

    if (book.pages) {
        pages.textContent = book.pages + ' pages';
    } else {
        pages.textContent = 'No pages?';
    }

    if (book.read) {
        toggleBtn.textContent = 'Read';
        toggleBtn.style.backgroundColor = 'rgb(196, 243, 196)';
    } else {
        toggleBtn.textContent = 'Not read';
        toggleBtn.style.backgroundColor = 'rgb(248, 178, 178)';
    }

    div.appendChild(title);
    div.appendChild(author);
    div.appendChild(pages);
    buttonDiv.appendChild(toggleBtn);
    buttonDiv.appendChild(deleteBtn);
    div.appendChild(buttonDiv);

    bookContainer.appendChild(div);

    toggleBtn.addEventListener('click', () => {
        const buttonText = toggleBtn.textContent;
        if (buttonText == 'Not read') {
            toggleBtn.textContent = 'Read'
            toggleBtn.style.backgroundColor = 'rgb(196, 243, 196)'
        } else {
            toggleBtn.textContent = 'Not read'
            toggleBtn.style.backgroundColor = 'rgb(248, 178, 178)'
        }
    });

    deleteBtn.addEventListener('click', () => {
        bookContainer.removeChild(div);
        const index = div.getAttribute('data-index');
        myLibrary.splice(index, 1);
    })
};

