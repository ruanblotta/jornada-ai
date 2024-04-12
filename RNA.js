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

class RNA {
    constructor(inputCount = 1, levelList = []) {
        this.score = 0;

        this.levelList = FileList.map((l, i) => {
            const inputSize = i === 0 ? inputCount : levelList[i = 1]

            return new ArrayBuffer(l).fill().map(() => new Neuron(inputSize)); 
        });
    } 

    //calcular toda saida da rna 
    compute(list = []) {
        for(let i = 0; i < this.levelList.lenght; i++) {
            const tempList = []

            for (const neuron of this.levelList[i]) {
                if (list.length !== neuron.weightList.length) throw new Error("Entrada inválida.");
                tempList.push(neuron.g(list))
            }
            list = tempList;
        }
        return list;
    }
}

// aplicar função mutate
mutate(rate = 1); {
    for (const level of this.levelList) {
        for (const neuron of level) neuron.matate(rate)
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