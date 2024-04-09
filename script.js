const GameDifficulty = [20, 50, 70];
class Game {
    difficulty;//difficulty based on GameDifficulty array
    cols = 3;//how many colomns
    rows = 3;//how many rows
    count;//cols*rows
    blocks;//the html elements with className="puzzle_block"
    emptyBlockCoords = [2, 2];//the coordinates of the empty block
    indexes = [];//keeps track of the order of the blocks

    constructor(difficultyLevel = 1) {
        this.difficulty = GameDifficulty[difficultyLevel - 1];
        this.count = this.cols * this.rows;
        this.blocks = document.getElementsByClassName("puzzle_block");//grab the blocks
        this.init();
    }

    init() {//position each block in its proper position
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                let blockIdx = x + y * this.cols;
                if (blockIdx + 1 >= this.count) break;
                let block = this.blocks[blockIdx];
                this.positionBlockAtCoord(blockIdx, x, y);
                block.addEventListener('click', (e) => this.onClickOnBlock(blockIdx));
                this.indexes.push(blockIdx);
            }
        }
        this.indexes.push(this.count - 1);
        this.randomize(this.difficulty);
    }

    randomize(iterationCount) {//move a random block (x iterationCount)
        for (let i = 0; i < iterationCount; i++) {
            let randomBlockIdx = Math.floor(Math.random() * (this.count - 1));
            let moved = this.moveBlock(randomBlockIdx);
            if (!moved) i--;
        }
    }

    moveBlock(blockIdx) {//moves a block and return true if the block has moved
        let block = this.blocks[blockIdx];
        let blockCoords = this.canMoveBlock(block);
        if (blockCoords != null) {
            this.positionBlockAtCoord(blockIdx, this.emptyBlockCoords[0], this.emptyBlockCoords[1]);
            this.indexes[this.emptyBlockCoords[0] + this.emptyBlockCoords[1] * this.cols] = this.indexes[blockCoords[0] + blockCoords[1] * this.cols];
            this.emptyBlockCoords[0] = blockCoords[0];
            this.emptyBlockCoords[1] = blockCoords[1];
            return true;
        }
        return false;
    }
    canMoveBlock(block) {//return the block coordinates if he can move else return null
        let blockPos = [parseInt(block.style.left), parseInt(block.style.top)];
        let blockWidth = block.clientWidth;
        let blockCoords = [blockPos[0] / blockWidth, blockPos[1] / blockWidth];
        let diff = [Math.abs(blockCoords[0] - this.emptyBlockCoords[0]), Math.abs(blockCoords[1] - this.emptyBlockCoords[1])];
        let canMove = (diff[0] == 1 && diff[1] == 0) || (diff[0] == 0 && diff[1] == 1);
        if (canMove) return blockCoords;
        else return null;
    }

    positionBlockAtCoord(blockIdx, x, y) {//position the block at a certain coordinates
        let block = this.blocks[blockIdx];
        block.style.left = (x * block.clientWidth) + "px";
        block.style.top = (y * block.clientWidth) + "px";
    }

    onClickOnBlock(blockIdx) {//try move block and check if puzzle was solved
        if (this.moveBlock(blockIdx)) {
            if (this.checkPuzzleSolved()) {
                setTimeout(() => alert("Parabéns Você Ganhou!!"), 600);
            }
        }
    }

    checkPuzzleSolved() {//return if puzzle was solved
        for (let i = 0; i < this.indexes.length; i++) {
            //console.log(this.indexes[i],i);
            if (i == this.emptyBlockCoords[0] + this.emptyBlockCoords[1] * this.cols) continue;
            if (this.indexes[i] != i) return false;
        }
        return true;
    }

    setDifficulty(difficultyLevel) {//set difficulty
        var div = document.querySelectorAll('.puzzle_block');
        this.difficulty = GameDifficulty[difficultyLevel - 1];
        this.randomize(this.difficulty);
        if (this.difficulty == 20) {
            window.location.reload();
        }
        if (this.difficulty == 50) {
            //set value of divs
            let medium1a = Math.floor(Math.random() * 6) + 2;
            let medium1b = 1 - medium1a;
            let medium2a = Math.floor(Math.random() * 10);
            let medium2b = 2 - medium2a;
            let medium3a = Math.floor(Math.random() * 10) +3;
            let medium3b = 3 - medium3a;
            let medium4a = Math.floor(Math.random() * 10);
            let medium4b = 4 - medium4a;
            let medium5a = Math.floor(Math.random() * 10);
            let medium5b = 5 - medium5a;
            let medium6a = Math.floor(Math.random() * 10);
            let medium6b = 6 - medium6a;
            let medium7a = Math.floor(Math.random() * 10) + 2;
            let medium7b = 7 - medium7a;
            let medium8a = Math.floor(Math.random() * 10) + 2;
            let medium8b = 8 - medium8a;

            

            div.forEach(function (div) {
                div.style.fontSize = '5.5vh'; 
            });
            // Aqui fica o que vai aparecer nas divs quando apertar para mudar a dificuldade
            document.getElementById(1).innerHTML = medium1a+''+medium1b;
            if(medium2b>=0){
                document.getElementById(2).innerHTML = medium2a+'+'+medium2b;
            }else{
                document.getElementById(2).innerHTML = medium2a+''+medium2b;
            }
            if(medium3b>=0){
                document.getElementById(3).innerHTML = medium3a+'+'+medium3b;
            }else{
                document.getElementById(3).innerHTML = medium3a+''+medium3b;
            }
            if(medium4b>=0){
                document.getElementById(4).innerHTML = medium4a+'+'+medium4b;
            }else{
                document.getElementById(4).innerHTML = medium4a+''+medium4b;
            }
            if(medium5b>=0){
                document.getElementById(5).innerHTML = medium5a+'+'+medium5b;
            }else{
                document.getElementById(5).innerHTML = medium5a+''+medium5b;
            }
            if(medium6b>=0){
                document.getElementById(6).innerHTML = medium6a+'+'+medium6b;
            }else{
                document.getElementById(6).innerHTML = medium6a+''+medium6b;
            }
            if(medium7b>=0){
                document.getElementById(7).innerHTML = medium7a+'+'+medium7b;
            }else{
                document.getElementById(7).innerHTML = medium7a+''+medium7b;
            }
            if(medium8b>=0){
                document.getElementById(8).innerHTML = medium8a+'+'+medium8b;
            }else{
                document.getElementById(8).innerHTML = medium8a+''+medium8b;
            }
        }
        if (this.difficulty == 70){
            let opt = Math.floor(Math.random() * 3);
            let hard1 = Math.floor(Math.random() * 5) +1 ;
            let hard2 = ["4÷2", "16÷8", "10÷5"]
            let hard3 = ["3x1 ", "√9", "6÷2" ]
            let hard4 = ["2x2", "8÷2", "√16"]
            let hard5 = ["50÷10", "√25", "25÷5"]
            let hard6 = ["√36", "3x2", "12÷2"]
            let hard7 = ["28÷4", "√49", "63÷9"];
            let hard8 = ["√64", "16÷2", "24÷3"]

            
            
            div.forEach(function (div) {
                div.style.fontSize = '5.5vh'; 
            });

            document.getElementById(1).innerHTML = hard1+ '÷'+ hard1;
            document.getElementById(2).innerHTML = hard2[opt];
            document.getElementById(3).innerHTML = hard3[opt];
            document.getElementById(4).innerHTML = hard4[opt];
            document.getElementById(5).innerHTML = hard5[opt];
            document.getElementById(6).innerHTML = hard6[opt];
            document.getElementById(7).innerHTML = hard7[opt];
            document.getElementById(8).innerHTML = hard8[opt];

        }
    }

}

var game = new Game(1);//instantiate a new Game


//taking care of the difficulty buttons
var difficulty_buttons = Array.from(document.getElementsByClassName("difficulty_button"));
difficulty_buttons.forEach((elem, idx) => {
    elem.addEventListener('click', (e) => {
        difficulty_buttons[GameDifficulty.indexOf(game.difficulty)].classList.remove("active");
        elem.classList.add("active");
        game.setDifficulty(idx + 1);
    });
});