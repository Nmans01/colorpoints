window.addEventListener('load',init);

const gridX = 6;
const gridY = 6;
const pointFalloffDist=300;
var grid;
var points;

function init () {
    points = [[0,0]];
    createGrid();
    addEventListener('mousemove',update);
    addEventListener('click',(e) => {    
        storePoint(e);
        update(e);    
   });
    addEventListener('keydown',(e) => {    
        update(e);    
        removePoint(e);
   });
}

function createGrid () {
    grid = document.getElementsByClassName('grid')[0];
    for (let i=0; i < gridX * gridY; i++) {
        let cell = document.createElement("div");
        cell.classList.add('cell');
        grid.appendChild(cell);
    }
}

function distanceToPoint (elem,pointX,pointY) {
    let elemRect = elem.getBoundingClientRect();
    let elemX = (elemRect.left+elemRect.right)/2;
    let elemY = (elemRect.top+elemRect.bottom)/2;
    return Math.floor(Math.sqrt(Math.pow(pointX - elemX, 2) + Math.pow(pointY - elemY, 2)));
}
function max (a,b) {
    if (a>b) return a;
    else return b;
}

function storePoint (e) {
    if (points.length < 4)
        points.push([e.clientX,e.clientY]);
}
function removePoint (e) {
    if (e.key == " " && points.length>1) {
        points.pop(0);
    }
}

function update (e) {
    let mouseX = e.clientX;
    let mouseY = e.clientY;

    points[points.length-1] = [mouseX,mouseY]

    for (let i=0;i<grid.children.length;i++) {
        let cell = grid.children[i];
        let rgb = [0,0,0];
        for (let j=0;j<points.length;j++) {
            rgb[j] = max(pointFalloffDist-distanceToPoint(cell,points[j][0],points[j][1]),0)/pointFalloffDist*255;
        }
        cell.style.backgroundColor = "rgb(" + rgb[0] +","+ rgb[2] +","+ rgb[1]+")";
    }
}