function betweenRandom(min, max) {
    return Math.random() * (max - min) + min;
}
var acolor = ["#228B22", "#FD5B78", "#00BFFF", "#FFA500", "#FF0000"];
var mouseX = -500, mouseY = -500;
function getMouseXY() {
    $("#stage").mousemove(function (e) {
        mouseX = e.clientX || 0;
        mouseY = e.clientY || 0;
    })
}
// 创建一个球的构造函数
function mother(maxWidth, maxHeight, ctx) {
    this.ctx = ctx;
    this.maxWidth = maxWidth;
    this.maxHeight = maxHeight;
}
// 创建方法
mother.prototype = {
    // 配置
    // -pi<=t<=pi 或 0<=t<=2*pi
    // x=a*(2*cos(t)-cos(2*t))
    // y=a*(2*sin(t)-sin(2*t))
    // 心形坐标
    // 半径为a
    init: function () {
        // 随机配置
        // this.x = betweenRandom(0, this.maxWidth);
        // this.y = betweenRandom(0, this.maxHeight);
        this.t = (betweenRandom(0, 360) / 180) * Math.PI;
        this.r = betweenRandom(1, 10);
        this.x = 50 * (2 * Math.cos(this.t) - Math.cos(2 * this.t))+(this.maxWidth/2);
        this.y = 50 * (2 * Math.sin(this.t) - Math.sin(2 * this.t))+(this.maxHeight/2);
        this.beiyongR = this.r;
        this.color = acolor[Math.floor(betweenRandom(0, 5))];
        this.vx = betweenRandom(-1, 1);
        this.vy = betweenRandom(-1, 1);
        this.beizhi = false;//小球是否在鼠标周围
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
        // 在鼠标周围就放大
        if (this.x - this.r < 0 || this.x + this.r > this.maxWidth) { this.vx = -this.vx; }
        if (this.y - this.r < 0 || this.y + this.r > this.maxHeight) { this.vy = -this.vy; }
        var distance = Math.sqrt((mouseX - this.x) ** 2 + (this.y - mouseY) ** 2)
        // 圆形
        //        if (distance < 99){
        //            this.x += -this.vx;
        //            this.y += -this.vy;
        //        }
        //        else if(distance > 101){
        //           this.x += this.vx;
        //           this.y += this.vy;
        //        }
        //        else{
        //            if (this.r < 20){
        //                this.r++
        //            }
        //        }
        //        //心形1
        //        var dlta_x = this.x - mouseX
        //        var dlta_y = this.y - mouseY
        //        var a = 100
        //        if (dlta_x**2+dlta_y**2 - a*dlta_y > a * Math.sqrt(dlta_x**2+dlta_y**2)){
        //            this.x += -this.vx;
        //            this.y += -this.vy;
        //        }
        //        else if(dlta_x**2+dlta_y**2 - a * dlta_y < a * Math.sqrt(dlta_x**2+dlta_y**2)){
        //            this.x += this.vx;
        //            this.y += this.vy;
        //        }

        //        //心形2
        //        var dlta_x = this.x - mouseX
        //        var dlta_y = this.y - mouseY
        //        var a = 12500 * 4
        //        var jiange = 500 *4
        //
        //        var distance = 5*(dlta_x**2) + 6*Math.abs(dlta_x)*(dlta_y) + 5*(dlta_y**2)
        //        if (distance < a-jiange){
        //            this.x += -10*this.vx;
        //            this.y += -10*this.vy;
        //        }
        //        else if(distance > a+jiange){
        //            this.x += this.vx;
        //            this.y += this.vy;
        //        }


        //心形2 快速
        var dlta_x = this.x - mouseX
        var dlta_y = this.y - mouseY
        var a = 12500 * 4
        var jiange = 500 * 4

        var distance = 5 * (dlta_x ** 2) + 6 * Math.abs(dlta_x) * (dlta_y) + 5 * (dlta_y ** 2)
        if (distance < a - jiange) {
            for (var i = 0; i < 10; i++) {
                this.x += this.vx;
                this.y += this.vy;
            }
            if (this.r < 50) {
                this.r++
            }
        }
        else if (distance > a + jiange) {
            this.x += this.vx;
            this.y += this.vy;
            if (this.r > this.beiyongR) {
                this.r--
            }
        } else {
            if (this.r > 15) {
                this.r--;
            }
        }






        //        if (distance <=100) {
        //            if (this.r < 100)
        //            {
        //                this.r++
        //            }
        //        }
        //        // 不在鼠标周围时
        //        else {
        //            if (this.r > this.beiyongR) {
        //                this.r--
        //            }
        //        }

        this.draw()

    }
}


var namecolor = ["#ffffff", "#FF69B4", "#FFC0CB", "#FFB6C1", "#FFF0F5"];
// 创建一个名字的canvas
function myname(x, y, ctx) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
}
// 创建方法
myname.prototype = {
    // 配置
    init: function () {
        // 随机配置
        this.vx = betweenRandom(-1, 1);
        this.vy = betweenRandom(-1, 1);
        this.ox = this.x;
        this.oy = this.y;
        this.r = betweenRandom(1, 4);
        this.pi = (betweenRandom(0, 360) / 180) * Math.PI;
        this.beiyongR = this.r;
        this.color = namecolor[Math.floor(betweenRandom(0, 5))];
        this.changge = betweenRandom(-1, 1);
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
        // 在鼠标周围就放大
        if (this.x - this.r < 0 || this.x + this.r > this.maxWidth) { this.vx = -this.vx; }
        if (this.y - this.r < 0 || this.y + this.r > this.maxHeight) { this.vy = -this.vy; }
        var distance = Math.sqrt((mouseX - this.x) ** 2 + (this.y - mouseY) ** 2)
        var dlta_x = this.x - mouseX
        var dlta_y = this.y - mouseY
        var a = 12500 * 4
        var jiange = 500 * 4

        var distance = 5 * (dlta_x ** 2) + 6 * Math.abs(dlta_x) * (dlta_y) + 5 * (dlta_y ** 2)
        if (distance < a - jiange) {
            for (var i = 0; i < 10; i++) {
                this.x += this.vx;
                this.y += this.vy;
                if (this.r < 20) {
                    this.r++;
                }
            }
        }
        else if (distance > a + jiange) {
            if (this.y - this.oy > 5) {
                this.y--
            } else if (this.oy - this.y > 5) {
                this.y++
            }else{
                this.y=this.oy;
            }
            if (this.x - this.ox > 5) {
                this.x--
            }
            else if (this.ox - this.x > 5) {
                this.x++
            }else{
                this.x=this.ox;
            }
            if (this.r > this.beiyongR) {
                this.r--
            }
            if (this.r - this.beiyongR > 1) {
                this.changge = -1;
            }
            if (this.r <= 1) {
                this.changge = 1;
            }
            this.r += this.changge;
        } else {
            if (this.r < 15) {
                this.r++;
            }
        }
        if (this.r - this.beiyongR > 1) {
            this.changge = -0.1;
        }
        if (this.r <= 1) {
            this.changge = 0.1;
        }
        this.r += this.changge;
        this.draw();
    }
}

export { mother, getMouseXY, myname };
