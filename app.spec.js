// Rodar com 'npm test'
const request = require('supertest');
const { RoboDeLimpeza, Fila} = require('./app');

describe('Fila', () => {
    let fila;

    beforeEach(() => {
        fila = new Fila();
    });

    test('Métodos enfileirar e desenfileirar devem funcionar corretamente', () => {
        fila.enfileirar("Teste 1");
        fila.enfileirar("Teste 2");
        expect(fila.desenfileirar()).toBe("Teste 1");
        expect(fila.desenfileirar()).toBe("Teste 2");
    });

    test('Método vazia deve retornar true quando a fila estiver vazia', () => {
        expect(fila.vazia()).toBe(true);
        fila.enfileirar(1);
        expect(fila.vazia()).toBe(false);
    });
});

describe('RoboDeLimpeza', () => {
    let robo;

    beforeAll(() => {
        robo = new RoboDeLimpeza();
    });

    test('Método ligar deve adicionar tarefas padrões na fila', () => {
        robo.ligar();
        expect(robo.tarefas.items).toHaveLength(4);
    });

    it('Endpoint executarTodasTarefas deve retornar mensagem e lista de tarefas com sucess', async () => {
        const response = await request(robo.app).get('/executarTodasTarefas');
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Todas as tarefas foram executadas com sucesso');
    });

    it('Endpoint executarTodasTarefas deve retornar 204 caso esteja com a lista vazia', async () => {
        robo.tarefas.items = [];
        const response = await request(robo.app).get('/executarTodasTarefas');
        expect(response.status).toBe(204);
    });
});
