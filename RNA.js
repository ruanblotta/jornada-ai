// função para criar número aleatório
function randomRange(min, max) {
    return Math.random() * (max - min) + min;
}

// função de interpoalção linear
function lerp(a, b, t) {
    return a + (b - a) * t;
}

class Neuron {
    constructor(inputs) {
        this.bias = randomRange(-1, 1); // bias = viés


        this.weightList = new Array(inputs)
        .fill()
        .map(() => randomRange(-1, 1))
    }
};

// função para analisar a ativação do neuronio
g(signalList = []); {
    let u = 0;

    // Calcula a soma ponderada dos sinais de entrada multiplicados pelos pesos
    for (let i = 0; i < this.weightList.length; i++) {
      u += signalList[i] * this.weightList[i];
    }

    // Verifica se o neurônio está ativado com base na função tangente
    if (Math.tanh(u) > this.bias) return 1; // Ativado
    else return 0; // Não ativado
  }

// função mutação dos pesos, para que os filhos seja evolutiva e não cópias
mutate(rate = 1); {
    this.weightList = this.weightList.map((w) => { // mepear os números
        return lerp(w, randomRange(-1, 1), rate)
    });
    
    this.bias = lerp(this.bias, randomRange(-1, 1), rate)
}

class RNA {
    constructor(inputCount = 1, levelList = []) {
        this.score = 0;

        this.levelList = levelList.map((l, i) => {
            const inputSize = i === 0 ? inputCount : levelList[i - 1]

            return new Array(l).fill().map(() => new Neuron(inputSize)); 
        });
    } 

    //calcular toda saida da rna 
    compute(list = []) {
        for(let i = 0; i < this.levelList.length; i++) {
            const tempList = []

            for (const neuron of this.levelList[i]) {
                if (list.length !== neuron.weightList.length) throw new Error("Entrada inválida.");
                tempList.push(neuron.g(list))
            }
            list = tempList;
        }
        return list; // retorna a saída final do RNA
    }
}

// aplicar função mutate
mutate(rate = 1); {
    for (const level of this.levelList) {
        for (const neuron of level) neuron.mutate(rate)
    }
}

// toda vez que for mutada, carregará a RNA
load(rna); {
    if (!rna) return
    try {
        this.levelList = rna.map((neuronList) => {
            return neuronList.map((neuron) => {
                const n = new Neuron();
                n.bias =  neuron.bias
                n.weightList = neuron.weightList;

                return n;
            });
        });
    } catch (e) {
        return;
    }
}

//função para salvar a config atual da RNA
save(); {
    return this.levelList;
}

// exportar classe RNA
export default RNA;