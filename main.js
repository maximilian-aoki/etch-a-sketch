const canvas = document.querySelector('.canvas');

// fill the canvas with div elements depending on size
let canvasSizeFactor = 16;
let canvasElementSize = '30px'

for (let i = 1; i <= canvasSizeFactor ** 2; i++) {
  let newDiv = document.createElement('div');
  newDiv.style.width = canvasElementSize;
  newDiv.style.height = canvasElementSize;
  newDiv.style.backgroundColor = 'white';
  newDiv.style.border = '1px solid grey';

  canvas.appendChild(newDiv);
}
