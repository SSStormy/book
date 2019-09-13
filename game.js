const log = console.log;
const links = [];
const book_stack = [];
let book_index = -1;

function get_book() {
    return book_stack[book_index];
}

function begin() {
    const root = document.getElementById("root");
    root.appendChild(document.createElement("hr"));
}

function btn(t, fn) {
    for(const l of links) {
        l.onclick = "javscript:void(0)";
    }

    setTimeout(() => {
        const root = document.getElementById("root");
        const el = document.createElement("a");
        el.innerText = t;
        el.href = "javascript:void(0)";
        el.onclick = fn;
        root.appendChild(el);

        links.push(el);
    }, 500);
}

function txt(t) {
    const root = document.getElementById("root");
    const el = document.createElement("div");
    el.innerText = t;
    root.appendChild(el);
}

function find_time() {
    const book = get_book();

    begin();

    if(book.nth_time == 0) {
        txt("You find time to read the book.");
        btn("Read book", read_book);
    }
    else if(book.nth_time == 1) {
        txt("You find time to finish the chapter.");
        btn("Finish chapter", read_book);
    }
    else if(book.nth_time == 2) {
        txt("You find little time for the book.");
        btn("Peek chapter", read_book);
    }
    else if(book.nth_time == 3) {
        txt("You are recommended a book.");
        txt("It aligns with your current interest.");
        buy_book();
    }
    else {
        buy_book();
    }

    book.nth_time += 1;
}

function read_book() {
    begin();

    const book = get_book();
    if(book.nth_read == 0) {
        txt("You read one chapter.");
    }
    else if(book.nth_read == 1) {
        txt("You start reading the next chapter.");
    }
    else if(book.nth_read == 2) {
        txt("Done.");
    }
    else if(book.nth_read == 3) {
        txt("Done. You peek at the first two pages.")
    }
    else {
        txt("Done.");
    }

    book.nth_read += 1;

    btn("Find time", find_time);
};

function buy_book() {
    btn("Buy a book", () => {
        book_stack.push({
            nth_time: 0,
            nth_read: 0
        });

        book_index += 1;

        begin();
        txt("You buy a book.");
        btn("Read the book", read_book);
    });
}

buy_book();
