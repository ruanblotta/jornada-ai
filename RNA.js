// Função para gerar números aleatórios entre os parâmetros min e max
function randomRange(min, max) {
    return Math.random() * (max - min) + min;
}

// Função de interpolação linear que tem o objetivo de adivinha um valor entre dois números conhecidos
function lerp(a, b, t) {
    // Calcula um valor intermediário entre "a" e "b" com base no fator "t"
    return a + (b - a) * t;
}

// Classe do neurônio
class Neuron {
    constructor(inputs) {
        //Inicializa o viés (bias).
        // O viés (bias) é importante para auxiliar a rede neural aprender padrões através dos dados e tomar decisões melhoers
        this.bias = randomRange(-1, 1);

        // Inicializa uma lista de pesos com valores aleatórios no intervalo de [-1, 1]
        this.weightList = new Array(inputs)
        .fill()
        .map(() => randomRange(-1, 1));
    };

    //Função que calcula a ativação/saída do neuronio
    g(signalList = []) {
        let u = 0;

        //calcula a soma ponderada dos sinais de entrada multiplicados pelos pesos
        for (let i = 0; i < this.weightList.length; i++) {
            u += signalList[i] * this.weightList[i];
        }

        //verifica se o neurônio está ativado com base na função tangente
        if (Math.tanh(u) > this.bias) return 1; // Ativado;
        else return 0; // Não ativado
    }
}

// Função que faz as mutações nos pesos e no viér (bias) do neurônio
mutate(rate = 1); {
    this.weightList = this.weightList.map((w) => {
        //faz uma modificação nos pesos com base na taxa 'rate'
        return lerp(w, randomRange(-1, 1), rate);
    });
    // Faz uma mudança no viés com base na taxa 'rate'
    this.bias = lerp(this.bias, randomRange(-1, 1), rate);
}

// Definição da classe RNA - Rede Neural Artificial
class RNA {
    constructor(inputCount = 1, levelList = []) {
        //inicializa a pontuação da rede neural com zero
        this.score = 0;

        // Cria camadas de neurônios com base nas especificações
        this.levelList = levelList.map((l, i) => {
            //calcular o tamanho da camada atual
            const inputSize = i === 0 ? inputCount : levelList[i - 1];

            // Cria uma camada de neurônio com o tamanho calculado
            return new Array(l).fill().map(() => new Neuron(inputSize));
        });
    }
}

// Função que calcula saíad da RNA com base na entrada
comput(list = []); {
    for (let i = 0; i < this.levelList.length; i++) {
        const tempList = [];
        //calcula a saída de cada neurônio na camada atual
        for (const neuron of this.levelList[i]) {
            if (list.length !== neuron.weightList.length) throw new Error('Entrada inválida');
            tempList.push(neuron.g(list));
        }
        list = tempList; // atualiza os sinais de entrada para a próxima camada
    }
    return list; // Retorna a saída final da RNA
}

// Função que realiza a mutação em todos os neurônios da RNA
mutate(rate = 1); {
    for (const level of this.levelList) {
        for (const neuron of level) neuron.mutate(rate);
    }
}

// Função que carrega a config de uma RNA previamente existente
load(rna); {
    if (!rna) return;
    try {
        this.levelList = rna.map((neuronList) => {
            //O método .map() no JS tem o objetivo de criar uma nova lista usando a info de uma lista original
            return neuronList.map((neuron) => {
                // Cria novos neurônios com base nos dados da RNA carregada
                const n = new Neuron();
                n.bias = neuron.bias;
                n.weightList = neuron.weightList;
                
                // o weightList servirá para atribuir importância a diferentes entradas, possibilidando a RNA aprender a tomar decisões nos dados de entrada
                return n;
            });
        });
    } catch (e) {
        return;
    }
}

// Função para salvar a config atual da Rede Neural
save(); {
    return this.levelList;
}

// Exporta a classe RNA com o valor padrão do módulo
export default RNA;