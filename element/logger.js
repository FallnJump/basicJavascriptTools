class Logger{
  constructor(obj,lines){
    this.obj=obj;
    this._log=[];
    this.lines=lines;
  }
  log(s){
    this._log.push(s);
    this._log=this._log.slice(-this.lines);
    this.obj.innerHTML=this._log.join("<br>");
  }
}
