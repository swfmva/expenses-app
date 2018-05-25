var inputExpenses = document.getElementById("inputExpenses");
var operator = false;
function Calculator ()
{
    let keyNumbers = ["7","8","9","4","5","6","1","7","3",".","0","del"];
    let cntNumbers = document.getElementById("cntNumbers");

    for(var i = 0; i<keyNumbers.length;i++)
    {
        let keyNum = document.createElement("button");
        keyNum.classList.add("keyNum");
        keyNum.setAttribute("id", keyNumbers[i]);
        keyNum.innerHTML = keyNumbers[i];
        cntNumbers.appendChild(keyNum);
        keyNum.addEventListener("mousedown", getKeyId);
    }
}

//
function getKeyId()
{    
    let inputValue;
    if(this.innerHTML === "del")
    {
        inputValue = inputExpenses.innerHTML;       
        if(inputValue.length > 1)
           inputValue = inputValue.slice(0,inputValue.length-1);
        else
           inputValue = "0";        
        inputExpenses.innerHTML = inputValue;
    }
    else
    {
        if(inputExpenses.innerHTML == "0")
            inputExpenses.innerHTML = this.innerHTML;
        else
        {
            inputValue = inputExpenses.innerHTML;
            inputValue += this.innerHTML;
            inputExpenses.innerHTML = inputValue;
        }
    }
}
    