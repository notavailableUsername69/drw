 // Get canvas and context
const canvas = document.getElementById("drawingCanvas");
const ctx = canvas.getContext("2d");

// Set initial drawing settings
let isDrawing = false;
let undoStack = [];
let redoStack = [];
let currentColor = "#000";
let currentBrushSize = 1;
let currentEraserSize = 5;

// Function to start drawing
function startDrawing(e) {
  isDrawing = true;
  const { offsetX, offsetY } = e;
  ctx.beginPath();
  ctx.moveTo(offsetX, offsetY);
  e.preventDefault();
}

// Function to draw
function draw(e) {
  if (!isDrawing) return;
  const { offsetX, offsetY } = e;
  ctx.lineTo(offsetX, offsetY);
  ctx.strokeStyle = currentColor;
  ctx.lineWidth = currentBrushSize;
  ctx.lineCap = "round";
  ctx.stroke();
  e.preventDefault();
}

// Function to stop drawing
function stopDrawing() {
  isDrawing = false;
  undoStack.push(canvas.toDataURL());
}

// Function to undo drawing
function undo() {
  if (undoStack.length > 1) {
    redoStack.push(undoStack.pop());
    const img = new Image();
    img.src = undoStack[undoStack.length - 1];
    img.onload = function () {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
    };
  }
}

// Function to redo drawing
function redo() {
  if (redoStack.length > 0) {
    const img = new Image();
    img.src = redoStack.pop();
    img.onload = function () {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
    };
    undoStack.push(img.src);
  }
}

// Function to change color
function changeColor(e) {
  currentColor = e.target.value;
}

// Function to change brush size
function changeBrushSize(e) {
  currentBrushSize = parseInt(e.target.value);
}

// Function to change eraser size
function changeEraserSize(e) {
currentEraserSize = parseInt(e.target.value);
}

// Function to switch to eraser mode
function enableEraser() {
currentColor = "#fff"; // Set color to white for eraser
currentBrushSize = currentEraserSize;
}
// Event listeners
canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDrawing);
undoBtn.addEventListener("click", undo);
redoBtn.addEventListener("click", redo);
colorPicker.addEventListener("change", changeColor);
brushSize.addEventListener("change", changeBrushSize);
eraserBtn.addEventListener("click", enableEraser);

// Set canvas size to match viewport
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
