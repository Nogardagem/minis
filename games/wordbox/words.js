


window.onload = (e) => {
    getWords();
    setup();
};


const width = 4;
const height = 4;

let words;


let selected = [];
let played = [];

let mouseDown = false;


const freqs = {
    e: 110,
    s: 87,
    i: 86,
    a: 78,
    r: 73,
    n: 72,
    t: 67,
    o: 61,
    l: 53,
    c: 40,
    d: 38,
    u: 33,
    g: 30,
    p: 28,
    m: 27,
    h: 23,
    b: 20,
    y: 16,
    f: 14,
    v: 10,
    k: 10,
    w: 9,
    z: 4,
    x: 3,
    j: 3,
    q: 2
};

let letters = [];


async function getWords() {
    let response = await fetch('../../dictionary.txt');
    let text = await response.text();

    
    words = text.split('\n');
    // console.log(words);
}

function setup() {
    for (let letter in freqs) {
        for (let i = 0; i < freqs[letter]; i++) {
            letters.push(letter);
        }
    }
    //console.log(letters);



    const board = document.querySelector('#board');
    
    board.style.gridTemplateRows = `repeat(${width}, 1fr)`;
    board.style.gridTemplateColumns = `repeat(${height}, 1fr)`;

    for (let i = 0; i < width*height; i++) {
        let tile = document.createElement('div');
        tile.innerHTML = `<p>${letters[Math.floor(Math.random() * letters.length)].toUpperCase()}</p>`;
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

        btn.addEventListener('pointerenter', (e) => {
            if (mouseDown) press(btn);
        });
    });

    document.addEventListener('pointerup', (e) => {
        mouseDown = false;
        submitWord();
    });
}

function press(btn) {
    if (selected.at(-2) === btn) {
        let removed = selected.pop();
        removed.classList.remove('active');
        return;
    }
    if (selected.includes(btn)) return;
    if (selected.length > 0 && !(btn.classList.contains(`near${selected.at(-1).id}`))) return;

    selected.push(btn);
    btn.classList.add('active');
}

function submitWord() {
    document.querySelectorAll('.tile').forEach((btn) => {
        btn.classList.remove('active');
    });

    let word = selected.map(v => v.querySelector('p').innerText).join('');
    if (words.includes(word)) {
        if (!(played.includes(word)))  {
            played.push(word);
        }
    }

    played.sort();
    document.querySelector('#played').innerText = played.join('\n');

    selected = [];
}