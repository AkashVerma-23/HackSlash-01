let body = document.querySelector("body");
let level = document.querySelector("h3");
let playground = document.querySelector(".play-colors");
let boxes = document.querySelectorAll(".box");
let helpBtn = document.querySelector(".help");

let started = false; //initial condition
let memArr = []; // Array, which stores the user's clicked color box
//memArr = ['box1', 'box3', 'box2' ]
let userArr = [];
let levelNum = 0;

let num = 0;
let clicks = 0; //this will count the user clicks
let score = 0;

playground.addEventListener("click", (event) => {
  if (started) {
    if (event.target.className == "box") {
      userFlash(event.target); //if click is correct than user get chance to play next level
      clicks++;
      userArr.push(event.target.id);
      checker();
    }
  }
});
function userFlash(box) {
  box.classList.add("userFlash"); //when clicking box,shows box-shadow
  setTimeout(() => {
    box.classList.remove("userFlash");
  }, 200);
}
function checker() {
  //e.g-memArr : [2,3,1,4]
  //userArr : [2]--[2,3]--[2,3,2]--[2,3,1,4]
  if (userArr[clicks - 1] != memArr[clicks - 1]) {
    //we have lost the game
    level.innerText = `You have lost the game, Your score is: ${score}`;
    started = false; //if choosen color is wrong,the game restarts to initial
    userArr = [];
    memArr = [];
    clicks = 0;
    num = 0;
    body.classList.add("gameOver");
    setTimeout(() => {
      body.classList.remove("gameOver");
    }, 500);
    levelNum = 1;
  } else {
    num++;
    //num== 1--2--3--4
  }
  if (num == memArr.length && num != 0) {
    //user clicked all the boxes in correct manner
    score += 10;
    userArr = [];
    clicks = 0;
    num = 0;
    setTimeout(selectBox, 500);
  }
}
body.addEventListener("keydown", () => {
  if (started == false) {
    started = true;
    selectBox();
  }
});
function selectBox() {
  level.innerText = `Level ${levelNum}`; //initially = 0
  levelNum++;

  let randVal = Math.floor(Math.random() * 4);
  flashRand(randVal);
  memArr.push(boxes[randVal].id);
}
function flashRand(randVal) {         
  boxes[randVal].classList.add("memoryFlash");
  setTimeout(() => {
    boxes[randVal].classList.remove("memoryFlash");
  }, [250]);
}
helpBtn.addEventListener("click", () => {    //when need help,click it to get the previous colors(stored)
  let initText = level.innerText;
  level.innerText = `Memory array is : ${memArr}`;
  setTimeout(() => {
    level.innerText = initText;
  }, 2000);
});
