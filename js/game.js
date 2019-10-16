;(function(){

function gameLoop(id){
	this.canvasClass=document.getElementsByClassName('canvas-class');
	this.id=id;
	this.canvas=this.canvasClass[this.id];
	this.ctx=this.canvas.getContext('2d');
	var that=this;
	this.startClass=document.getElementsByClassName('start-button');
	this.startButton=this.startClass[this.id];
	this.startMenuClass=document.getElementsByClassName('starting');
	this.startMenu=this.startMenuClass[this.id];
	this.image=new Image();
	this.game=true;
	this.fall=true;
	this.hasGravity=false;
	this.image.src='./images/spritesheet.png';
	this.createWall=false;
	this.myLoop=new draw(20,this.canvas,this.ctx).init();
	this.myWall= new walls(this.image,this.canvas,this.ctx).init();
	this.myGround=new ground(this.image,this.canvas,this.ctx).init();
	this.movement={
		up:false,
	}
	document.addEventListener("keydown",keyDownHandler,false);
	document.addEventListener("keydown",keyUpHandler,false);
	document.addEventListener("keyup",keyUpStopHandler,false);
	this.startButton.onclick=function(){
		new gameLoop(that.id);
		that.startMenu.style.display="none";

	}
	var interval=setInterval(function(){
		that.ctx.clearRect(0,0,that.canvas.width,that.canvas.height);
		console.log("done this",that.id);
		that.ctx.drawImage(that.image,0,0,144,250,0,0,this.canvas.width,this.canvas.height);
		that.ctx.fillStyle="black";
		that.myGround.move();
		setTimeout(function(){
			this.createWall=true;
		},1000);
		that.myLoop.update();
	if(that.hasGravity){
		if(that.movement.up){
			that.myLoop.isUp=true;
			setTimeout(function(){
				that.myLoop.isUp=false;
			},3000);
			
			that.myLoop.moveUp();
		}
		if(this.createWall){
		that.myWall.init();
		that.myWall.moveWall();
		that.myWall.collide();
		}
		

		that.myLoop.gravity();
		that.fall=that.myLoop.collide();
		console.log("returned",that.game);
		}

		that.game = that.myWall.ballCollide(that.myLoop);
		console.log(that.game);
		if(!that.game ){

			that.createWall=false;
			that.myLoop.fallDead();
			clearInterval(interval);
			that.startMenu.style.display="block";
		}
		else if(!that.fall){
			that.hasGravity=false;
			clearInterval(interval);
			console.log("game finished");
		}
		
	},10);

	function keyDownHandler(e){
		if(e.key=="Up"||e.key=="ArrowUp" ||e.keyCode==32){
			/*that.myLoop.moveUp();*/
			that.movement.up=true;
		}
	}

	function keyUpHandler(e){
		if(e.key=="Down"||e.key=="ArrowDown"){
			that.myLoop.moveDown();
		}
	}
	function keyUpStopHandler(e){
		console.log("up pressed");
			if(e.key=="Up"||e.key=="ArrowUp"||e.keyCode==32){
			that.hasGravity=true;
			that.movement.up=false;
		}
	}

}



new gameLoop(0);
/*new gameLoop(1);*/



})()
