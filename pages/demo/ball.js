function betweenRandom(min, max) {
    return Math.random() * (max - min) + min;
}
var acolor = ["#228B22", "#FD5B78", "#00BFFF", "#FFA500", "#FF0000"];
var mouseX, mouseY;
function getMouseXY() {
    $("#stage").mousemove(function (e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    })
}
// 创建一个构造函数
function mother(maxWidth, maxHeight, ctx) {
    this.ctx = ctx;
    this.maxWidth = maxWidth;
    this.maxHeight = maxHeight;
}
// 创建方法
mother.prototype = {
    // 配置
    init: function () {
        // 随机配置
        this.x = betweenRandom(0, this.maxWidth);
        this.y = betweenRandom(0, this.maxHeight);
        this.r = betweenRandom(5,10);
        this.beiyongR =this.r;
        this.color = acolor[Math.floor(betweenRandom(0, 5))];
        this.vx = betweenRandom(-1, 1);
        this.vy = betweenRandom(-1, 1);
        this.beizhi=false;//小球是否在鼠标周围
        this.d = 50;//当鼠标在小球50像素边
    },
    // 绘制
    draw: function () {
        this.ctx.beginPath();
        this.ctx.fillStyle = this.color;
        this.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        this.ctx.fill();
    },
    // 移动
    move: function () {
        if (this.x - this.r < 0 || this.x + this.r > this.maxWidth) { this.vx = -this.vx; }
        if (this.y - this.r < 0 || this.y + this.r > this.maxHeight) { this.vy = -this.vy; }
        // 在鼠标周围就放大
        if ((mouseX - this.x <= 100 && this.x - mouseX <= 100) && (this.y - mouseY <= 100 && mouseY - this.y <= 100)) {
           if(this.r>=50){
               this.r=50
           }else{
               this.r++
           }
        }
        // 不在鼠标周围时
        else{
            if(this.r>this.beiyongR){
                this.r--
            }else{
                this.r=this.beiyongR
            }
        }
        this.x += this.vx,
            this.y += this.vy;
        this.draw()
    }
}

export { mother, getMouseXY };