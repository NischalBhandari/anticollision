function draw(ballRadius,canvas,ctx){
	this.canvas=canvas;
	var that=this;
	this.ctx=ctx;
	this.ballRadius=ballRadius;
	this.diameter=this.ballRadius*2;
	this.dy=-5;
	var that=this;
	this.dx=0;
	this.isFalling=false;
	this.counter=0;
	this.spritePosition=0;
	this.x=this.canvas.width/3;
	this.y=/*Math.floor(Math.random()*(this.canvas.height-this.ballRadius))*/ (this.canvas.height-this.ballRadius)/2;
	this.density=2;
	this.volume=(4/3)*Math.PI*this.ballRadius*this.ballRadius;
	this.mass=this.volume*this.density;
	this.force=1;
	this.image=new Image();
	this.image.src='./images/bird.png';
	this.fallingImage = new Image();
	this.fallingImage.src='./images/fallingbird.png';


	

	this.init=function(){
		this.ctx.beginPath();
		if(!this.isFalling){
		this.ctx.drawImage(this.image,this.spritePosition*40,0,40,60,this.x,this.y,40,60);
		}
		this.ctx.fill();
		return this;
	}

	this.update=function(){
/*		this.x+=this.dx;
		this.y+=this.dy;*/
		this.counter+=1;
		this.counter=this.counter%20;
		if(this.counter==0){
			this.spritePosition+=1;
			this.spritePosition=this.spritePosition%3;
		}
		this.init();
	}
	this.moveUp=function(){
		this.force=1;
		this.isFalling=false;
		this.x+=this.dx;
		this.y+=this.dy;
	}
	this.moveDown=function(){
		this.x-=this.dx;
		this.y-=this.dy;
	}
	this.fallDead=function(){
/*		this.y+=10;
		this.ctx.drawImage(this.image,this.spritePosition*40,0,40,60,this.x,this.y,40,60);*/
	}

	this.collide=function(){
		if(this.y+this.dy+this.ballRadius<0){
			this.y=this.ballRadius;
			return true;
		}
		else if(this.y+this.dy>this.canvas.height-80){
			return false;
		}
		else {
			return true;
		}
	}
	this.gravity=function(){
		
		this.accelerate();

		
	if(this.isFalling){
		this.ctx.drawImage(this.fallingImage,this.spritePosition*40,0,40,60,this.x,this.y,40,60);
		}
		this.y+=this.force; 

	}
	this.accelerate=function(){
		setTimeout(function(){
			that.force=that.force+1/10;
			if(that.force>2){
				that.isFalling=true;
			}

		},100);
	}



}