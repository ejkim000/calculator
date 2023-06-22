const calBody = document.getElementById('cal-body');
const calBtns = {};

for (const calBtn of calBody.children) {
    calBtns[calBtn.id] = calBtn.innerText;

    // add event
    calBtn.addEventListener('click', (e)=> {
        e.preventDefault();
        calculate(calBtn.innerText);
    });
}
//console.log(calBtns);


const calculate = (x) => {
    // get saved calculate process
    const process = document.getElementById('process');
    const result = document.getElementById('result');

    let savedCal = (localStorage.getItem('savedCal'))? JSON.parse(localStorage.getItem('savedCal')): [];
    let savedNum = (localStorage.getItem('savedNum'))? JSON.parse(localStorage.getItem('savedNum')): "";
    let savedRes = (localStorage.getItem('savedRes'))? JSON.parse(localStorage.getItem('savedRes')): "";

    console.log("savedCal 1: ", savedCal);
    console.log("savedNum 1: ", savedNum);
    console.log("savedRes 1: ", savedRes);
    
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
        case "Back":
            // remove single letter
            if (savedNum.length > 0) savedNum = savedNum.slice(0,-1);
            break;            
        case "+/-":
            // switch to negative/positive
            savedNum = Math.abs(savedNum) * -1;
            break;                    
        case "+":         
        case "-":
        case "/":
        case "*":
        case "%":
            savedCal.push(savedNum);
            savedCal.push(x);
            savedNum = "";
            break;  
        case "=":
            // **** 상단에 같은 숫자다 두번 나타남, 왜??
            savedCal.push(savedNum);
            // calculate sting as number
            savedRes = eval(savedCal.join(''));
            break;  
        default:
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