window.addEventListener('load', function () {
    var ruler = document.getElementById('ruler');
    degree = ruler.offsetLeft;

    timeGrid('in_circle');
    timeGrid('downTimer');
    nowTime();
    Move();
    draw();
    start();
    print();
    clear();
    downCount();
    drag();
    // startDownCount();
})

var degree = 0;
var downDegree;

// 获取当前时间 设置初始位置
function nowTime() {
    var odate = new Date();
    var nowHour = odate.getHours();
    var nowMinute = odate.getMinutes();
    var nowSecond = odate.getSeconds();

    var secondHand = document.getElementsByClassName('second')[0];
    var minutesHand = document.getElementsByClassName('minutes')[0];
    var hourHand = document.getElementsByClassName('hour')[0];

    secondHand.style.transform = "rotate(" + nowSecond * 6 + "deg)";
    minutesHand.style.transform = "rotate(" + nowMinute * 6 + "deg)";
    hourHand.style.transform = "rotate(" + nowHour * 30 + "deg)";
}

// 指针
function Move() {
    var secondHand = document.getElementsByClassName('second')[0];
    var minutesHand = document.getElementsByClassName('minutes')[0];
    var hourHand = document.getElementsByClassName('hour')[0];

    setInterval(function () {
        // var odate = new Date('Wed Aug 16 2017 23:00:15 GMT+0800 (CST)');
        var odate = new Date();
        var nowHour = odate.getHours();
        var nowMinute = odate.getMinutes();
        var nowSecond = odate.getSeconds();

        var PerSecond = nowSecond * 6;
        var PerMinute = nowMinute * 6;
        var PerHour = nowHour * 30;

        secondHand.style.transform = "rotate(" + PerSecond % 360 + "deg)";
        minutesHand.style.transform = "rotate(" + PerMinute % 360 + "deg)";
        hourHand.style.transform = "rotate(" + PerHour % 360 + "deg)";
    }, 1000)
}

// 秒表
function timeGrid(idName) {
    for (var i = 0; i < 60; i++) {
        var plate = document.getElementById(idName);
        var point = document.createElement('i');
        point.classList.add('points');
        plate.appendChild(point);
    }

    var timePoints = document.getElementsByClassName('points');
    for (var i = 0; i < timePoints.length; i++) {
        timePoints[i].style.transform = "rotate(" + i * 6 + "deg)";
        if (i % 5 === 0) {
            timePoints[i].style.backgroundColor = "#000";
        }
    }
}

// 绘图
function draw() {
    var dom = document.getElementsByClassName('drawing');
    for (var i = 0; i < 3; i++) {
        ctx = dom[i].getContext('2d');
        ctx.shadowBlur = 10;
        ctx.shadowColor = "black";
        ctx.fillStyle = '#fff';
        ctx.fillRect(5, 5, 50, 20);
        ctx.fillRect(20, 25, 20, 25);
    }
    var dom1 = document.getElementsByClassName('circleBtn')[0];
    var ctx1 = dom1.getContext('2d');
    ctx1.shadowBlur = 10;
    ctx1.shadowColor = "black";
    ctx1.beginPath();
    ctx1.lineWidth = 5;
    ctx1.strokeStyle = "#fff";
    ctx1.arc(50, 50, 40, 0, 2 * Math.PI, false);
    ctx1.stroke();
}

// 开始计时
var clickState = false;
var timer_needle = null;
var timer_count = null;
var x = 0;
var time_ms = 0;
var time_s = 0;
var time_min = 0;

function start() {
    var btn = document.getElementById("btn");
    btn.addEventListener('click', timing);
}

function timing() {
    var secondTiming = document.getElementById('secondTiming');
    var changeScore = document.getElementById('score');
    if (!clickState) {
        timer_count = setInterval(function () {
            x = x + 0.06;
            secondTiming.style.transform = "rotate(" + x + "deg)";
            time_ms = time_ms + 1;
            if (time_ms === 100) {
                time_ms = 0;
                time_s = time_s + 1;
            }
            if (time_s === 60) {
                time_s = 0;
                time_min = time_min + 1;
            }
            changeScore.innerHTML = addZero(time_min) + ':' + addZero(time_s) + ':' + addZero(time_ms);
        }, 10)
        clickState = true;
    } else if (clickState) {
        clearInterval(timer_count);
        clickState = false;
    }
}

function addZero(num) {
    if (num < 10) {
        return '0' + num;
    } else {
        return num;
    }
}


// 打印
function print() {
    var print_btn = document.getElementById('drawing1');
    print_btn.addEventListener('click', printRecord);
}

function printRecord() {
    var record = document.getElementById('record');
    oSpan = document.createElement('span');
    if (clickState) {
        record.style.display = 'block';
        oSpan.innerHTML = addZero(time_min) + ':' + addZero(time_s) + ':' + addZero(time_ms);
    }
    record.appendChild(oSpan);
    record.scrollTop = record.scrollHeight;
}

// 清零
function clear() {
    var clear_btn = document.getElementById('drawing2');
    clear_btn.addEventListener('click', clearFun)
}

function clearFun() {
    if (clickState) {
        return;
    }
    x = 0;
    time_ms = 0;
    time_s = 0;
    time_min = 0;
    var secondTiming = document.getElementById('secondTiming');
    secondTiming.style.transform = "rotate(" + 0 + "deg)";

    var changeScore = document.getElementById('score');
    changeScore.innerHTML = "00:00:00";

    var record = document.getElementById('record');
    var aSpan = document.getElementsByTagName('span');
    for (var i = aSpan.length - 1; i >= 0; i--) {
        record.removeChild(aSpan[i]);
    }
    record.style.display = 'none';
}

// 倒计时
function downCount() {
    var ruler = document.getElementById('ruler');
    for (var i = 0; i <= 6; i++) {
        var ai = document.createElement('i');
        ruler.appendChild(ai);
    }
    var oi = ruler.getElementsByTagName('i');
    for (var i = 0; i < oi.length; i++) {
        oi[i].style.left = i * 45 + 'px';
    }
}

function drag() {
    var oRing = document.getElementById('ring');
    oRing.addEventListener('touchmove', draging);
    // oRing.addEventListener('touchend', dragEnd);
}


function draging(event) {
    var plane_x = event.touches[0].clientX;
    var ruler = document.getElementById('ruler');
    ruler.style.left = degree + plane_x + 'px';
    console.log(degree)
    if (parseInt(ruler.style.left) >= 0) {
        ruler.style.left = 0;
    } else if (parseInt(ruler.style.left) <= degree) {
        ruler.style.left = degree + 'px';
    }
    var x = Math.abs(parseInt(ruler.style.left));
    var plusDegree = Math.abs(degree)
    var hourTiming = document.getElementById('hourTiming');
    downDegree = Math.floor((plusDegree - x) * (4 / 3));
    hourTiming.style.transform = "rotate(" + downDegree + "deg)";
}


// var degreeTimer = null;
// var scoreNum = 60;


// function dragEnd() {
//     clearInterval(degreeTimer);
//     scoreNum = 60;
//     degreeTimer = setInterval(function () {
//         startDown_zhizheng();
//         startDown_count();
//         startDown_ruler();
//     }, 1000);
// }


// function startDown_zhizheng() {
//     var hourTiming = document.getElementById('hourTiming');
//     var startDeg = hourTiming.style.transform;
    
//     //指针倒转
//     if (!downDegree) {
//         return;
//     }
//     hourTiming.style.transform = "rotate(" + downDegree + "deg)";
//     downDegree = (downDegree - 0.1).toFixed(1);
//     // console.log(downDegree);
//     if (parseInt(ruler.style.left) <= -270) {
//         ruler.style.left = -270 + 'px';
//     }
//     if (downDegree <= 0) {
//         clearInterval(degreeTimer);
//     }

// }

// var scoreNum = 60;
// function startDown_count() {
//     var numCount = document.getElementById("downCountScore");
//     if (scoreNum === 0) {
//         scoreNum = 60;
//     }
//     scoreNum -= 1;
//     numCount.innerHTML = addZero(parseInt(downDegree / 6)) + ":" + addZero(scoreNum);
//     if (scoreNum < 0) {
//         scoreNum = 60;
//     }
//     if (numCount.innerHTML == "00:00") {
//         clearInterval(degreeTimer);
//     }
// }


// function startDown_ruler(){
//     var ruler = document.getElementById('ruler');
//     var x = parseInt(ruler.style.left);
    
//     ruler.style.transform = "translate(" + (x - 30) + "px)";
//     // console.log(ruler.style.transform)
//     // console.log(ruler.getComputerStyle.transform) 
// }
































// var numberTimer = null;
// var scoreNum = 60;
// function dragEnd() {
//     numberTimer = setInterval(function () {
//         var numCount = document.getElementById("downCountScore");
//         if (scoreNum === 0) {
//             scoreNum = 60;
//         }
//         scoreNum -= 1;
//         numCount.innerHTML = addZero(parseInt(downDegree / 6)) + ":" + addZero(scoreNum);
//         if (scoreNum < 0) {
//             scoreNum = 60;
//         }
//         if (numCount.innerHTML == "00:00") {
//             clearInterval(numberTimer);
//         }
//     }, 1000)
// }

// console.log(ruler.offsetLeft) //ruler.offsetLeft只显示整数
