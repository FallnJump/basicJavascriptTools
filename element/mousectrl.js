class MouseCtrl{
  constructor(parent){
    this.timer=new TimeSpan();
    this.startXY=null;// 描画開始座標.
    this.endXY=null;
    this.parent=parent;
    this.movef=null;
    this.pressing=0;
    this.mtstat=[false, false];
    const that=this;
    this.touching=false;
    this.parent.onpointerdown=(e)=>{this.pointwrap(e,0);};
    this.parent.onpointermove=(e)=>{this.pointwrap(e,1);};
    this.parent.onpointerup=(e)=>{this.pointwrap(e,2);};
    this.parent.ontouchstart=(e)=>{this.touchwrap(e,0);};
    this.parent.ontouchmove=(e)=>{this.touchwrap(e,1);};
    this.parent.ontouchend=(e)=>{this.touchwrap(e,2);};
  }
  toStr(pos){
    return `${pos[0].toFixed(1)}, ${pos[1].toFixed(1)}`;
  }
  descript(){
    return `${this.pressing}, ${this.toStr(this.startXY)}, ${this.toStr(this.endXY)}`;
  }
  forClick(){
    if(this.timer.getMs()<100 || 
    (this.startXY[0]==this.endXY[0] &&
    this.startXY[1]==this.endXY[1])
    ){
      return true;
    }
    return false;
  }
  mvfwrap(flg){
    if(flg==0){
      this.timer.set();
    }
    if(this.movef) this.movef(this, flg);
  }
  mouse_touch(e, flg){
    this.endXY=this.getPos(e);
    if(e.buttons!=this.pressing){
      if(this.pressing!=0){
        let me=this.make_e(e.clientX, e.clientY, this.pressing);
        this.mouse_touch(me, 2);
      }
      let bdwn=(this.pressing==0); 
      this.pressing=e.buttons;
      this.startXY=this.getPos(e);
      if(bdwn){
          this.mvfwrap(0);
      }
    }else{
      this.mvfwrap(flg);
      if(flg==2){
        this.pressing=0;
      }
    }
  }
  touchwrap(e,flg){
    if(!this.mtstat[0]){
      let me;
      if(flg==2){
          let t=e.changedTouches[0];
          me=this.make_e(t.clientX, t.clientY, this.pressing);
      }else{
          me=this.make_t2e(e);
      };
      if(me){
        this.mouse_touch(me,flg);
        this.mtstat[1]=(this.pressing>0);
      }
    }
  }
  pointwrap(e,flg){
    if(e.pointerType!="touch" && !this.mtstat[1]){
      this.mouse_touch(e, flg);
      this.mtstat[0]=(this.pressing>0);
    }
  }
  make_e(cX, cY, btns){
    let me={};
    me.clientX=cX;
    me.clientY=cY;
    me.buttons=btns;
    return me;
  }
  make_t2e(e){
    if(e.touches.length==1){
      let t=e.touches[0];
      return this.make_e(t.clientX, t.clientY, 1);
    }else{
      return null;
    }
  }
  getPos(e){
    // element内の相対座標を取得.
    const rect = this.parent.getBoundingClientRect();
    return [e.clientX - rect.left,e.clientY - rect.top];
  }
  evtlog(){
      evt.log.push();
  }
}
