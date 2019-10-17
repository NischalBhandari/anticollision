function ground(image,canvas,ctx){
	this.image=image;
	this.canvas=canvas;
	this.ctx=ctx;
	this.x=0;
	this.y=0;
	this.dx=3;
	this.x2=this.canvas.width-2;
	this.y2=0;


	this.init=function(){
		this.ctx.drawImage(this.image,146,0,154,56,this.x,this.canvas.height-56,this.canvas.width,56);
		this.ctx.drawImage(this.image,146,0,154,56,this.x2,this.canvas.height-56,this.canvas.width,56);
		return this;
	}
	this.maintainSpeed=function(){
		this.dx-=1/1000;
	}
	this.move=function(){
		this.x-=this.dx;
		this.x2-=this.dx;
		if(this.x+this.canvas.width/2<0){
			this.x=0;
			this.x2=this.canvas.width-2;
		}
		this.init();
	}
}