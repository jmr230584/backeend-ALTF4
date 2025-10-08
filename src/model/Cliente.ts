import { DatabaseModel } from "./DataBaseModel";

// Recupera conexão com o banco de dados
const database = new DatabaseModel().pool;

/**
 * Classe que representa um cliente no sistema
 */
export class Cliente {
    private idCliente: number = 0;
    private nome: string;
    private email: string;
    private senha: string;
    private endereco: string;
    private telefone: string;
    private statusCliente: boolean = true; // Controla o status do aluno no sistema

    constructor(_nome: string, _senha: string, _email: string, _endereco: string, _telefone: string) {
        this.nome = _nome;
        this.email = _email;
        this.senha = _senha;
        this.endereco = _endereco;
        this.telefone = _telefone;
    }

    // Getters e Setters
    public getIdCliente(): number {
        return this.idCliente;
    }

    public setIdCliente(id: number): void {
        this.idCliente = id;
    }

    public getNome(): string {
        return this.nome;
    }

    public setNome(_nome: string): void {
        this.nome = _nome;
    }

    public getEmail(): string {
        return this.email;
    }

    public setEmail(_email: string): void {
        this.email = _email;
    }

    public setSenha(_senha: string): void {
        this.senha = _senha;
    }

    public getSenha(): string {
        return this.senha;
    }

    public getEndereco(): string {
        return this.endereco;
    }

    public setEndereco(_endereco: string): void {
        this.endereco = _endereco;
    }

    public getTelefone(): string {
        return this.telefone;
    }

    public setTelefone(_telefone: string): void {
        this.telefone = _telefone;
    }

    public getStatusAluno(): boolean {
        return this.statusCliente;
    }

    public setStatusAluno(_statusCliente: boolean) {
        this.statusCliente = _statusCliente;
    }

    // CRUD

    static async listarClientes(): Promise<Array<Cliente> | null> {
        let listaClientes: Array<Cliente> = [];

        try {
            const query = `SELECT * FROM cliente WHERE status_cliente = true;`;
            const resposta = await database.query(query);

            resposta.rows.forEach((cliente) => {
                let novoCliente = new Cliente(
                    cliente.nome,
                    cliente.email,
                    cliente.senha,
                    cliente.endereco,
                    cliente.telefone
                );
                novoCliente.setIdCliente(cliente.id_cliente);
                listaClientes.push(novoCliente);
            });

            return listaClientes;
        } catch (error) {
            console.error(`Erro ao listar clientes: ${error}`);
            return null;
        }
    }

    static async cadastrarCliente(cliente: Cliente): Promise<boolean> {
        let insertResult = false;

        try {
            const query = `
                INSERT INTO cliente (nome, email, senha, endereco, telefone)
                VALUES (
                    '${cliente.getNome().toUpperCase()}',
                    '${cliente.getEmail().toLowerCase()}',
                    '${cliente.getSenha()}',
                    '${cliente.getEndereco()}',
                    '${cliente.getTelefone()}'
                )
                RETURNING id_cliente;`;

            console.log('executando a query: ', query)
            const result = await database.query(query);
            console.log('query executada');

            if (result.rows.length > 0) {
                console.log(`Cliente cadastrado com sucesso. ID: ${result.rows[0].id_cliente}`);
                insertResult = true;
            }

            return insertResult;
        } catch (error) {
            console.error(`Erro ao cadastrar cliente: ${error}`);
            return insertResult;
        }
    }

    static async atualizarCliente(cliente: Cliente): Promise<boolean> {
        let updateResult = false;

        try {
            const query = `
                UPDATE cliente SET
                    nome = '${cliente.getNome().toUpperCase()}',
                    email = '${cliente.getEmail().toLowerCase()}',
                    endereco = '${cliente.getEndereco()}',
                    telefone = '${cliente.getTelefone()}'
                WHERE id_cliente = ${cliente.getIdCliente()};
            `;

            const result = await database.query(query);
            if (result.rowCount !== 0) {
                updateResult = true;
            }

            return updateResult;
        } catch (error) {
            console.error(`Erro ao atualizar cliente: ${error}`);
            return updateResult;
        }
    }

    static async removerCliente(idCliente: number): Promise<boolean> {
        let deleteResult = false;

        try {
            const query = `UPDATE cliente SET status_cliente = false WHERE id_cliente = ${idCliente};`;
            const result = await database.query(query);

            if (result.rowCount !== 0) {
                deleteResult = true;
            }

            return deleteResult;
        } catch (error) {
            console.error(`Erro ao remover cliente: ${error}`);
            return deleteResult;
        }
    }
}
