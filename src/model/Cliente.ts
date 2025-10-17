import { DatabaseModel } from "./DataBaseModel";

// Recupera conexão com o banco de dados
const database = new DatabaseModel().pool;

/**
 * Classe que representa um cliente no sistema
 */
export class Cliente {
    private idCliente: number = 0;
    private nome: string;
    private telefone: string;
    private email: string;
    private senha: string;
    private endereco: string;
    private statusCliente: boolean = true;

    constructor(_nome: string, _telefone: string, _email: string, _senha: string, _endereco: string) {
        this.nome = _nome;
        this.telefone = _telefone;
        this.email = _email;
        this.senha = _senha;
        this.endereco = _endereco;
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

    public setNome(nome: string): void {
        this.nome = nome;
    }

    public getTelefone(): string {
        return this.telefone;
    }

    public setTelefone(telefone: string): void {
        this.telefone = telefone;
    }

    public getEmail(): string {
        return this.email;
    }

    public setEmail(email: string): void {
        this.email = email;
    }

    public getSenha(): string {
        return this.senha;
    }

    public setSenha(senha: string): void {
        this.senha = senha;
    }

    public getEndereco(): string {
        return this.endereco;
    }

    public setEndereco(endereco: string): void {
        this.endereco = endereco;
    }

    public getStatusCliente(): boolean {
        return this.statusCliente;
    }

    public setStatusCliente(status: boolean): void {
        this.statusCliente = status;
    }

    // CRUD

    static async listarClientes(): Promise<Array<Cliente> | null> {
        const listaClientes: Array<Cliente> = [];

        try {
            const query = `SELECT * FROM cliente WHERE status_cliente = true;`;
            const resposta = await database.query(query);

            resposta.rows.forEach((cliente) => {
                const novoCliente = new Cliente(
                    cliente.nome,
                    cliente.telefone,
                    cliente.email,
                    cliente.senha,
                    cliente.endereco
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
<<<<<<< HEAD
                INSERT INTO cliente (nome, telefone, email, senha, endereco)
=======
                INSERT INTO cliente (nome, email, senha, endereco, telefone)
>>>>>>> 59addb49a0fe641e8efecddf57ed051ec098fd30
                VALUES (
                    '${cliente.getNome().toUpperCase()}',
                    '${cliente.getTelefone()}',
                    '${cliente.getEmail().toLowerCase()}',
                    '${cliente.getSenha()}',
                    '${cliente.getEndereco()}'
                )
                RETURNING id_cliente;
            `;

            const result = await database.query(query);

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
                    telefone = '${cliente.getTelefone()}',
                    email = '${cliente.getEmail().toLowerCase()}',
                    senha = '${cliente.getSenha()}',
                    endereco = '${cliente.getEndereco()}'
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
