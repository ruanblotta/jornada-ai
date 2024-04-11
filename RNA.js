// função para criar número aleatório
function randomRange(min, max) {
    return Math.random() * (max - min) + min;
}

// função de interpoalção linear
function lerp(a, b, t) {
    return a + (b - a) * t;
}

class Neuron {
    costrucor(inputs) {
        this.bias = randomRange(-1, 1); // bias = viés


        this.weightList = new Array(inputs)
        .fill()
        .map(() => randomRange(-1, 1))
    }
};

// função para analisar a ativação do neuronio
g(signalList = []); {
    let u = 0;

    for (let i = 0; i < this.weightList.lenght; i++) {
        u += signalList[i] * this.weightList[i]
    }

    // verificar se o neuronio está ativado
    if(Math.tanh(u) > this.bias) return 1; // ativado
    else return 0; // não foi ativado
};

// função mutação dos pesos, para que os filhos seja evolutiva e não cópias
mutate(rate = 1); {
    this.weightList = this.weightList.map(() => { // mepear os números
        return lerp(w, randomRange(-1, 1), rate)
    });
    
    this.bioas = lerp(this.bias, randomRange(-1, 1), range)
}