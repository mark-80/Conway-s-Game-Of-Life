const canvas = document.getElementById("canvas");
const btn = document.getElementById("btn")
const context = canvas.getContext("2d");
const size = 620;
const scale = 4;
const resolution = size / scale;
let cells;



btn.addEventListener('click', () => start()) 

const setup = ()=> {
  canvas.width = size;
  canvas.height = size;
  context.scale(scale, scale);
  context.fillStyle = "black";
  cells = createCells();
}

const createCells = ()=> {
  let eray = new Array(resolution);
  for (let x = 0; x < resolution; x++) {
    let cols = new Array(resolution);
    for (let y = 0; y < resolution; y++) {
      cols[y] = false;
    }
    eray[x] = cols;
  }
  return eray;
}

const randomCells = ()=> {
  for (let y = 0; y < resolution; y++) {
    for (let x = 0; x < resolution; x++) {
      if (Math.random() < 0.5) cells[x][y] = true;
    }
  }
}

const drawCells = ()=> {
  context.fillStyle = "white";
  context.fillRect(0, 0, resolution, resolution);
  context.fillStyle = "black";
  for (let y = 0; y < resolution; y++) {
    for (let x = 0; x < resolution; x++) {
      if (cells[x][y]) context.fillRect(x, y, 1, 1);
    }
  }
}

const step = ()=> {
  let newCells = createCells();
  for (let y = 0; y < resolution; y++) {
    for (let x = 0; x < resolution; x++) {
      const neighbours = getNeighbourCount(x, y);
      if (cells[x][y] && neighbours >= 2 && neighbours <= 3) newCells[x][y] = true;
      else if (!cells[x][y] && neighbours === 3) newCells[x][y] = true;
    }
  }
  cells = newCells;
  drawCells();
}

const getNeighbourCount = (x,y)=>{
  let count = 0;
  for (let yy = -1; yy < 2; yy++) {
    for (let xx = -1; xx < 2; xx++) {
      if (xx === 0 && yy === 0) continue;
      if (x + xx < 0 || x + xx > resolution - 1) continue;
      if (y + yy < 0 || y + yy > resolution - 1) continue;
      if (cells[x + xx][y + yy]) count++;
    }
  }
  return count;
}

const start = () =>{
  setup();
  randomCells();
  drawCells();
  
  setInterval(step, 60);
  
}
start()
