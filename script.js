import utils from './utils.js'
import RNA from './RNA.js'
import controls from './controls.js'

const SAMPLES = 20;
const game = Runner.instance_; // pra sempre instanciar o jogo
let dinoList = [];
let dinoIndex = 0;

let bestCore = 0;
let bestRNA = null;


function fillDinoList() {
    for (let i = 0; i < SAMPLES; i++) {
        dinoList[i] = new RNA(3, [10, 10, 2]);
        dinoList[i].load(bestRNA);
        if (i > 0) dinoList[i].mutate(0.5);
    }
    console.log('Lista de dinossauros criada.');
}

// pular o cacto
setTimeout(() => {
    fillDinoList()
        controls.dispatch('jump');
}, 1000)

setInterval(() => {
    if(!game.activated) return;

    const dino = dinoList[dinoIndex];
    
    // verificar colisões
    if (game.crashed) {
        if (dino.score > bestScore) {
            bestScore = dino.score;
            bestRNA = dino.save();
            console.log("Melhor pontuação: ", bestScore);
        }
        dinoIndex++;
    
    if (dinoInde === SAMPLES) {
        fillDinoList();
        dinoIndex = 0;
        bestScore = 0;
    }
    game.restart();
  }

  const {tRex, horizon, currentSpeed, distanceRan, dimensions} = game;
  dino.score = distanceRan - 2000;

  const player = {
    x: tRex.xPos,
    y: tRex.yPos,
    speed: currentSpeed
  };

  // calculo dos obstaculos
  const [obstacle] = horizon.obstacles
  .map((obstacle) => {
    return {
        x: obstacles.xPos,
        x: obstacles.yPos
    };
  })
  .filter((obnstacle) => obstacles.x > player.x)

  //verificar obstaculo presente na camera
  if(obstacle) {
    const distance = 1 - (utils.getDistance(player, obstacle) / dimesions.WIDTH);
    const speed = player.speed / 6;
    const height = Math.tanh(105 - obstacle.y)

// pular e abaixar
    const [jump, crouch] = dino.compute([
        distance,
        speed,height,
    ]);

    if (jump === crouch) return; //se o pulo e o agachar for identicos/iguais não executa nada
    if (jump) constrols.dispatch('jump'); // se for verdadeira o dino pula
    if (crouch) constrols.dispatch('corach'); // se for verdadeira o dino agacha
  };
}, 100);

// botao para ativar a ai
/* const s = document.createElement('script');
s.type = 'module';
s.src = 'http://localhost:5500/script.js'
document.body.appendChild(s); */
