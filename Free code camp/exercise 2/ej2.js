const generateBtn = document.getElementById("color-palette-button");
const paletteContainer = document.getElementById("color-palette-container");

generateBtn.addEventListener("click", generatePalette);
paletteContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("copy-btn")) {
    const hexValue = e.target.previousElementSibling.textContent; //agarra el texto del hex, que es el hermano adentro del div//

    navigator.clipboard
      .writeText(hexValue)
      .then(() => showCopySuccess(e.target))
      .catch((err) => console.log(err));
  } else if (e.target.classList.contains("color")) {
    const hexValue =
      e.target.nextElementSibling.querySelector(".hex-valor").textContent;
  }
});
function showCopySuccess(element) {
  element.classList.remove("far", "fa-copy");
  element.classList.add("fas", "fa-check");
  element.style.color = "#000";

  setTimeout(() => {
    element.classList.remove("fas", "fa-check");
    element.classList.add("far", "fa-copy");
  }, 1500);
}
function generatePalette() {
  let i;
  const colors = [];
  for (i = 0; i < 5; i++) {
    colors.push(generateRandomColor());
  }

  updatePaletteDisplay(colors);
}
function generateRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  let i;
  for (i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function updatePaletteDisplay(colors) {
  const colorBoxes = document.querySelectorAll(".color-box");
  colorBoxes.forEach((box, index) => {
    const color = colors[index];
    const colorDiv = box.querySelector(".color");
    const hexValue = box.querySelector(".hex-valor");

    colorDiv.style.backgroundColor = color;
    hexValue.textContent = color;
  });
}
//generatePalette() para cada vez que se reinicie//
