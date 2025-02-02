const colors = ["red", "blue", "green", "yellow", "purple", "orange"];
let score = 0;
let targetColorName = "";

function getRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}

function getShades(color) {
  const shades = [];
  for (let i = 1; i <= 5; i++) {
    const shade = `rgba(${color.r}, ${color.g}, ${color.b}, ${i * 0.2})`;
    shades.push(shade);
  }
  return shades.sort(() => Math.random() - 0.5); // Shuffle shades
}

function setupGame() {
  targetColorName = getRandomColor();
  const targetRGB = getRGB(targetColorName);

  document.querySelector(
    '[data-testid="colorBox"]'
  ).style.backgroundColor = `rgb(${targetRGB.r}, ${targetRGB.g}, ${targetRGB.b})`;

  const optionsContainer = document.getElementById("options");
  optionsContainer.innerHTML = "";

  const shades = getShades(targetRGB);

  // Add full opacity for the correct guess option
  const correctShade = `rgba(${targetRGB.r}, ${targetRGB.g}, ${targetRGB.b}, 1)`;
  shades.push(correctShade); // Add the correct shade with full opacity
  const shuffledShades = shades.sort(() => Math.random() - 0.5); // Shuffle all shades

  shuffledShades.forEach((shade) => {
    const button = document.createElement("div");
    button.classList.add("option");
    button.style.backgroundColor = shade;
    button.addEventListener("click", () => handleGuess(shade, correctShade));
    optionsContainer.appendChild(button);
  });

  document.getElementById("gameStatus").textContent = "";
}

function getRGB(colorName) {
  const colorsMap = {
    red: { r: 255, g: 0, b: 0 },
    blue: { r: 0, g: 0, b: 255 },
    green: { r: 0, g: 255, b: 0 },
    yellow: { r: 255, g: 255, b: 0 },
    purple: { r: 128, g: 0, b: 128 },
    orange: { r: 255, g: 165, b: 0 },
  };
  return colorsMap[colorName];
}

function handleGuess(guessShade, targetRGB) {
  const guessRGB = guessShade.match(/\d+/g).map(Number);

  if (
    guessRGB[0] === targetRGB.r &&
    guessRGB[1] === targetRGB.g &&
    guessRGB[2] === targetRGB.b
  ) {
    score++;
    document.getElementById("score").textContent = score;
    setupGame(); // Start a new round
    document.getElementById("gameStatus").textContent = "Correct!";
  } else {
    document.getElementById("gameStatus").textContent = "Wrong! Try again.";
  }
}

document.getElementById("newGameButton").addEventListener("click", () => {
  score = 0;
  document.getElementById("score").textContent = score;
  setupGame();
});

// Initialize the game on page load
setupGame();
