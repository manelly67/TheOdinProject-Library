//BOOK FOrM
const openFormButton = document.querySelectorAll('[data-open-target]');
const closeFormButton = document.querySelectorAll('[data-close-button]');
const openAddForm = document.querySelector('#openForm');
const imageBox = document.querySelector('#imageBox');

openFormButton.forEach(button => {
  button.addEventListener('click', () => {
    openForm(openAddForm)
  })
})

closeFormButton.forEach(button => {
  button.addEventListener('click', () => {
    closeForm(openAddForm)
  })
})

function openForm(openAddForm) { 
  openAddForm.classList.add('mostrar'); 
  imageBox.classList.add('ocultar');
}

function closeForm(openAddForm) { 
  openAddForm.classList.remove('mostrar');   
  imageBox.classList.remove('ocultar');
}

// Define required - omit the browser validation
inputsArray=[];
const formValidation = document.getElementById('form');
const titleField = document.getElementById('title');
inputsArray.push(titleField);
const authorField = document.getElementById('author');
inputsArray.push(authorField);
const pagesField = document.getElementById('pages');
inputsArray.push(pagesField);
console.log(inputsArray);

formValidation.setAttribute('novalidate', '');
titleField.setAttribute('required', '');
authorField.setAttribute('required', '');
pagesField.setAttribute('required', '');

const checkValidity = (arg) => {    
  // Functions for validation
    if (arg.validity.valueMissing===true) {
      console.log(arg.validity.valueMissing);
      showError(arg);
    }
return  arg.validity.valueMissing;
} 

function showError(arg) {
    // display the following error message.
    const inputError = document.createElement('p');
    inputError.classList.add('error');
    inputError.classList.add('active');
    inputError.setAttribute( 'aria-live','polite');
    inputError.setAttribute('id',arg);
    inputError.textContent = 'You need to enter a value for this field.';
 
    const parentElement = arg.parentNode;
    console.log(parentElement);
    parentElement.appendChild(inputError);  
}

function deleteErrorMessages(){
  const errorMessages = document.querySelectorAll('.error');
  const errorMessagesArray = [...errorMessages];
  console.log(errorMessagesArray);
  const iterator = errorMessagesArray.entries();
  errorMessagesArray.forEach((element) => {
    index = iterator.next().value;
    console.log(index[0]);
    console.log(index[1]);
    x = index[1];  /* para leer el node dentro del nodeList */
    console.log(x);
    x.parentNode.removeChild(x);
  });
}


//Form Submission
let validationArray = [];
var form = document.getElementById('form');

form.addEventListener('submit', deleteErrorMessages);
form.addEventListener('submit', function(event){
  event.preventDefault();
  
  var title = document.getElementById('title').value;
  
  var author = document.getElementById('author').value

  var pages = document.getElementById('pages').value

  let hasRead = document.querySelector('#hasRead').checked; 
 
  validationArray = []; /* clean the previous validation */
  inputsArray.forEach((element) => {
    checkValidity(element);
    validationArray.push(element.validity.valueMissing);
  });

  console.log(validationArray);

  if(validationArray.includes(true)){
    event.preventDefault();
  }else{
    console.log(validationArray);
    const book = new Book(title, author, pages, hasRead);
    addBookToLibrary(book);
    console.log(myLibrary);
    displayNewBooks(myLibrary, book);
    document.getElementById('form').reset();
  }
   
});

// definiendo el constructor
class Book {
  constructor(title, author, pages, hasRead){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead;
  //this.bookInfo = "Author: " + author + "Title: " + title + "\nPages: " + pages + "\nHave you read this before?: " + hasRead;
  };

  bookInfo(){
    console.log("Author: " + this.author + "\nTitle: " + this.title + "\nPages: " + this.pages + "\nHave you read this before?: " + this.hasRead);
  };

  asignar(){
      // para el input checkbox true asigna valor read para false asigna unread
    if (this.hasRead == true){
      this.hasRead = 'read';
    }else{
      this.hasRead = 'unread';
    }
  };

  toggleRead(){
      // para cambiar entre read y unread
    if(this.hasRead==='read'){
      this.hasRead = 'unread';
    }else{
    this.hasRead = 'read';
    }
  };

};

const book = new Book(this.title, this.author, this.pages, this.hasRead);

const book1 = new Book('In defense of enlightenment', 'Steven Pinker', 680 ,true);
const book2 = new Book('Sapiens', 'Yuval Noah Harari', 575 ,true);
const book3 = new Book('Coraline', 'Neil Gaiman', 128 ,true);
const book4 = new Book('O pequeno príncipe', 'antoine de Saint-Exupery', 128 ,true);

  
let myLibrary = [  book1,   book2  , book3, book4 ];

// agrega libros en la libreria es llamada desde el submit del formulario
function addBookToLibrary(book) {
  myLibrary.push(book);
 };


// al cargar la pagina llama la funcion para mostrar los libros pre-existentes en la libreria
window.addEventListener("load", displayLibraryBooks(myLibrary,book)) ;
  
function displayLibraryBooks(myLibrary, book) {
  
  const lengthLibrary = myLibrary.length;
  
  for (let i = 0; i < lengthLibrary; i++) {
  
  
  const currentBook = myLibrary[i];
  console.log(lengthLibrary);
  console.log(book1);
  console.log(myLibrary);
  console.log(currentBook);
 
  console.log(i);

  const library = document.querySelector('#library');

  const createBook = document.createElement('div');
  const showAuthor = document.createElement('p');
  const showTitle = document.createElement('p');
  const showPages = document.createElement('p');
  const showRead = document.createElement('button');
  const removeButton = document.createElement('button');
  
  createBook.classList.add('card');
  createBook.setAttribute('data', i);
  showAuthor.classList.add('showAuthor');
  showTitle.classList.add('title');
  showPages.classList.add('showPages');
  showRead.classList.add('showRead');
  removeButton.classList.add('removeButton');

  showAuthor.innerText = "Author: " + currentBook.author;
  showTitle.innerText = currentBook.title;
  showPages.innerText = "Pages: " + currentBook.pages + " pages";
  currentBook.asignar();
  showRead.textContent =  currentBook.hasRead.toUpperCase();
  removeButton.textContent = "Remove Book";

  library.appendChild(createBook);
  createBook.appendChild(showTitle);
  createBook.appendChild(showAuthor);
  createBook.appendChild(showPages);
  createBook.appendChild(showRead);
  createBook.appendChild(removeButton);

  //Toggle for Read


   showRead.addEventListener('click', function(){
    const getBookIndex = createBook.getAttribute('data');
    const toggleBook = myLibrary[getBookIndex];
    toggleBook.toggleRead();
    showRead.textContent = toggleBook.hasRead.toUpperCase();
    console.log(toggleBook);   
   });
  

  //Remove element and delete book from Library
  const getBookIndex = createBook.getAttribute('data');

  removeButton.addEventListener('click', function() {
    if (confirm("Are you sure you want to delete this book?") === true) {
      createBook.remove(), myLibrary.pop(getBookIndex);
    } 
    console.log(myLibrary);
   }); 

  }
};

// muestra en pantalla el nuevo libro agregado, es llamada desde el submit del formulario
function displayNewBooks(myLibrary, book) {
  
  const lengthLibrary = myLibrary.length;
  const newestBook = myLibrary[lengthLibrary-1];
  
  
  const bookIndex = myLibrary.length - 1;
  console.log(bookIndex);

  const library = document.querySelector('#library');

  const createBook = document.createElement('div');
  const showAuthor = document.createElement('p');
  const showTitle = document.createElement('p');
  const showPages = document.createElement('p');
  const showRead = document.createElement('button');
  const removeButton = document.createElement('button');

  createBook.classList.add('card');
  createBook.setAttribute('data', bookIndex);
  showAuthor.classList.add('showAuthor');
  showTitle.classList.add('title');
  showPages.classList.add('showPages');
  showRead.classList.add('showRead');
  removeButton.classList.add('removeButton');


  showAuthor.innerText = "Author: " + newestBook.author;
  showTitle.innerText =  newestBook.title;
  showPages.innerText = "Pages: " + newestBook.pages + ' pages';
  newestBook.asignar();
  showRead.textContent = newestBook.hasRead.toUpperCase();
  removeButton.textContent = "Remove Book";

  library.appendChild(createBook);
  createBook.appendChild(showTitle);
  createBook.appendChild(showAuthor);
  createBook.appendChild(showPages);
  createBook.appendChild(showRead);
  createBook.appendChild(removeButton);
  
  showRead.addEventListener('click', function(){
    const getBookIndex = createBook.getAttribute('data');
    const toggleBook = myLibrary[getBookIndex];
    toggleBook.toggleRead();
    showRead.textContent = toggleBook.hasRead.toUpperCase();
    console.log(toggleBook);   
   });
  

  //Remove element and delete book from Library
  const getBookIndex = createBook.getAttribute('data');

  removeButton.addEventListener('click', function() {
    if (confirm("Are you sure you want to delete this book?") === true) {
      createBook.remove(), myLibrary.pop(getBookIndex);
    } 
    console.log(myLibrary);
   }); 


};




