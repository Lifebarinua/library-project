const newBookBtn = document.querySelector("#newbook");
const dialog = document.querySelector("#bookDialog");
const closeBtn = document.querySelector("#closeDialog");
const form = document.querySelector("#bookForm");
const bookContainer = document.querySelector("#bookContainer");

// --- Default books ---
const defaultBooks = [
  { title: "THE HOLY BIBLE<br>(King James Version)", author: "The Holy Spirit", pages: 1396, read: true },
  { title: "The Hobbit", author: "J.R.R. Tolkien", pages: 295, read: false },
  { title: "He Leads Me", author: "Bro Gbile Akanni", pages: 228, read: true },
  { title: "A Forest of Flowers", author: "Ken Saro Wiwa", pages: 281, read: true }
];

// A simple signature that changes whenever defaultBooks changes
const DEFAULTS_SIG = JSON.stringify(defaultBooks);

// --- Merge defaults into existing books, preserving user state ---
function mergeDefaults(existing, defaults) {
  const existingByTitle = new Map(existing.map(b => [b.title, b]));

  // 1) Start with defaults, but if a book already exists, preserve user's read state
  const merged = defaults.map(d => {
    const ex = existingByTitle.get(d.title);
    if (ex) {
      return { ...d, read: ex.read }; // keep user's read/unread, update other fields from defaults
    }
    return d;
  });

  // 2) Append any user-added books that aren't part of defaults
  for (const b of existing) {
    if (!defaults.some(d => d.title === b.title)) {
      merged.push(b);
    }
  }

  return merged;
}

function loadBooks() {
  const stored = localStorage.getItem("books");
  const existing = stored ? JSON.parse(stored) : [];

  // Always merge with current defaults
  const merged = mergeDefaults(existing, defaultBooks);

  // Save updated state back to storage
  localStorage.setItem("books", JSON.stringify(merged));
  localStorage.setItem("defaults_sig", DEFAULTS_SIG);

  return merged;
}

let books = loadBooks();

// --- Save books ---
function saveBooks() {
  localStorage.setItem("books", JSON.stringify(books));
  // Refresh memory copy from storage to ensure sync
  books = JSON.parse(localStorage.getItem("books"));
}


// --- Display books ---
function displayBooks() {
  bookContainer.innerHTML = "";
  books.forEach((book, index) => {
    const div = document.createElement("div");
    div.classList.add("book");
    div.innerHTML = `
      <h3>${book.title}</h3>
      <p><strong>Author:</strong> ${book.author}</p>
      <p><strong>Pages:</strong> ${book.pages}</p>
      <p><strong>Read:</strong> ${book.read ? "Yes" : "No"}</p>
      <button class="toggleBtn" data-index="${index}">Toggle Read</button>
      <button class="removeBtn" data-index="${index}">Remove</button>
    `;
    bookContainer.appendChild(div);
  });

  // Remove
  document.querySelectorAll(".removeBtn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const idx = Number(e.target.dataset.index);
      books.splice(idx, 1);
      saveBooks();
      displayBooks();
    });
  });

  // Toggle
  document.querySelectorAll(".toggleBtn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const idx = Number(e.target.dataset.index);
      books[idx].read = !books[idx].read;
      saveBooks();
      displayBooks();
    });
  });
}

// --- Event Listeners ---
newBookBtn.addEventListener("click", () => dialog.showModal());
closeBtn.addEventListener("click", () => dialog.close());

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.querySelector("#title").value.trim();
  const author = document.querySelector("#author").value.trim();
  const pages = Number(document.querySelector("#pages").value);
  const read = document.querySelector("#read").checked;

  if (!title || !author || !pages) return;

  const newBook = { title, author, pages, read };

  books.push(newBook);
  saveBooks();
  displayBooks();

  dialog.close();
  form.reset();
});

// --- Initial Display ---
displayBooks();
