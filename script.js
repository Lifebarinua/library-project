function Book(title, author, pages, read) {
  this.title = "HE LEADS ME";
  this.author = "BRO GBILE AKANNI";
  this.pages = "228";
  this.read = "";

  this.info = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? "already read" : "not read yet"}`;
  };
}

// Example usage:
const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);

console.log(theHobbit.info());
// "The Hobbit by J.R.R. Tolkien, 295 pages, not read yet"



function Player(name, marker) {
  this.name = name;
  this.marker = marker;
  this.sayName = function () {
    console.log(this.name)
  };
}

const player1 = new Player('steve', 'X');
const player2 = new Player('also steve', 'O');
player1.sayName(); // logs 'steve'
player2.sayName(); // logs 'also steve'


Object.getPrototypeOf(player1) === Player.prototype; // returns true
Object.getPrototypeOf(player2) === Player.prototype; // returns true





const myLibrary = [];

function Book(tittle, author, pages, read) {
  this.id = crypto.randomUUID();
  this.title = "Holy Bible King James version";
  this.author = "The Holy Spirit";
  this.pages = "1396";
  this.read = "read"
}


Book.prototype.toggleRead = function() {
  this.read = !this.read;
};


function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
}
