document.addEventListener("DOMContentLoaded", function () {
  const colors = document.querySelectorAll(".color");
  const gridElement = document.querySelector(".grid");

  let currentColor = "black";
  let isMouseDown = false;

  const activate = (event) => {
    event.target.style.backgroundColor = currentColor;
  };

  const changeColor = (event) => {
    currentColor = event.target.attributes["data-color"].value;
  };
  colors.forEach((color) => {
    color.addEventListener("click", changeColor);
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
});
