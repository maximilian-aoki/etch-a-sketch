// access the canvas container for listening to sketching
const canvasContainer = document.querySelector('.sketch-container');

// variables that get changed with event listeners
let getColor = getCharcoal;
let canvasFactor = 4;
let canvasSize = '120px';


// -------------- FUNCTION DECLARATIONS! -------------- //

// function that deletes existing canvas and creates new canvas based on size parameters
function changeCanvasSize(factor, size) {
  let existingCanvas = document.querySelector('.canvas');
  canvasContainer.removeChild(existingCanvas);

  let newCanvas = document.createElement('div');
  newCanvas.classList.add('canvas');

  for (let i = 1; i <= factor ** 2; i++) {
    let newDiv = document.createElement('div');
    newDiv.style.width = size;
    newDiv.style.height = size;
    newDiv.classList.add('paintable');
    newDiv.style.backgroundColor = 'white';
    // newDiv.style.border = '1px solid grey';
  
    newCanvas.appendChild(newDiv);
  }

  canvasContainer.appendChild(newCanvas);
}

// function that generates a random color
function getRandomColor() {
  let randomRed = Math.floor(Math.random() * 255);
  let randomGreen = Math.floor(Math.random() * 255);
  let randomBlue = Math.floor(Math.random() * 255);
  return `rgb(${randomRed}, ${randomGreen}, ${randomBlue})`;
}

// function that returns charcoal color
function getCharcoal() {
  return '#171d22';
}

// function that returns eraser
function getEraser() {
  return 'white';
}

// ----------------- EVENT LISTENERS! ----------------- //

// listen to size buttons and change canvas size
const sizeButtons = document.querySelector('.size-buttons');
sizeButtons.addEventListener('click', (e) =>{
  if (e.target.type && e.target.getAttribute('class') !== "selected") {
    let newFactor = parseInt(e.target.getAttribute('data-factor'));
    let newSize = e.target.getAttribute('data-size');
    canvasFactor = newFactor;
    canvasSize = newSize;
    changeCanvasSize(newFactor, newSize);

    for (let button of Array.from(document.querySelectorAll('.size-buttons > button'))) {
      button.classList.remove('selected');
    }
    e.target.classList.add('selected');
  }
});

// listen to color buttons and change brush color
const colorButtons = document.querySelector('.color-buttons');
colorButtons.addEventListener('click', (e) =>{
  if (e.target.type && e.target.getAttribute('class') !== "selected") {
    if (e.target.textContent === "Charcoal") {
      getColor = getCharcoal;
    } else if (e.target.textContent === "Mystery!") {
      getColor = getRandomColor;
    } else if (e.target.textContent === "Eraser") {
      getColor = getEraser;
    }

    for (let button of Array.from(document.querySelectorAll('.color-buttons > button'))) {
      button.classList.remove('selected');
    }
    e.target.classList.add('selected');
  }
});

// listen to clear canvas button and clear the canvas
const clearButton = document.querySelector('.clear-canvas');
clearButton.addEventListener('click', () => {
  changeCanvasSize(canvasFactor, canvasSize);
})

// --------- PAINT EVENT FUNCTIONS AND LISTENERS --------- //

// if drag condition failed, remove listeners
function deleteListeners() {
  window.removeEventListener('mouseup', deleteListeners);
  canvasContainer.removeEventListener('mouseover', paintSquare);
}

// finally, logic for if to paint a square, else remove listeners
function paintSquare(e) {
  if (e.target.getAttribute('class') === "paintable") {
    e.target.style.backgroundColor = getColor();
  } else {
    deleteListeners();
  }
}

// top-level listener to the canvas
canvasContainer.addEventListener('mousedown', (e) => {
  paintSquare(e);
  window.addEventListener('mouseup', deleteListeners);
  canvasContainer.addEventListener('mouseover', paintSquare);
});

// -------------- INITIALIZER FUNCTIONS! -------------- //

// call these functions to build the initial experience
changeCanvasSize(canvasFactor, canvasSize);
