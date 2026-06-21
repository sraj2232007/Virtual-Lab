
function checkCondition() {
    let a = parseInt(document.getElementById("num1").value);
    let b = parseInt(document.getElementById("num2").value);
    let op = document.getElementById("operator").value;

    let output = "";

    if (op === ">") {
        output = a > b;
    } 
    else if (op === "<") {
        output = a < b;
    } 
    else if (op === "==") {
        output = a == b;
    } 
    else if (op === "!=") {
        output = a != b;
    } 
    else if (op === ">=") {
        output = a >= b;
    } 
    else if (op === "<=") {
        output = a <= b;
    }

    document.getElementById("result").innerText =
        "Condition Result (like Python): " + output;
}
