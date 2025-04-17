const matrix = [
    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "]
  ];
  
  let currentPlayer = "X";
  let changes = 1;
  let gameOver = false;
  const note = document.querySelector(".NOTE");
  const cells = document.querySelectorAll(".cell");
  
  cells.forEach((cell, index) => {
    cell.addEventListener("click", () => {
      if (gameOver) return;
  
      const row = Math.floor(index / 3);
      const col = index % 3;
  
      if (matrix[row][col] !== " ") {
        note.textContent = "❌ Position already taken.";
        return;
      }
  
      matrix[row][col] = currentPlayer;
      cell.textContent = currentPlayer;
      cell.classList.add(currentPlayer.toLowerCase());
  
      if (Wincheck()) {
        note.textContent = `🎉 WINNER IS ${currentPlayer}`;
        gameOver = true;
        return;
      }
  
      changes++;
      if (changes > 9) {
        note.textContent = "🤝 It's a Draw!";
        gameOver = true;
        return;
      }
  
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      note.textContent = `Turn: ${currentPlayer}`;
    });
  });
  
  const Vertical = () => {
    for (let col = 0; col < 3; col++) {
      if (
        matrix[0][col] !== " " &&
        matrix[0][col] === matrix[1][col] &&
        matrix[1][col] === matrix[2][col]
      ) {
        return true;
      }
    }
    return false;
  };
  
  const Horizontal = () => {
    for (let row = 0; row < 3; row++) {
      if (
        matrix[row][0] !== " " &&
        matrix[row][0] === matrix[row][1] &&
        matrix[row][1] === matrix[row][2]
      ) {
        return true;
      }
    }
    return false;
  };
  
  const Diagonal = () => {
    if (
      matrix[0][0] !== " " &&
      matrix[0][0] === matrix[1][1] &&
      matrix[1][1] === matrix[2][2]
    ) {
      return true;
    }
    if (
      matrix[0][2] !== " " &&
      matrix[0][2] === matrix[1][1] &&
      matrix[1][1] === matrix[2][0]
    ) {
      return true;
    }
    return false;
  };
  
  const Wincheck = () => {
    return Vertical() || Horizontal() || Diagonal();
  };
  