;(function(){

function gameLoop(){
	const canvas=document.getElementById('canvas');
	const ctx=canvas.getContext('2d');

	var myLoop=new draw(20).init();
	var myWall= new walls().init();
	document.addEventListener("keydown",keyDownHandler,false);
	document.addEventListener("keydown",keyUpHandler,false);
	document.addEventListener("keyUp",keyUpHandler,false);
	var interval=setInterval(function(){
		ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
		ctx.fillStyle="blue";
		ctx.fillRect(0,0,canvas.width,canvas.height);
		ctx.fillStyle="black";
		var game=true;
		
		myWall.init();
		myWall.moveWall();
		myWall.collide();
		myLoop.gravity();
		myLoop.update();
		myLoop.collide();

		game = myWall.ballCollide(myLoop);
		console.log(game);
		if(!game){
			document.location.reload();
			clearInterval(interval);
			console.log("game finished");
		}
		
	},10);

	function keyDownHandler(e){
		if(e.key=="Up"||e.key=="ArrowUp"){
			myLoop.moveUp();
		}
	}

	function keyUpHandler(e){
		if(e.key=="Down"||e.key=="ArrowDown"){
			myLoop.moveDown();
		}
	}

}
function draw(ballRadius){
	this.canvas=document.getElementById('canvas');
	this.ctx=this.canvas.getContext('2d');
	this.ballRadius=ballRadius;
	this.diameter=this.ballRadius*2;
	this.dy=-5;
	var that=this;
	this.dx=0;
	this.x=this.canvas.width/3;
	this.y=Math.floor(Math.random()*(this.canvas.height-this.ballRadius));
	this.density=2;
	this.volume=(4/3)*Math.PI*this.ballRadius*this.ballRadius;
	this.mass=this.volume*this.density;


	

	this.init=function(){
		
		this.ctx.beginPath();
		this.ctx.arc(this.x,this.y,this.ballRadius,0,Math.PI*2);
		this.ctx.fill();
		return this;
	}

	this.update=function(){
/*		this.x+=this.dx;
		this.y+=this.dy;*/
		this.init();
	}
	this.moveUp=function(){
		this.x+=this.dx;
		this.y+=this.dy;
	}
	this.moveDown=function(){
		this.x-=this.dx;
		this.y-=this.dy;
	}

	this.collide=function(){
		if(this.y+this.dy+this.ballRadius<0){
			this.y=this.canvas.height-this.diameter;
		}
		if(this.y+this.dy>this.canvas.height){
			this.y=this.ballRadius;
		}
	}
	this.gravity=function(){
		var force=this.mass/10000;
		this.y+=force;

	}



}
function walls(){
	this.canvas=document.getElementById('canvas');
	this.ctx=this.canvas.getContext('2d');
	this.wallWidth=20;
	this.wallHeight=100;
	this.x=this.canvas.width-this.wallWidth;
	this.y=this.canvas.height-this.wallHeight;

	this.dx=-3;
	this.dy=0;
	var that=this;

	this.init=function(){
		
		this.ctx.beginPath();
		this.ctx.rect(this.x,this.y,this.wallWidth,this.wallHeight);
		this.ctx.fill();
		return this;
	}

	this.moveWall=function(){
		this.x+=this.dx;
		this.init();
	}
	this.collide=function(){
		var change=Math.random()<0.5?Math.floor(Math.random()*100):-Math.floor(Math.random()*100);
		if(this.x+this.dx<this.wallWidth){
			this.x = this.canvas.width-this.wallWidth;
			this.wallHeight+=change;
			if(this.wallHeight<0){
				this.wallHeight=50;
			}
			this.y=this.canvas.height-this.wallHeight;
		}
		if(this.x+this.dx+this.wallWidth>this.canvas.width){
			this.dx=-this.dx;
		}
	}

	this.ballCollide=function(ball){
		if(ball.x+ball.diameter>this.x && ball.x+ball.diameter<this.x+this.wallWidth){
			if(ball.y+ball.diameter-ball.ballRadius>this.canvas.height-this.wallHeight){
				
				return false;
			}
			else{
				return true;
			}
		}
		else{
			return true;
		}
	}
}

new gameLoop();



})()
