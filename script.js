document.addEventListener("DOMContentLoaded", function () {
  const colors = document.querySelectorAll(".color");
  const gridElement = document.querySelector(".grid");

  let currentColor = "black";
  let isMouseDown = false;
  let brushSize = 1;
  const STORAGE_KEY = "pixelGrid";
  const GRID_SIZE = 100;

  // Function to save the current grid state to localStorage
  const saveGrid = () => {
    const colors = Array.from(cells).map(
      (cell) => cell.style.backgroundColor || "",
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(colors));
  };

  const paintArea = (centerCell) => {
    const index = Array.from(cells).indexOf(centerCell);
    if (index === -1) return;

    const col = index % GRID_SIZE;
    const row = Math.floor(index / GRID_SIZE);

    // brushSize 1 = 1 pixel, larger sizes = centered square
    const radius = brushSize - 1;

    for (let r = row - radius; r <= row + radius; r++) {
      for (let c = col - radius; c <= col + radius; c++) {
        if (r >= 0 && r < GRID_SIZE && c >= 0 && c < GRID_SIZE) {
          cells[r * GRID_SIZE + c].style.backgroundColor = currentColor;
        }
      }
    }
  };

  const changeColor = (event) => {
    currentColor = event.target.attributes["data-color"].value;
  };
  colors.forEach((color) => {
    color.addEventListener("click", changeColor);
  });

  const brushSizes = document.querySelectorAll(".brush-size");
  brushSizes.forEach((size) => {
    size.addEventListener("click", () => {
      brushSizes.forEach((s) => s.classList.remove("active"));
      size.classList.add("active");
      brushSize = parseInt(size.attributes["data-size"].value, 10);
    });
  });

  for (let i = 0; i < 100 * 100; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");

    gridElement.appendChild(cell);
  }

  const cells = document.querySelectorAll(".cell");

  cells.forEach((cell) => {
    cell.addEventListener("mousedown", () => {
      isMouseDown = true;
      paintArea(cell);
    });
    cell.addEventListener("mouseover", () => {
      if (isMouseDown) paintArea(cell);
    });
    cell.addEventListener("mouseup", () => {
      isMouseDown = false;
    });
  });

  document.addEventListener("mouseup", () => {
    isMouseDown = false;
    saveGrid();
  });

  // Load saved grid from localStorage
  const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  cells.forEach((cell, i) => {
    if (saved[i]) {
      cell.style.backgroundColor = saved[i];
    }
  });
});
