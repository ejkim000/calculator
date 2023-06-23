const calBody = document.getElementById('cal-body');
const calBtns = {};

 // show stored number or result
 if (localStorage.getItem('savedRes')) {
    document.getElementById('result').innerText = JSON.parse(localStorage.getItem('savedRes'));
 } else {
    document.getElementById('result').innerText = JSON.parse(localStorage.getItem('savedNum'));
 }
 // show stored process
 if (localStorage.getItem('savedCal')) {
    document.getElementById('process').innerText = JSON.parse(localStorage.getItem('savedCal')).join("");
 }

 // Set event for all the calculator buttons
 for (const calBtn of calBody.children) {
    
    // make btn and value array
    if (calBtn.id === "back") calBtns[calBtn.id] = "<";
    else calBtns[calBtn.id] = calBtn.innerText;

    // add event
    calBtn.addEventListener('click', (e)=> {
        e.preventDefault();
        calculate(calBtns[calBtn.id]);
    });
}

const calculate = (x) => {
    // get saved calculate process
    const process = document.getElementById('process');
    const result = document.getElementById('result');

    let savedCal = (localStorage.getItem('savedCal'))? JSON.parse(localStorage.getItem('savedCal')): [];
    let savedNum = (localStorage.getItem('savedNum'))? JSON.parse(localStorage.getItem('savedNum')): "";
    let savedRes = (localStorage.getItem('savedRes'))? JSON.parse(localStorage.getItem('savedRes')): "";
    
    switch (x) {
        case "CE":
            // clear
            savedNum ="";
            savedRes ="";
            break;
        case "C":
            savedNum ="";
            savedRes ="";
            savedCal = [];
            break;            
        case "<":
            // remove the last single number
            if (savedNum.length > 0) savedNum = savedNum.slice(0,-1);
            break;            
        case "+/-":
            // switch to negative/positive
            if (savedNum > 0) {
                savedNum = `(${savedNum * -1})`;
            } else {
                savedNum = savedNum.replace("(", "").replace(")", "") * -1;
            }
            break;                    
        case "+":         
        case "-":
        case "÷":
        case "×":
            // push when there is number already input
            if (savedNum) {
                savedCal.push(savedNum);
                savedCal.push(x);
                savedNum = "";
            }
            break;  
        case "=":

            if (savedNum) savedCal.push(savedNum);

            // join and replace ÷ and × to js math operatior
            let savedCalJoin = savedCal.join('')
            .replaceAll("÷", "/")
            .replaceAll("×", "*");
            // console.log(savedCalJoin);

            // calculate sting as number
            savedRes = eval(savedCalJoin);
            // round at 8 decimal point
            savedRes = Math.round(savedRes * 100000000)/100000000;

            savedNum = "";

            break;  
        default:
            savedRes = "";
            savedNum += x;
            break;
    }
    
    console.log("savedCal 2: ", savedCal);
    console.log("savedNum 2: ", savedNum);
    console.log("savedRes 2: ", savedRes);

    // save calculate process
    localStorage.setItem('savedCal', JSON.stringify(savedCal));
    localStorage.setItem('savedNum', JSON.stringify(savedNum));
    localStorage.setItem('savedRes', JSON.stringify(savedRes));

    // show result
    process.innerText = savedCal.join(' ');
    result.innerText = (savedRes)? savedRes: savedNum;
}