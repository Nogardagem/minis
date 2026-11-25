


window.onload = (e) => {
    setup();
};


const width = 15;
const height = 15;

let mouseDown = false;

let pressed = null;


let grid = [];


function setup() {

    const board = document.querySelector('#board');
    
    board.style.gridTemplateRows = `repeat(${width}, 1fr)`;
    board.style.gridTemplateColumns = `repeat(${height}, 1fr)`;

    for (let i = 0; i < width*height; i++) {
        let tile = document.createElement('div');
        tile.innerHTML = '<p>M</p>';
        tile.className = 'tile';
        

        let x = i % width;
        let y = (i-x) / width;
        tile.id = `x${x}y${y}`;

        tile.classList.add(`x${x}y${y}`);

        for (let x2=x-1; x2<=x+1; x2++) {
            for (let y2=y-1; y2<=y+1; y2++) {
                if (!(x2 === x && y2 === y)) {
                    tile.classList.add(`nearx${x2}y${y2}`);
                }
            }
        }

        board.appendChild(tile);
    }


    document.addEventListener('pointerdown', (e) => {
        mouseDown = true;
    });

    document.querySelectorAll('.tile').forEach((btn) => {
        btn.addEventListener('pointerdown', (e) => {
            press(btn);
        });

        // btn.addEventListener('pointerenter', (e) => {
        //     if (mouseDown) press(btn);
        // });
    });

    document.addEventListener('pointerup', (e) => {
        mouseDown = false;
        release();
    });


    grid = [];
    for (let x=0; x<width; x++) {
        grid.push([]);
        for (let y=0; y<height; y++) {
            grid[x].push(new MineTile(document.querySelector(`x${x}y${y}`)));
        }
    }

}

function press(btn) {
    pressed = btn;
    btn.classList.add('active');
}

function release() {
    if (pressed) pressed.classList.remove('active');
    pressed = null;
}

class MineTile {
    constructor(elem) {
        this.mine = false;
        this.clear = false;
        this.num = 0;
        this.elem = elem;
    }
}