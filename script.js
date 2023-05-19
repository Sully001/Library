const modal = document.querySelector('.modal');
const open = document.querySelector('.open');
const close = document.querySelector('.close');

const add = document.querySelector('.add');
const form = document.querySelector("#form");
const hasReadBtn = document.querySelectorAll(".hasReadBtn");



open.addEventListener("click", () => {
    modal.showModal();
    form.reset();
})

close.addEventListener('click', () => {
    modal.close();
})

add.addEventListener('click', () => {
    addBookToLibrary()
})



let myLibrary = [
    {
        title: 'Chamber of Secrets',
        author: 'JK Rowling',
        pages: 100,
        hasRead: false,
    },
    {
        title: 'Prisoner of Azkaban',
        author: 'JK Rowling',
        pages: 100,
        hasRead: true,
    },
    {
        title: 'Deathly Hallows',
        author: 'JK Rowling',
        pages: 100,
        hasRead: false,
    }
];

function Book(title,author, pages, read = false) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = read;
}

function addBookToLibrary() {
    let hasRead = false;

    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const pages = document.querySelector('#pages').value;
    const checkbox = document.querySelector('#read');

    let regex = /\S/;
    let testNum = /^\d+$/;


    if(!regex.test(title) || !regex.test(author) || !testNum.test(pages)) {
        return;
    }


    if (checkbox.checked) {
        hasRead = true;
    } 

    const book = new Book(title, author, pages, hasRead);
    myLibrary.push(book);
    showBook(title, author, pages, hasRead);
}

function showAllBooks(myLibrary) {
    const container = document.querySelector(".books")
    let index = 0
    myLibrary.forEach(element => {
        showBook(element.title, element.author, element.pages, element.hasRead, index)
        index++;
    });
}

function showBook(title, author, pages, hasRead, index) {
    const container = document.querySelector(".books")

    const removeBtn = document.createElement("button");
    removeBtn.classList.add("removeBtn");
    removeBtn.textContent = "Remove";

    const book = document.createElement("div");
    book.classList.add('book');

    book.setAttribute("data-book", index);

    const bookTitle = document.createElement("p");
    bookTitle.textContent = title;

    const bookAuthour = document.createElement("p");
    bookAuthour.textContent = author;

    const bookPages = document.createElement("p");
    bookPages.textContent = pages;

    const bookRead = document.createElement("button");
    bookRead.classList.add("hasReadBtn")
    
    bookRead.addEventListener('click', (e) => {
        if (e.target.getAttribute("book-read") === "not-read") {
            e.target.setAttribute("book-read", "read");
            e.target.textContent = "Read"
        } else {
            e.target.setAttribute("book-read", "not-read");
            e.target.textContent = "Not Read"
        }
    });

    removeBtn.addEventListener('click', e => {
        e.target.parentElement.remove();
        const index = e.target.parentElement.getAttribute("data-book");
        myLibrary.splice(index);
    });

    if(hasRead === true) {
        bookRead.textContent = "Read";
        bookRead.setAttribute("book-read","read");
    } else {
        bookRead.textContent = "Not Read";
        bookRead.setAttribute("book-read","not-read")
    }

    book.appendChild(bookTitle);
    book.appendChild(bookAuthour);
    book.appendChild(bookPages);
    book.appendChild(bookRead);
    book.appendChild(removeBtn);

    container.appendChild(book);
}


showAllBooks(myLibrary);

