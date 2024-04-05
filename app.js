const express = require('express');
const bodyParser = require('body-parser');

// Classe Fila
class Fila {
    constructor() {
      this.items = [];
    }
    
    // Método para adicionar um elemento
    enfileirar(elemento) {
      this.items.push(elemento);
    }
  
    // Método para remover um elemento
    desenfileirar() {
      if (this.vazia()) return "Underflow";
      return this.items.shift();
    }
  
    // Método para verificar se a fila está vazia
    vazia() {
      return this.items.length === 0;
    }

}

class RoboDeLimpeza {
    constructor() {
        this.tarefas = new Fila();
        this.tarefasExecutadas = [];

        // Adiciona o express à propriedade app para ser usado no teste
        this.app
        this.adicionarEndpoint();
    }

    // Insere algumas tarefas padrões quando o robõ for ligado
    ligar() {
        this.tarefas.enfileirar("Limpar o chão");
        this.tarefas.enfileirar("Lavar o banheiro");
        this.tarefas.enfileirar("Limpar a cozinha");
        this.tarefas.enfileirar("Limpar a sala");
    }

    adicionarTarefa(tarefa) {
        this.tarefas.enfileirar(tarefa);
        return this.tarefas;
    }

    // Método para executar a próxima tarefa com proteção contra underflow (não ter tarefas)
    executarProximaTarefa() {
        if (this.tarefas.vazia()) {
            return "Underflow";
        }
        return this.tarefas.desenfileirar();
    }

    // Método para executar todas as tarefas
    executarTodasTarefas() {
        let tarefasExecutadas = [];
        while (!this.tarefas.vazia()) {
            tarefasExecutadas.push(this.executarProximaTarefa());
        }

        this.tarefasExecutadas = tarefasExecutadas;
        return tarefasExecutadas;
    }

    // Define os endpoints da API para executar todas as tarefas e avisar quando não tiver nada na lista
    adicionarEndpoint() {
        this.app = express();
        this.app.use(bodyParser.json());

        this.app.get('/executarTodasTarefas', (req, res) => {
            if (this.tarefas.vazia()) {
                res.status(204).json({ message: 'Não há tarefas para executar' });
            }

            else{
                const tarefasExecutadas = this.executarTodasTarefas();
                res.json({ message: 'Todas as tarefas foram executadas com sucesso', tarefasExecutadas: tarefasExecutadas });
            }
        });

        this.app.listen(3000, () => {
            console.log('Robô de limpeza rodando na porta 3000');
        });
    }
}

module.exports = { RoboDeLimpeza, Fila };


// Foi sofrido debuggar isso aqui :(
// mas o robozinho tá torando 🤖