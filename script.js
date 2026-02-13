const library = [];


class Book {

    #haveRead;
    static generateId() {
        return crypto.randomUUID();
    }

    constructor (title, author, pages, cover) {
        this.id = Book.generateId();
        this.title = title;
        this.author = author;
        this.pages = pages;

        // status is NOT set until user clicks
        this.#haveRead = null;

        this.cover = cover;
    }

    toggleHaveRead() {
        this.#haveRead = !this.#haveRead;
    }
    get haveRead() {
        return this.#haveRead
    }

    get statusText() {
        if (this.#haveRead === null) return "Set status";
        return this.#haveRead ? "Read" : "Not read";
    }
}

function addNewBook (title, author, pages, cover) {
    library.push(new Book(title, author, pages, cover));
}

addNewBook("Macbeth", "William Shakespeare", 289, "images/macbeth.jpg");
addNewBook("Antigone, Oedipus and Electra", "Sophocles", 432, "images/antigone-oedipus-electra.jpg");
addNewBook("The Golden Treasury", "Francis Turner Palgrave", 470, "images/the-golden-treasury.jpg");

console.log(library);

const myLibrary = document.querySelector("#library");

for (let i = 0; i < library.length; i++) {
    const book = library[i];

    const card = document.createElement("div");
    card.classList.add("book-card");

    const img = document.createElement("img");
    img.classList.add("book-cover");
    img.src = book.cover;
    img.alt = book.title;

    const text = document.createElement("div");
    text.classList.add("text");
    text.textContent = `${book.title} by ${book.author} — ${book.pages} pages`;

    const button = document.createElement("button");
    button.classList.add("read-btn", "unset");
    button.textContent = book.statusText;

    function syncButtonToReadStatus() {
        button.textContent = book.statusText;

        if(book.haveRead === null) {
            button.classList.add("unset");
            button.classList.remove("read");
            button.classList.remove("not-read");
            return;
        }

        button.classList.remove("unset");
        button.classList.toggle("read", book.haveRead === true);
        button.classList.toggle("not-read", book.haveRead === false);

    }

    button.addEventListener("click", () => {
        // first click sets it, after that it toggles
        book.toggleHaveRead();
        syncButtonToReadStatus();


    });

    card.appendChild(img);
    card.appendChild(text);

    // button UNDER the text:
    text.appendChild(button);

    myLibrary.appendChild(card);

    syncButtonToReadStatus();
}
