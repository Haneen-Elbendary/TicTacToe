// select all elements from DOM
let btnsRef = document.querySelectorAll(".button-option")
let message = document.querySelector("#message")
let popUp = document.querySelector(".popup")
let newGame = document.querySelector("#new-game")
let restart = document.querySelector("#restart")
// flag && counting vars
let xTrun = true
let counter = 0
let draw = false
// the array that holds all winning propilities
const winningCombinations = [
    // Rows
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    // Columns
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    // Diagonals
    [0, 4, 8],
    [2, 4, 6]
];
// disable all buttons after winning (opt)
const btnsDisable = () => {
    btnsRef.forEach(el => {
        el.disabled = true
    })
    // to show the popUp that has the result
    popUp.classList.remove("hide")
}
const btnsEnable = () => {
    btnsRef.forEach(el => {
        el.disabled = false
        el.innerHTML = ""
    })
    popUp.classList.add("hide")
}
const win = (letter) => {
    btnsDisable()
    if (letter === "X") {
        message.innerHTML = "&#x1F389; <br> 'X' Win "

    }
    else {
        message.innerHTML = "&#x1F389; <br> 'O' Win "

    }
}
newGame.addEventListener("click", () => {
    btnsEnable()
    counter = 0
})
restart.addEventListener("click", () => {
    btnsEnable()
    counter = 0
})
const drawFun = () => {
    btnsDisable()
    message.innerHTML = "😒 <br> Draw! "
    counter = 0
}
// to check winning
const winChecking = () => {
    // our propilities 
    for (i of winningCombinations) {
        let [el1, el2, el3] = [btnsRef[i[0]].innerHTML, btnsRef[i[1]].innerHTML, btnsRef[i[2]].innerHTML]
        if (el1 !== "" && el2 !== "" && el3 !== "") {
            if (el1 === el2 && el2 === el3) {
                win(el1)
                return true

            }
        }
    }
}
// start the logic
btnsRef.forEach(el => {
    el.addEventListener("click", () => {
        if (xTrun) {
            el.innerHTML = "X"
            xTrun = false
            el.disabled = true
            counter++;
        } else {
            el.innerHTML = "O"
            xTrun = true
            el.disabled = true
            counter++;
        }
        draw = winChecking()
        if (counter === 9 && draw !== true) {
            drawFun()
        }
    })
})