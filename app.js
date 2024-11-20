const bookContainer = document.querySelector(".book-container");
const popup = document.querySelector(".popup");
const addBookBtn = document.querySelector(".add-book-btn");
const addBookBtnForm = document.querySelector(".add-book");
const cancelBtn = document.querySelector(".cancel");
const inputTitle = document.getElementById("title");
const inputAuthor = document.getElementById("author");
const inputPages = document.getElementById("pages");
const inputRead = document.getElementById("read");
const errorMessage = document.querySelector(".error");
let myLibrary = [];

addBookBtn.addEventListener("click", () => {
    clearInput();
    popup.style.display = "block";
    addBookBtn.style.display = "none";
    errorMessage.textContent = "";
});

cancelBtn.addEventListener("click", () => {
    clearInput();
    popup.style.display = "none";
    addBookBtn.style.display = "block";
});

addBookBtnForm.addEventListener("click", () => {
    if (
        inputTitle.validity.valid &&
        inputAuthor.validity.valid &&
        inputPages.validity.valid
    ) {
        addBookToLibrary();
        addBookToPage(myLibrary[myLibrary.length - 1]);
        popup.style.display = "none";
        addBookBtn.style.display = "block";
        errorMessage.textContent = "";
    } else {
        showError();
    }
});

function showError() {
    if (inputTitle.validity.valueMissing) {
        errorMessage.textContent = "The book should have a title";
    } else if (inputAuthor.validity.valueMissing) {
        errorMessage.textContent = "The book should have author";
    } else if (inputPages.validity.valueMissing) {
        errorMessage.textContent = "The book should have pages";
    }
}

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

function clearInput() {
    inputTitle.value = "";
    inputAuthor.value = "";
    inputPages.value = "";
    inputRead.checked = false;
}

function addBookToLibrary() {
    if (inputTitle.value || inputAuthor.value || inputPages.value) {
        const newBook = new Book(
            title.value,
            author.value,
            pages.value,
            read.checked
        );
        myLibrary.push(newBook);
    }
}

function addBookToPage(book) {
    const indexOfBook = myLibrary.indexOf(book);

    const div = document.createElement("div");
    const title = document.createElement("h3");
    const author = document.createElement("h3");
    const pages = document.createElement("h3");
    const buttonDiv = document.createElement("div");
    const toggleBtn = document.createElement("button");
    const deleteBtn = document.createElement("button");

    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-book");

    div.classList.add("card");
    div.setAttribute("data-index", indexOfBook);

    title.textContent = book.title;
    author.textContent = book.author;
    pages.textContent = book.pages + " pages";

    if (book.read) {
        toggleBtn.textContent = "Read";
        toggleBtn.style.backgroundColor = "rgb(196, 243, 196)";
    } else {
        toggleBtn.textContent = "Not read";
        toggleBtn.style.backgroundColor = "rgb(248, 178, 178)";
    }

    div.appendChild(title);
    div.appendChild(author);
    div.appendChild(pages);
    buttonDiv.appendChild(toggleBtn);
    buttonDiv.appendChild(deleteBtn);
    div.appendChild(buttonDiv);

    bookContainer.appendChild(div);

    toggleBtn.addEventListener("click", () => {
        const buttonText = toggleBtn.textContent;
        if (buttonText == "Not read") {
            toggleBtn.textContent = "Read";
            toggleBtn.style.backgroundColor = "rgb(196, 243, 196)";
        } else {
            toggleBtn.textContent = "Not read";
            toggleBtn.style.backgroundColor = "rgb(248, 178, 178)";
        }
    });

    deleteBtn.addEventListener("click", () => {
        bookContainer.removeChild(div);
        const index = div.getAttribute("data-index");
        myLibrary.splice(index, 1);
    });
}
