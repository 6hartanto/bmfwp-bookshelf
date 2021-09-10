const UNCOMPLETED_LIST_BOOK_ID = "incompleteBookshelfList";
const COMPLETED_LIST_BOOK_ID = "completeBookshelfList";
const BOOK_ITEMID = "itemId";

function addBook() {
  const incompletedBookList = document.getElementById(UNCOMPLETED_LIST_BOOK_ID);
  const completedBookList = document.getElementById(COMPLETED_LIST_BOOK_ID);
  const title = document.getElementById("bookTitle").value;
  const author = document.getElementById("bookAuthor").value;
  const year = document.getElementById("bookYear").value;
  const isCompleted = document.getElementById("bookIsComplete").checked;

  const book = makeBook(title, author, year, isCompleted);
  const bookObject = composeBookObject(title, author, year, isCompleted);
  
  book[BOOK_ITEMID] = bookObject.id;
  books.push(bookObject);

  if (isCompleted) {
    completedBookList.append(book);
  } else {
    incompletedBookList.append(book);
  }

  incompletedBookList.append(book);
  updateDataToStorage();
}

function makeBook(title, author, year, isCompleted) {
 
  const bookTitle = document.createElement("h3");
  bookTitle.classList.add("bookTitle")
  bookTitle.innerText = title;

  const bookAuthor = document.createElement("p");
  bookAuthor.classList.add("bookAuthor")
  bookAuthor.innerText = author;

  const bookYear = document.createElement("p");
  bookYear.classList.add("bookYear")
  bookYear.innerText = year;

  const bookAction = document.createElement("div");
  bookAction.classList.add("action");

  if (isCompleted) {
    bookAction.append(createUndoButton(), createTrashButton());
  } else {
    bookAction.append(createCheckButton());
  }

  const container = document.createElement("article");
  container.classList.add("book_item")
  container.append(bookTitle, bookAuthor, bookYear, bookAction);

  return container;
}

function createCheckButton() {
  return createButton("green", "Selesai dibaca", function(event){
    addBookToCompleted(event.target.parentElement.parentElement);
  });
}

function createUndoButton() {
  return createButton("green", "Belum selesai dibaca", function(event){
      undoBookFromCompleted(event.target.parentElement.parentElement);
  });
}

function createTrashButton() {
  return createButton("red", "Hapus buku", function(event){
      removeBookFromCompleted(event.target.parentElement.parentElement);
  });
}

function createButton(buttonTypeClass, buttonText, eventListener) {
  const button = document.createElement("button");
  button.classList.add(buttonTypeClass);
  button.innerText = buttonText;
  button.addEventListener("click", function (event) {
      eventListener(event);
  });
  return button;
}

function addBookToCompleted(bookElement) {
  const listCompleted = document.getElementById(COMPLETED_LIST_BOOK_ID);
  const bookTitle = bookElement.querySelector(".bookTitle").innerText;
  const bookAuthor = bookElement.querySelector(".bookAuthor").innerText;
  const bookYear = bookElement.querySelector(".bookYear").innerText;

  const newBook = makeBook(bookTitle, bookAuthor, bookYear, true);
  const book = findBook(bookElement[BOOK_ITEMID]);
  book.isCompleted = true;
  newBook[BOOK_ITEMID] = book.id;
  
  listCompleted.append(newBook);
  bookElement.remove();

  updateDataToStorage();
}

function undoBookFromCompleted(bookElement){
  const listUncompleted = document.getElementById(UNCOMPLETED_LIST_BOOK_ID);
  const bookTitle = bookElement.querySelector(".bookTitle").innerText;
  const bookAuthor = bookElement.querySelector(".bookAuthor").innerText;
  const bookYear = bookElement.querySelector(".bookYear").innerText;

  const newBook = makeBook(bookTitle, bookAuthor, bookYear, false);

  const book = findBook(bookElement[BOOK_ITEMID]);
  book.isCompleted = false;
  newBook[BOOK_ITEMID] = book.id;

  listUncompleted.append(newBook);
  bookElement.remove();

  updateDataToStorage();
}

function removeBookFromCompleted(bookElement) {
  const bookPosition = findBookIndex(bookElement[BOOK_ITEMID]);
  books.splice(bookPosition, 1);
  
  bookElement.remove();
  updateDataToStorage();
}