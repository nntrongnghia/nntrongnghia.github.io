const btnStart = document.querySelector(".start");
const btnReset = document.querySelector(".reset");
const clock = document.querySelector('.clock');

var isStarted = false;
var startTime;
var oldElapsedTime = 0;
var elapsedTime = 0;
var hour = "00";
var min = "00";
var second = "00";
var ms = "000";
let clockStr = `${hour} : ${min} : ${second} : ${ms}`;
clock.textContent = clockStr;

function displayTime() {
    if (isStarted) {
        elapsedTime = Date.now() - startTime;
        format_time(elapsedTime + oldElapsedTime);
        let clockStr = `${hour} : ${min} : ${second} : ${ms}`;
        document.querySelector('.clock').textContent = clockStr;
    }
}

function padding_zero(num){
    if(num < 10){
        return "0" + num;
    }
    else return num;
}

function format_time(num) {
    let numSecond = Math.floor(num/1000);
    let numMs = num - numSecond*1000;

    let numH = Math.floor(numSecond/3600);
    numSecond -= numH*3600;

    let numMin = Math.floor(numSecond/60)
    numSecond -= numMin*60;

    if(numMs < 10) ms = "00" + numMs;
    else if(numMs < 100) ms = "0" + numMs;
    else ms = numMs;

    second = padding_zero(numSecond);
    min = padding_zero(numMin);
    hour = padding_zero(numH);
}


btnStart.onclick = function () {
    if (!isStarted) { // config to resume/start
        startTime = Date.now();
        btnStart.textContent = "Pause";
    }
    else{ // config to pause
        oldElapsedTime += elapsedTime;
        btnStart.textContent = "Resume";
    }
    isStarted = !isStarted;
}

btnReset.onclick = function(){
    isStarted = false;
    elapsedTime = 0;
    oldElapsedTime = 0;
    hour = "00";
    min = "00";
    second = "00";
    ms = "000";
    let clockStr = `${hour} : ${min} : ${second} : ${ms}`;
    clock.textContent = clockStr;
    btnStart.textContent = "Start";
}

const createClock = setInterval(displayTime, 1);