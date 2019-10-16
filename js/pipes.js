function walls(image,canvas,ctx){
	this.canvas=canvas;
	this.ctx=ctx;
	this.wallWidth=20;
	this.wallHeight=Math.floor(Math.random()*(200-100)+200);
	this.x=this.canvas.width-this.wallWidth;
	this.y=0;
	this.image=image;
	this.gap=200;
	this.dx=-3;
	this.dy=0;
	var that=this;

	this.init=function(){
		this.ctx.beginPath();
		this.fillStyle='blue';
		this.ctx.drawImage(this.image,303,0,25,135,this.x,this.y,60,this.wallHeight)
		/*this.ctx.fillRect(this.x,this.y,25,this.wallHeight);*/
		this.ctx.fill();
		this.ctx.beginPath();
		this.ctx.fillStyle='blue';
		this.ctx.drawImage(this.image,330,0,26,121,this.x,this.wallHeight+this.gap,60,this.canvas.height-this.wallHeight-56-this.gap);
		//this.ctx.fillRect(this.x,this.wallHeight+this.gap,25,this.canvas.height-this.wallHeight-this.gap);
		this.ctx.fill();
		return this;
	}


	this.moveWall=function(){
		this.x+=this.dx;
		this.init();
	}
	this.collide=function(){
		if(this.x+80<0){
			this.x=this.canvas.width;
			this.wallHeight=Math.floor(Math.random()*this.canvas.height/2);
		}

	}

	this.ballCollide=function(ball){
		if(ball.x < this.x + this.wallWidth &&
		   ball.x + ball.diameter > this.x &&
		   ball.y < this.y + this.wallHeight &&
		   ball.y + ball.diameter > this.y

		  ||

		   ball.x < this.x + this.wallWidth &&
		   ball.x + ball.diameter > this.x &&
		   ball.y < this.wallHeight+this.gap + this.canvas.height-this.wallHeight-this.gap &&
		   ball.y + ball.diameter > this.wallHeight+this.gap
		   ){
				console.log("testing");
				return false;
			}
			else{
				return true;
			}

	}
}