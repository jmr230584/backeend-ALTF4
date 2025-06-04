import { DatabaseModel } from "./DataBaseModel";

// Recupera conexão com o banco de dados
const database = new DatabaseModel().pool;

/**
 * Classe que representa um gerente no sistema
 */
export class Gerente {
    private idGerente: number = 0;
    private nome: string;
    private telefone: string;
    private email: string;
    private senha: string;

    constructor(_nome: string, _telefone: string, _email: string, _senha: string) {
        this.nome = _nome;
        this.telefone = _telefone;
        this.email = _email;
        this.senha = _senha;
    }

    // Getters e Setters
    public getIdGerente(): number {
        return this.idGerente;
    }

    public setIdGerente(id: number): void {
        this.idGerente = id;
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

    // CRUD

    static async listarGerentes(): Promise<Array<Gerente> | null> {
        let listaGerentes: Array<Gerente> = [];

        try {
            const query = `SELECT * FROM gerente WHERE status_gerente = true;`;
            const resposta = await database.query(query);

            resposta.rows.forEach((gerente) => {
                let novoGerente = new Gerente(
                    gerente.nome,
                    gerente.telefone,
                    gerente.email,
                    gerente.senha
                );
                novoGerente.setIdGerente(gerente.id_gerente);
                listaGerentes.push(novoGerente);
            });

            return listaGerentes;
        } catch (error) {
            console.error(`Erro ao listar gerentes: ${error}`);
            return null;
        }
    }

    static async cadastrarGerente(gerente: Gerente): Promise<boolean> {
        let insertResult = false;

        try {
            const query = `
                INSERT INTO gerente (nome, telefone, email, senha)
                VALUES (
                    '${gerente.getNome()}',
                    '${gerente.getTelefone()}',
                    '${gerente.getEmail().toLowerCase()}',
                    '${gerente.getSenha()}'
                )
                RETURNING id_gerente;
            `;
            const result = await database.query(query);

            if (result.rows.length > 0) {
                console.log(`Gerente cadastrado com sucesso. ID: ${result.rows[0].id_gerente}`);
                insertResult = true;
            }

            return insertResult;
        } catch (error) {
            console.error(`Erro ao cadastrar gerente: ${error}`);
            return insertResult;
        }
    }

    static async atualizarGerente(gerente: Gerente): Promise<boolean> {
        let updateResult = false;

        try {
            const query = `
                UPDATE gerente SET
                    nome = '${gerente.getNome()}',
                    telefone = '${gerente.getTelefone()}'
                    email = '${gerente.getEmail().toLowerCase()}',
                    senha = '${gerente.getSenha()}'
                WHERE id_gerente = ${gerente.getIdGerente()};
            `;

            const result = await database.query(query);
            if (result.rowCount !== 0) {
                updateResult = true;
            }

            return updateResult;
        } catch (error) {
            console.error(`Erro ao atualizar gerente: ${error}`);
            return updateResult;
        }
    }

    static async removerGerente(idGerente: number): Promise<boolean> {
        let deleteResult = false;

        try {
            const query = `UPDATE gerente SET status_gerente = false WHERE id_gerente = ${idGerente};`;
            const result = await database.query(query);

            if (result.rowCount !== 0) {
                deleteResult = true;
            }

            return deleteResult;
        } catch (error) {
            console.error(`Erro ao remover gerente: ${error}`);
            return deleteResult;
        }
    }
}
