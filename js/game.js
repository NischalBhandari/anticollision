;(function(){

function gameLoop(){
	this.canvas=document.getElementById('canvas');
	this.ctx=canvas.getContext('2d');
	var that=this;
	this.image=new Image();
	this.hasGravity=false;
	this.image.src='./images/spritesheet.png';
	this.createWall=false;
	this.myLoop=new draw(20).init();
	this.myWall= new walls(this.image).init();
	this.myGround=new ground(this.image,this.canvas,this.ctx).init();
	this.movement={
		up:false,
	}
	this.start=document.getElementById('startButton');
	this.start.onclick=function(){
		that.hasGravity=true;
	}
	document.addEventListener("keydown",keyDownHandler,false);
	document.addEventListener("keydown",keyUpHandler,false);
	document.addEventListener("keyup",keyUpStopHandler,false);
	var interval=setInterval(function(){
		that.ctx.clearRect(0,0,that.canvas.width,that.canvas.height);
		that.ctx.drawImage(that.image,0,0,144,250,0,0,this.canvas.width,this.canvas.height);
		that.ctx.fillStyle="black";
		var game=true;
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
		that.myLoop.collide();
		}

		var game = that.myWall.ballCollide(that.myLoop);
		console.log(that.game);
		if(!game){
			document.location.reload();
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
			that.movement.up=false;
		}
	}

}



new gameLoop();



})()
