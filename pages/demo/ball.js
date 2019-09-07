function betweenRandom(min,max){
    return Math.random()*(max-min)+min;
}
var acolor=["#1db0b8","#de8100","#3b200c","#ff534d","#edd0be"];

// 创建一个构造函数
function bubble(cwidth,cheight,ctx,mouseX,mousY){
    this.cwidth=cwidth;
    this.cheight=cheight;
    this.ctx=ctx;
    this.mousY=0||mousY;
    this.mouseX=0||mouseX;
}
// 创建方法
bubble.prototype={
    // 配置
    init:function(){
        // 随机配置
        this.x=betweenRandom(0,this.cwidth);
        this.y=betweenRandom(0,this.cheight);
        this.r=betweenRandom(2,4);
        this.color=acolor[Math.floor(betweenRandom(0,5))];
        this.vx=betweenRandom(-1,1);
        this.vy=betweenRandom(-1,1);
        this.d=50;//当鼠标在小球50像素边
    },
    // 绘制
    draw:function(){
        this.ctx.beginPath();
        this.ctx.fillStyle = this.color;
        this.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        this.ctx.fill();
    },
    // 移动
    move:function(){
        if(this.x-this.r<0||this.x+this.r>this.cwidth){this.vx=-this.vx;}
        if(this.y-this.r<0||this.y+this.r>this.cheight){this.vy=-this.vy;}
        this.x+=this.vx,
        this.y+=this.vy;
        this.draw()
    }
}

export default bubble;