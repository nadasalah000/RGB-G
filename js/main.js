// ^ HTML ELEMENTS
var easyBtn = document.getElementById("easyBtn")
var hardBtn = document.getElementById("hardBtn")
var rgbSyntax = document.getElementById("rgbSyntax")
var colorsContainer = document.getElementById("colorsContainer")
var getColorsBtn = document.getElementById("getColorsBtn")


// ^ App Variables
var levels = {
  easy: {
    name: "easy",
    numberOfCards: 3
  },
  hard: {
    name: "hard",
    numberOfCards: 6
  }
}
var selectedLevel = "easy"
var correctAnswer = "";
var tryCount = 1;

// ^ Functions
function generateRandomColor() {
  var red = Math.trunc(Math.random() * 256);
  var green = Math.trunc(Math.random() * 256);
  var blue = Math.trunc(Math.random() * 256);

  var color = `rgb(${red}, ${green}, ${blue})`
  return color;
}
function getNewQuestion(level) {
  var numberOfCards = levels[level].numberOfCards;
  var colors = [];

  for (var i = 1; i <= numberOfCards; i++) {
    var newColor = generateRandomColor();
    console.log(newColor)
    colors.push(newColor);
  }
  console.log(colors);
  correctAnswer = colors[Math.trunc(Math.random() * numberOfCards)];
  console.log(correctAnswer);

  rgbSyntax.innerHTML = correctAnswer
  displayColors(colors);
}
function displayColors(colorsArr) {
  var colorCardsHTML = ``;

  for (var i = 0; i < colorsArr.length; i++) {
     colorCardsHTML +=`<div class="col-md-2 col-sm-4 py-sm-5  m-auto one">
     <button class='glowing-btn ${i+1}s d-block two' id="glowing-btn" style=" border-color: ${colorsArr[i]}; box-shadow: inset 0px 0px 0.5em 0px ${colorsArr[i]},0px 0px 0.5em 0px ${colorsArr[i]};background-color:${colorsArr[i]}; color: beige;  ">
         <span class='glowing-txt' id="glowing-txt" style="text-shadow: 0 0 0.125em hsl(0 0% 100% / 0.3), 0 0 0.45em ${colorsArr[i]};">
             color
             <span class='faulty-letter' id="faulty-letter">${i+1}</span>
         </span>
     </button>
     </div>`
  }
  colorsContainer.innerHTML = colorCardsHTML;
  var allColorCards = document.querySelectorAll(".one .two");

  for (var i = 0; i < allColorCards.length; i++) {
    allColorCards[i].onclick = checkAnswer;
  }
}
function checkAnswer(e) {
  console.log("correct"+correctAnswer);

  if (e.target.style.backgroundColor === correctAnswer) {
    alert("This is the correct color");
    getNewQuestion(selectedLevel);
  } else {
    tryCount += 1;
    if(tryCount > 4){
      alert("sorry");
      getNewQuestion("hard");
      tryCount =1;
    }else{
      alert("This color is incorrect");
    }
  }
}

//^ EVENTS
getColorsBtn.onclick = function () {
    if (selectedLevel === "easy") {
      getNewQuestion("easy")
    } else {
      getNewQuestion("hard")
    }
  }
easyBtn.onclick = function () {
  hardBtn.classList.remove("active");
  easyBtn.classList.add("active")

  selectedLevel = "easy";
  getNewQuestion(selectedLevel)
}
hardBtn.onclick = function () {
  easyBtn.classList.remove("active");
  hardBtn.classList.add("active")

  selectedLevel = "hard"
  getNewQuestion(selectedLevel)
}





