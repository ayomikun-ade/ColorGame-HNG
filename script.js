const colors = ["red", "blue", "green", "yellow", "purple", "orange"];
let score = 0;
let correctShade = "";

function getRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}

function getShades(color) {
  const shades = [];
  for (let i = 2; i <= 6; i++) {
    const shade = `rgba(${color.r}, ${color.g}, ${color.b}, ${i * 0.155})`;
    shades.push(shade);
  }
  return shades;
}

function setupGame() {
  // Generate a random target color
  const targetColorName = getRandomColor();
  const targetRGB = getRGB(targetColorName);

  // Set the target color box
  document.querySelector(
    '[data-testid="colorBox"]'
  ).style.backgroundColor = `rgb(${targetRGB.r}, ${targetRGB.g}, ${targetRGB.b})`;

  // Generate shades of the target color
  const shades = getShades(targetRGB);

  // Add the correct shade (full opacity)
  correctShade = `rgba(${targetRGB.r}, ${targetRGB.g}, ${targetRGB.b}, 1)`;
  shades.push(correctShade);

  // Shuffle all shades
  const shuffledShades = shades.sort(() => Math.random() - 0.5);

  // Display the color options
  const optionsContainer = document.getElementById("options");
  optionsContainer.innerHTML = "";

  shuffledShades.forEach((shade) => {
    const button = document.createElement("div");
    button.classList.add("option");
    button.style.backgroundColor = shade;
    button.addEventListener("click", () => handleGuess(button, shade));
    optionsContainer.appendChild(button);
  });

  // Reset game status message
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

function handleGuess(option, selectedShade) {
  if (selectedShade === correctShade) {
    score++;
    document.getElementById("score").textContent = score;
    option.classList.add("pulse");

    setTimeout(setupGame, 1000);

    const gameStatus = document.getElementById("gameStatus");
    gameStatus.textContent = "Correct 🎉!";
    gameStatus.style.color = "#04c904";

    option.classList.remove("shake");
  } else {
    document.getElementById("gameStatus").textContent = "Wrong! Try again.";
    gameStatus.style.color = "#fa1f1f";

    option.classList.add("shake");
    option.classList.remove("pulse");
  }
}

// Reset the game when "New Game" button is clicked
document.getElementById("newGameButton").addEventListener("click", () => {
  score = 0;
  document.getElementById("score").textContent = score;
  setupGame();
});

// Initialize the game on page load
setupGame();
