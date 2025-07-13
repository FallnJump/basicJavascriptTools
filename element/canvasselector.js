class CanvasSelector extends CanvasScribe{
  constructor(canvas, img, textbox){
    super(canvas, img);
    this.mctl=new MouseCtrl(canvas);
    this.textbox=textbox;
    this._lastsel=null;
    this.scalewh=[1,1];
    this._selMode=0;
    let mctl=this.mctl;
    mctl.movef=(e, flg)=>{
      if(mctl.pressing!=1) return;
      let bw=this.canvas.width/this.canvas.clientWidth;
      let bh=this.canvas.height/this.canvas.clientHeight;
      switch(this._selMode){
       case 0:
       {
        if(mctl.forClick() && mctl._lastsel!=null){
          this._lastsel[0]=mctl.endXY[0]*bw;
          this._lastsel[1]=mctl.endXY[1]*bh;
        }else{
          this._lastsel=[0.0,0,0];
          this._lastsel[0]=(mctl.startXY[0]+mctl.endXY[0])*bw/2;
          this._lastsel[1]=(mctl.startXY[1]+mctl.endXY[1])*bh/2;
          this._lastsel[2]=Math.abs(mctl.endXY[0]-mctl.startXY[0])*bw;
          this._lastsel[3]=Math.abs(mctl.endXY[1]-mctl.startXY[1])*bh;
        }
        break;
       }
       case 1:
       {
        this._lastsel=[0,0];
        this._lastsel[0]=mctl.endXY[0]*bw;
        this._lastsel[1]=mctl.endXY[1]*bh;
        break;
       }
       case 2:
       {
        this._lastsel=[0,0,0,0];
        this._lastsel[0]=mctl.startXY[0]*bw;
        this._lastsel[1]=mctl.startXY[1]*bh;
        this._lastsel[2]=mctl.endXY[0]*bw;
        this._lastsel[3]=mctl.endXY[1]*bh;
       }
      }
      this.redraw();
    };
  }
  setSelMode(selMode){
      this._selMode=selMode;
      this._lastsel=null;
  }
  getPara(fixed=null){
    if(!this._lastsel){
        return;
    }
    let x,y,sw,sh;
    [sw,sh]=this.scalewh;
    let res;
    switch(this._selMode){
     case 0:
     {
      let w,h;
      [x,y,w,h]=this._lastsel;
      res=[x*sw,y*sh,w*sw,h*sh];
      break;
     }
     case 1:
     {
      [x,y]=this._lastsel;
      res=[x*sw,y*sh];
      break;
     }
     case 2:
     {
      let xe, ye;
      [x,y,xe,ye]=this._lastsel;
      res=[x*sw,y*sh,xe*sw,ye*sh];
      break;
     }
    }
    if(fixed!=null){
        return res.map(e=>e.toFixed(fixed));
    }
    return res;
  }
  setScalePx(w,h){
    this.scalewh=[
        w/this.canvas.width,
        h/this.canvas.height
    ];
  }
  redraw(){
    if(this.textbox){
      this.textbox.value=
      this.getPara(0).join(",");
    }
    this.cls();
    let x,y;
    switch(this._selMode){
     case 0:
     {
      let w,h,l,t,r,b;
      [x,y,w,h]=this._lastsel;
      l=x-w/2;
      t=y-h/2;
      r=w;
      b=h;
      this.rectangle(l,t,r,b,"red",2);
      break;
     }
     case 1:
     {
      let x,y;
      [x,y]=this._lastsel;
      this.cross(x,y,15,"red",2);
      break;
     }
     case 2:
     {
      let xe,ye;
      [x,y,xe,ye]=this._lastsel;
      this.line(x,y,xe,ye,"red",2);
      break;
     }
    }
  }
}
