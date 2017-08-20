// 创建秒表的canvas
window.addEventListener('load',function(){
    draw();
})

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