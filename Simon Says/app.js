let started = false;
let level = 0;
const clickSound = new Audio("sounds/click.wav");

const successSound = new Audio("sounds/success.wav");

const gameOverSound = new Audio("sounds/gameover.wav");

let gameSeq = [];
let userSeq = [];

const startBtn = document.querySelector("#start-btn");
const h2 = document.querySelector("h2");
const allBtns = document.querySelectorAll(".btn");
const restartBtn = document.querySelector("#restart-btn");
restartBtn.style.display = "none";

// ================= START GAME =================

startBtn.addEventListener("click", function () {

    if (!started) {

        started = true;

        startBtn.style.display = "none";

        levelUp();
    }
});

restartBtn.addEventListener("click", function () {

    if (!started) {

        started = true;

        restartBtn.style.display = "none";

        levelUp();
    }
});


// ================= FLASH EFFECTS =================

function gameflash(btn) {

    btn.classList.add("flash");

    setTimeout(function () {

        btn.classList.remove("flash");

    }, 250);
}


function userFlash(btn) {

    btn.classList.add("userFlash");

    setTimeout(function () {

        btn.classList.remove("userFlash");

    }, 250);
}


// ================= LEVEL LOGIC =================

function levelUp() {

    userSeq = [];

    level++;

    h2.innerText = `Level ${level}`;

    const btns = ["yellow", "green", "blue", "red"];

    const randomIdx = Math.floor(Math.random() * 4);

    const randomColor = btns[randomIdx];

    gameSeq.push(randomColor);

    console.log("Game Sequence:", gameSeq);

    setTimeout(function () {

        const btn = document.querySelector(`.${randomColor}`);

        gameflash(btn);

    }, 1000);
}


// ================= BUTTON PRESS EFFECT =================

for (let btn of allBtns) {

    btn.addEventListener("click", function () {

        btn.classList.add("pressed");

        setTimeout(function () {

            btn.classList.remove("pressed");

        }, 100);
    });
}


// ================= ANSWER CHECKING =================

function checkAns(idx) {

    if (gameSeq[idx] === userSeq[idx]) {

        if (userSeq.length === gameSeq.length) {

            document.body.classList.add("success");

            setTimeout(function () {

                document.body.classList.remove("success");

            }, 400);

            successSound.currentTime = 0;

            successSound.play();

            levelUp();
        }

    } else {

        h2.innerText =
            `Game Over! Your score was ${level}. Press Start to Play Again`;

        document.body.classList.add("fail");

        setTimeout(function () {

            document.body.classList.remove("fail");

        }, 400);

        restartBtn.style.display = "inline";

        gameOverSound.currentTime = 0;

        gameOverSound.play();

        reset();
    }
}


// ================= RESET GAME =================

function reset() {

    level = 0;

    gameSeq = [];

    userSeq = [];

    started = false;
}


// ================= USER BUTTON PRESS =================

function btnPress() {

    console.log("Button Pressed");

    const btn = this;

    userFlash(btn);

    clickSound.currentTime = 0;
    clickSound.play();

    const userColor = btn.getAttribute("id");

    userSeq.push(userColor);

    console.log("User Sequence:", userSeq);

    checkAns(userSeq.length - 1);
}


// ================= EVENT LISTENERS =================

for (let btn of allBtns) {

    btn.addEventListener("click", btnPress);
}