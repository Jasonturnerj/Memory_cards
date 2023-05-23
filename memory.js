document.addEventListener("DOMContentLoaded", function () {
    let card1 = null;
    let card2 = null;
    let cardsFlipped = 0;
    let currentScore = 0;
    let canClick = true;
    let cards = document.querySelector("#cards");
    let numCards = 0;
    const colors = [
      "#e6194B",
      "#3cb44b",
      "#ffe119",
      "#4363d8",
      "#911eb4",
      "#42d4f4",
      "#f032e6",
      "#bfef45",
      "#fabed4",
      "#469990",
      "#9A6324",
      "#800000",
      "#aaffc3",
      "#808000",
      "#ffd8b1",
      "#000075",
      "#a9a9a9",
      "#000000",
    ];
  
    let startBtn = document.querySelector("#start-button");
    startBtn.addEventListener("click", startGame);
  
    function startGame() {
      setScore(0);
      numCards = getRandomEvenNumber();
      let colorArray = colors.slice(0, numCards / 2);
      let pairs = shuffle(colorArray.concat(colorArray));
  
      for (let i = 0; i < numCards; i++) {
        let newDiv = document.createElement("div");
        newDiv.classList.add(pairs[i]);
        newDiv.addEventListener("click", cardClick);
        cards.append(newDiv);
      }
    }
  
    function endGame() {
      const done=document.querySelector("#end")
      done.classList.remove("hidden")
    }
  
    function cardClick(e) {
      if (!canClick) return;
      if (e.target.classList.contains("flipped")) return;
  
      let currentCard = e.target;
      currentCard.style.backgroundColor = currentCard.classList[0];
  
      if (!card1 || !card2) {
        if (!currentCard.classList.contains("flipped")) {
          setScore(currentScore + 1);
        }
        currentCard.classList.add("flipped");
        card1 = card1 || currentCard;
        card2 = currentCard === card1 ? null : currentCard;
      }
  
      if (card1 && card2) {
        canClick = false;
        let gif1 = card1.className;
        let gif2 = card2.className;
  
        if (gif1 === gif2) {
          cardsFlipped += 2;
          card1.removeEventListener("click", cardClick);
          card2.removeEventListener("click", cardClick);
          card1 = null;
          card2 = null;
          canClick = true;
        } else {
          setTimeout(function () {
            card1.style.backgroundColor = "";
            card2.style.backgroundColor = "";
            card1.classList.remove("flipped");
            card2.classList.remove("flipped");
            card1 = null;
            card2 = null;
            canClick = true;
          }, 1000);
        }
      }
  
      if (cardsFlipped === numCards) endGame();
    }
  
    function setScore(newScore) {
      currentScore = newScore;
      document.getElementById("current-score").innerText = currentScore;
    }
  
    function shuffle(array) {
      let arrayCopy = array.slice();
      for (let idx1 = arrayCopy.length - 1; idx1 > 0; idx1--) {
        // generate a random index between 0 and idx1 (inclusive)
        let idx2 = Math.floor(Math.random() * (idx1 + 1));
  
        // swap elements at idx1 and idx2
        let temp = arrayCopy[idx1];
        arrayCopy[idx1] = arrayCopy[idx2];
        arrayCopy[idx2] = temp;
      }
      return arrayCopy;
    }
  
    // returns random even number between 4 and 20
    function getRandomEvenNumber() {
      const randomNumber = Math.floor(Math.random() * (colors.length - 3)) + 4;
      if (randomNumber % 2 !== 0) {
        return randomNumber + 1;
      }
      return randomNumber;
    }
  });