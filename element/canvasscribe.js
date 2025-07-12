class CanvasScribe{
  constructor(canvas, img){
    this.ctx=canvas.getContext('2d');
    this.img=img;
    this.canvas=canvas;
    this.resize();
  }
  resize(){
    this.canvas.width=this.canvas.clientWidth;
    this.canvas.height=this.canvas.clientHeight;
    this.cls();
  }
  cls(){
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    if(this.img){
      this.drawImage(this.img, 0, 0, this.canvas.width, this.canvas.height);
    }
  }
  drawImage(...args){
      this.ctx.drawImage(...args);
  }
  changeStrokeStyle(color,border=null,style=null){
    if(color!=null) this.ctx.strokeStyle=color;
    if(border!=null) this.ctx.lineWidth=border;
    if(style!=null) this.ctx.setLineDash(...style);
  }
  rectangle(l,t,r,b,color=null,border=null,style=null){
    this.changeStrokeStyle(color, border, style);
    this.ctx.strokeRect(l,t,r,b);
  }
  fillRect(l,t,r,b,color=null){
    if(color!=null) this.ctx.fillStyle=color;
    this.ctx.fillRect(l,t,r,b);
  }
  line(l,t,r,b,color=null,border=null,style=null){
    this.changeStrokeStyle(color,border,style);
    this.ctx.beginPath();
    this.ctx.moveTo(l,t);
    this.ctx.lineTo(r,b);
    this.ctx.stroke();
  }
  lines(xys,color=null,border=null,style=null){
    this.changeStrokeStyle(color,border,style);
    this.ctx.beginPath();
    let bgn=true;
    for(let xy of xys){
      if(bgn){
        this.ctx.moveTo(...xy);
        bgn=false;
      }else{
        this.ctx.lineTo(...xy);
      }
    }
    this.ctx.stroke();
  }
  cross(x,y,size=5,color=null,border=null,style=null){
    this.line(x,y-size,x,y+size, color,border,style);
    this.line(x-size,y,x+size,y);
  }
}
