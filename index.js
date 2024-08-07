const quoteApiUrl = "https://api.quotable.io/random?minLength=80&maxLength=100";
const quoteSelection = document.getElementById("quote");
const userInput = document.getElementById("quote-input");

let quote = "";
let time = 60;
let timer = "";
let mistakes = 0;

const renderNewQuote = async () => {
    const response = await fetch(quoteApiUrl);
    let data = await response.json();
    quote = data.content;


    let arr = quote.split("").map((value) => {
    return "<span class='quote-chars'>" + value + "<span>";
    });
    quoteSelection.innerHTML += arr.join("");
};

userInput.addEventListener("input", () => {
    let quoteChars = document.querySelectorAll(".quote-chars");
    quoteChars = Array.from(quoteChars);

    let userInputChars = userInput.value.split("");
    quoteChars.forEach((char, index) => {
        if(char.innerText == userInputChars[index]) {
            char.classList.add("success");
        }
        else if (userInputChars[index] == null) {
            if(char.classList.contains("success")){
                char.classList.remove("success");
            }else{
                char.classList.remove("fail");
            }
        }
        else{
            if(!char.classList.contains("fail")) {
                mistakes++;
                char.classList.add("fail");
            }
            document.getElementById("mistakes").innerText = mistakes;
        }

        let check = quoteChars.every((element) => {
            return element.classList.contains("success");
        });

        if (check) {
            displayResult();
        }
    });
    
    });

    function updateTimer() {
        if(time == 0){
            displayResult();
        }else{
            document.getElementById("timer").innerText = --time + "s";
        }
    }

    const timeReduce = () => {
        time = 60;
        timer = setInterval(updateTimer, 1000);
    };

    




