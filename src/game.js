function Game (targetElement, height, width) {
    var me = this;
    this.canvas = document.getElementById(targetElement);
    this.canvas.width = width;
    this.canvas.height = height;
    this.canvas.style = 'border:solid 2px black;';
    this.context = this.canvas.getContext('2d');

    this.sideLength = 10;

    this.rows = height / this.sideLength;
    this.cols = width / this.sideLength;

    this.grid = new Grid(this.rows, this.cols);
    this.grid.setLiving(1,1);
    this.grid.setLiving(1,2);
    this.grid.setLiving(1,3);

    let clickEvent = function(event) {
        let x = event.pageX - me.canvas.offsetLeft;
        let y = event.pageY - me.canvas.offsetTop;
            
        let i = Math.floor(x / me.sideLength);
        let j = Math.floor(y / me.sideLength);
        
        if (typeof(me.grid) == 'undefined') 
        console.log("undefined error");
        me.grid.setLiving(j, i);
    }

    this.mouseDown = false;

    this.startSim = false;

    window.onkeydown = function (event) {
        me.startSim = ! me.startSim;
        console.log(me.startSim);
    }

    this.canvas.addEventListener('mousedown', function (event) {
        me.mouseDown = true;
        clickEvent(event);
        me.canvas.addEventListener('mousemove', clickEvent);
    })

    this.canvas.addEventListener('mouseup', function(event) {
        me.mouseDown = false;
        me.canvas.removeEventListener('mousemove', clickEvent);
    })
    
};

Game.prototype.update = function() {
    this.grid.updateStatus();
}

Game.prototype.drawLineHelper = function(total, step, to, direc) {
    for (let i = step; i < total; i+= step) {
        this.context.beginPath();
        if (direc == 'vertical') {
            this.context.moveTo(i, 0);
            this.context.lineTo(i, to);
        }
        else {
            this.context.moveTo(0, i);
            this.context.lineTo(to, i); 
        }
        this.context.stroke(); 
    } 
}

Game.prototype.displayOut = function(){
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    let sl = this.sideLength;

    this.context.fillStyle = 'black';
    this.context.strokeStyle = "gray";
    for (let i = this.sideLength; i < this.canvas.width; i+= this.sideLength) {
        this.context.beginPath();
        this.context.moveTo(i, 0);
        this.context.lineTo(i, this.canvas.height);
        this.context.stroke(); 
    }
    for (let i = this.sideLength; i < this.canvas.height; i+= this.sideLength) {
        this.context.beginPath();
        this.context.moveTo(0, i);
        this.context.lineTo(this.canvas.width, i);
        this.context.stroke(); 
    }    
    for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
            if (this.grid.getIsAlive(i, j)) {
                this.context.fillRect(j * sl, i * sl, sl, sl);
            }
        }
    }
};

Game.prototype.resetGrid = function() {
    this.grid = new Grid(this.rows, this.cols);
}




let g = new Game("thiscanvas", 500, 800);

document.getElementById("startButton").onclick = function() {
    g.startSim = !g.startSim;
    if (g.startSim) {
        document.getElementById("startButton").innerHTML = "pause";
    }
    else {
        document.getElementById("startButton").innerHTML = "start";
    }
};

document.getElementById("clearButton").onclick = function() {
    g.resetGrid();
};

document.getElementById("stepButton").onclick = function() {
    g.update();
}


g.displayOut();
setInterval(function() {
    if (g.startSim) {
    g.update();}
    console.log("hello");
    g.displayOut();
}, 100); 