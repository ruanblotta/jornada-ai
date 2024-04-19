import utils from './utils';
import RNA from './RNA.js';
import controls from './controls.js';

const SAMPLES = 10; // Número de amostras 
const game = Runner.instance_; // Pra sempre instanciar o jogo
let dinoList = []; // Lista de Dinossauros
let dinoIndex = 0; // Índice do dinossauro atual na lista

let bestScore = 0; // Melhor pontuação encontrada enquanto ocorre o treinamento da IA
let bestRNA = null; // Melhor RNA encontrada enquanto ocorre o treinamento da IA

function fillDinoList() {
    for (let i = 0; i < SAMPLES; i++) {
        dinoList[i] = new RNA(3, [10, 10, 2]); // Cria um novo dinossauro com uma RNA de 3 camadas, podendo modificar
        dinoList[i].load(bestRNA); // Carrega a melhor RNA encontrada 
        if (i > 0) dinoList[i].mutate(0.2); // Mutação na RNA dos dinossauros, exceto o primeiro
    }
    console.log('Dino list was created!');
}

setTimeout(() => {
    fillDinoList();
    constrols.dispatch('jump'); // Faz o dinossauro executar um salto no jogo
}, 1000); // a quantidade de ms

setInterval(() => {
    if (!game.activated) return; // Verifica se o jogo está ativado

    const dino = dinoList[dinoIndex]; // Seleciona o dinossauro atual

    if (game.crashed) { //verifica se o dinossauro colidiou em algo
        if (dino.score > bestScore) {
            bestScore = dino.score;
            bestRNA = dino.save(); // Salva o RNA do dinossauro com a melhor pontuação
            console.log('bestScore:', bestScore);
        }
        dinoIndex++;
        
        if (dinoINdex === SAMPLES) { // Se todos os dinos foram avaliados, preenche a lista novamente
            fillDinoList();
            dinoIndex = 0;
            bestScore = 0;
        }
        game.restart(); // Reinicia o jogo
    }

    const { tRex, horizon, currentSpeed, distanceRan, dimensions } = game;
    dino.score = distanceRan - 2000; // Calcula a pontuação do dinossauro

    const player = {
        x: tRex.xPos,
        y: tRex.yPos,
        speed: currentSpeed,
    };

    const [obstacle] = horizon.obstacles
        .map((obstacles) => {
            return {
                x: obstacle.xPos,
                y: obstacle.yPos,
            }
        })
        .filter((obstacle) => obstacle.x > player.x)

    if (obstacle) { // Verifica se há um obstáculo presente
        const distance = 1 - (utils.getDistance(player, obstacle) / dimensions.WIDTH); // Calcula a distância relativa entre o dino(player) e o obstáculo
        const speed = player.speed / 6; // Calcula a velocidade relativa do jogador
        const height = Math.tanh(105 - obstacle.y); // Calcula a altura relativa do obstáculo

        // Processa as informações no dino atual
        const [jump, crouch] = dino.compute([
            distance,
            speed,
            height,
        ]);

        // Executa as ações com base nas probabilidades calculadas
        if (jump === crouch) return; // Se a probabilidade de salto e agachamento forem iguais, nenhuma ação é tomada
        if (jump) controls.dispatch('jump'); // Se a probabilidade de salto for verdadeira, o dinossauro executa um salto
        if (crouch) controls.dispatch('crouch'); // Se a probabilidade de agachamento for verdadeiro, o dino agacha
    }
}, 1000);

/* const s = document.createElement('script');
s.type = 'module';
s.src = 'http://localhost:5500/script.js';
document.body.appendChild(s); */