const library = [];

function Book (title, author, pages, cover) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;

    // status is NOT set until user clicks
    this.haveRead = null;

    this.cover = cover;
}

function addNewBook (title, author, pages, cover) {
    const book = new Book(title, author, pages, cover);
    library.push(book);
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
    button.textContent = "Set status";

    button.addEventListener("click", () => {
        // first click sets it, after that it toggles
        if (book.haveRead === null) {
            book.haveRead = true;
        } else {
            book.haveRead = !book.haveRead;
        }

        button.textContent = book.haveRead ? "Read" : "Not Read";

        button.classList.remove("unset");
        button.classList.toggle("read", book.haveRead === true);
        button.classList.toggle("not-read", book.haveRead === false);
    });

    card.appendChild(img);
    card.appendChild(text);

    // button UNDER the text:
    text.appendChild(button);

    myLibrary.appendChild(card);
}
