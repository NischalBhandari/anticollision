function draw(ballRadius){
	this.canvas=document.getElementById('canvas');
	this.isUp=false;
	var that=this;
	this.ctx=this.canvas.getContext('2d');
	this.ballRadius=ballRadius;
	this.diameter=this.ballRadius*2;
	this.dy=-5;
	var that=this;
	this.dx=0;
	
	this.x=this.canvas.width/3;
	this.y=/*Math.floor(Math.random()*(this.canvas.height-this.ballRadius))*/ (this.canvas.height-this.ballRadius)/2;
	this.density=2;
	this.volume=(4/3)*Math.PI*this.ballRadius*this.ballRadius;
	this.mass=this.volume*this.density;
	this.force=1;
	this.image=new Image();
	this.image.src='./images/bird.png';


	

	this.init=function(){
		
		this.ctx.beginPath();
		if(this.isUp){
		this.ctx.drawImage(this.image,0,0,40,60,this.x,this.y,40,60);
		}
		else{
			this.ctx.drawImage(this.image,50,0,40,60,this.x,this.y,40,60);
		}
		
		this.ctx.fill();
		return this;
	}

	this.update=function(){
/*		this.x+=this.dx;
		this.y+=this.dy;*/
		this.init();
	}
	this.moveUp=function(){
		this.force=1;
		this.x+=this.dx;
		this.y+=this.dy;
	}
	this.moveDown=function(){
		this.x-=this.dx;
		this.y-=this.dy;
	}

	this.collide=function(){
		if(this.y+this.dy+this.ballRadius<0){
			this.y=this.ballRadius;
		}
		if(this.y+this.dy>this.canvas.height){
			this.y=this.canvas.height-this.ballRadius;
		}
	}
	this.gravity=function(){
		
		this.accelerate();
		console.log(this.force);
		this.y+=this.force; 

	}
	this.accelerate=function(){
		setTimeout(function(){
			that.force=that.force+1/10;
		},100);
	}



}