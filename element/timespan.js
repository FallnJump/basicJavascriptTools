class TimeSpan{
  constructor(){
    this.time=null;
    this.set();
  }
  set(){
    this.time=Date.now();
  }
  getMs(){
      return (Date.now()-this.time);
  }
}
