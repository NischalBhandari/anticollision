;(function(){
	var highScore=0;

function gameLoop(id){
	this.canvasClass=document.getElementsByClassName('canvas-class');
	this.id=id;
	this.canvas=this.canvasClass[this.id];
	this.ctx=this.canvas.getContext('2d');
	var that=this;
	this.highScoreClass=document.getElementsByClassName('high-score');
	this.highScore=this.highScoreClass[this.id];
	this.startClass=document.getElementsByClassName('start-button');
	this.startButton=this.startClass[this.id];
	this.startMenuClass=document.getElementsByClassName('starting');
	this.startMenu=this.startMenuClass[this.id];
	this.gameOverClass= document.getElementsByClassName('game-over');
	this.gameOver=this.gameOverClass[this.id];
	this.scoreClass=document.getElementsByClassName('score');
	this.scoreContainer=this.scoreClass[this.id];
	this.image=new Image();
	this.speedControl=0;
	this.game=true;
	this.fall=true;
	this.start=false;
	this.score=0; 
	this.maintainScore=0;
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
		if(!that.game || !that.fall){
		new gameLoop(that.id);
		that.scoreContainer.innerHTML=0;
		that.startMenu.style.display="none";
		that.gameOver.style.display="none";
		}
		that.startMenu.style.display="none";

	}
	var interval=setInterval(function(){
		that.ctx.clearRect(0,0,that.canvas.width,that.canvas.height);
		that.ctx.drawImage(that.image,0,0,144,250,0,0,this.canvas.width,this.canvas.height);
		that.ctx.fillStyle="black";
		that.myGround.move();
		setTimeout(function(){
			this.createWall=true;
		},1000);
		that.myLoop.update();
	if(that.start){
		that.startMenu.style.display="none";
		that.gameOver.style.display="none";
		if(that.movement.up){
			that.myLoop.moveUp();
		}
		if(this.createWall){
		that.myWall.init();
		that.myWall.moveWall();
		that.myWall.collide();
		that.maintainScore=that.myWall.calculateScore();
		if(that.maintainScore){
			that.score+=1;
			if(that.score>parseInt(that.highScore.innerHTML)){
				that.highScore.innerHTML=that.score;
			}
			that.scoreContainer.innerHTML=that.score;
			console.log(that.score);
		}
		if(that.speedControl%100000==0){
			that.myWall.maintainSpeed();
			that.myGround.maintainSpeed();
		}

		}

		

		that.myLoop.gravity();
		that.fall=that.myLoop.collide();
		}

		that.game = that.myWall.ballCollide(that.myLoop);
		if(!that.game ){

			that.createWall=false;
			that.myLoop.fallDead();
			clearInterval(interval);
			that.startMenu.style.display="block";
			that.gameOver.style.display="block";
		}
		else if(!that.fall){
			that.start=false;
			clearInterval(interval);
			that.startMenu.style.display="block";
			that.gameOver.style.display="block";
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
			if(e.key=="Up"||e.key=="ArrowUp"||e.keyCode==32){
			that.start=true;
			that.movement.up=false;
		}
	}

}



new gameLoop(0);
new gameLoop(1);



})()
