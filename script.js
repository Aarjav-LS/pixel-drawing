document.addEventListener("DOMContentLoaded", function () {
  const colors = document.querySelectorAll(".color");
  const gridElement = document.querySelector(".grid");

  let currentColor = "black";
  let isMouseDown = false;
  const STORAGE_KEY = "pixelGrid";

  // Function to save the current grid state to localStorage
  const saveGrid = () => {
    const colors = Array.from(cells).map(
      (cell) => cell.style.backgroundColor || "",
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(colors));
  };

  const activate = (event) => {
    event.target.style.backgroundColor = currentColor;
    saveGrid();
  };

  const changeColor = (event) => {
    currentColor = event.target.attributes["data-color"].value;
  };
  colors.forEach((color) => {
    color.addEventListener("click", changeColor);
  });

  for (let i = 0; i < 200 * 200; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");

    gridElement.appendChild(cell);
  }

  const cells = document.querySelectorAll(".cell");

  cells.forEach((cell) => {
    cell.addEventListener("mousedown", () => {
      isMouseDown = true;
      activate({ target: cell });
    });
    cell.addEventListener("mouseover", () => {
      if (isMouseDown) activate({ target: cell });
    });
    cell.addEventListener("mouseup", () => {
      isMouseDown = false;
    });
  });

  document.addEventListener("mouseup", () => {
    isMouseDown = false;
  });

  // Load saved grid from localStorage
  const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  cells.forEach((cell, i) => {
    if (saved[i]) {
      cell.style.backgroundColor = saved[i];
    }
  });
});
