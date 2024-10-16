let questions = ["ques1", "ques2", "ques3", "ques4", "ques5"];
let numbers = ["one", "two", "three", "four", "five"];

let alpha = document.querySelector(".one");

alpha.addEventListener("click", function() {
    console.log("Clicked")
    if (document.getElementById("ques1").innerHTML === "pending") {
        document.getElementById("ques1").innerHTML = "success";
        document.getElementById("ques1").style.color = "rgba(107, 186, 103, 0.805)"
        document.getElementById("s-one").style.backgroundColor = "rgba(26, 107, 26, 0.987)"
        document.getElementById("s-one").style.border = "1px solid rgba(26, 107, 26, 0.987)"
    }
    else {
        document.getElementById("ques1").innerHTML = "pending"
        document.getElementById("ques1").style.color = "rgb(240, 98, 98)"
        document.getElementById("s-one").style.backgroundColor = "rgba(138, 62, 62, 0.805"
        document.getElementById("s-one").style.border = "1px solid rgba(138, 62, 62, 0.805)"
    }
});
