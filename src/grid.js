function Cell (x, y) {
    this.isAlive = false;
    this.x = x;
    this.y = y;
    
    this.neighborCount = 0;
};

Cell.prototype.resetIsAlive = function() {
    if (this.neighborCount == 3) { 
        this.isAlive = true;        
    }
    else if (this.neighborCount < 2 || this.neighborCount > 3) {
        this.isAlive = false;
    }
};

Cell.prototype.getNeighborCount = function() {
    return this.neighborCount;
};


function Grid (height, width) {
    this.matrix = new Array(height);
    for (let i = 0; i < height; i++) {
        this.matrix[i] = new Array(width);
        for (let j = 0; j < width; j++) {
            this.matrix[i][j] = new Cell(i, j);
        }
    }

    this.living = [];
};

Grid.prototype.getIsAlive = function(r, c) {
    return this.matrix[r][c].isAlive;
}

Grid.prototype.setLiving = function(r, c) {
    if (r >= this.matrix.length || c >= this.matrix[0].length) return;

    this.matrix[r][c].isAlive = true;
    
    let length = this.living.length;
    let exists = false;
    for (let i = 0; i < length; i++) {
        console.log(this.living[i]);
        if (this.living[i][0] == r && this.living[i][1] == c) {
            exists = true;
            break;
        }
    }
    if (!exists) {
        this.living.push([r, c]);
    }
    console.log(this.living);
;}

Grid.prototype.setDead = function(r, c) {
    this.matrix[r][c].isAlive = false;
    
    let length = this.living.length;
    for (let i = 0; i < length; i++) {
        if (this.living[i] == [r, c]) {
            this.living.delete[i];
        }
    }
}

Grid.prototype.resetNeighborCount = function() {
    for (let i = 0; i < this.matrix.length; i++) {
        for (let j = 0; j < this.matrix[i].length; j++) {
            this.matrix[i][j].neighborCount = 0;
        }
    }
};

Grid.prototype.livingNotify = function() {
    for (let i = 0; i < this.living.length; i++) {
        let r = this.living[i][0];
        let c = this.living[i][1];
        for (let m = r - 1; m <= r + 1; m++) {
            for (let n = c - 1; n <= c + 1; n++) {
                if (m >= 0 && m < this.matrix.length && n >= 0 && n < this.matrix[0].length && !(r == m && c == n)) {
                    this.matrix[m][n].neighborCount++;
                    console.log("neighborCount: " + this.matrix[m][n].neighborCount);
                }
            }
        }
    }
}

Grid.prototype.updateLiving = function() {
    this.living = [];
    for (let i = 0; i < this.matrix.length; i++) {
        for (let j = 0; j < this.matrix[i].length; j++) {
            if (this.matrix[i][j].isAlive) {
                this.living.push([i, j]);
            }
        }
    }
    console.log(this.living);
}

Grid.prototype.updateIsAlive = function() {
    for (let i = 0; i < this.matrix.length; i++) {
        for (let j = 0; j < this.matrix[i].length; j++) {
            this.matrix[i][j].resetIsAlive();
        }
    }
}

Grid.prototype.updateStatus = function() {
    this.resetNeighborCount();
    this.livingNotify();
    this.updateIsAlive();
    this.updateLiving();
}
