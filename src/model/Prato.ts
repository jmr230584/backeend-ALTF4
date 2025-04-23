import { DatabaseModel } from "./DataBaseModel";

// Recupera conexão com o banco de dados
const database = new DatabaseModel().pool;

/**
 * Classe que representa um prato no sistema
 */
export class Prato {
    private idPrato: number = 0;
    private nome: string;
    private descricao: string;
    private preco: number;
    private idGerente: number;

    constructor(_nome: string, _descricao: string, _preco: number, _idGerente: number) {
        this.nome = _nome;
        this.descricao = _descricao;
        this.preco = _preco;
        this.idGerente = _idGerente;
    }

    // Getters e Setters
    public getIdPrato(): number {
        return this.idPrato;
    }

    public setIdPrato(id: number): void {
        this.idPrato = id;
    }

    public getNome(): string {
        return this.nome;
    }

    public setNome(nome: string): void {
        this.nome = nome;
    }

    public getDescricao(): string {
        return this.descricao;
    }

    public setDescricao(descricao: string): void {
        this.descricao = descricao;
    }

    public getPreco(): number {
        return this.preco;
    }

    public setPreco(preco: number): void {
        this.preco = preco;
    }

    public getIdGerente(): number {
        return this.idGerente;
    }

    public setIdGerente(id: number): void {
        this.idGerente = id;
    }

    // Métodos CRUD

    static async listarPratos(): Promise<Array<Prato> | null> {
        let listaPratos: Array<Prato> = [];

        try {
            const query = `SELECT * FROM prato WHERE status_prato = true;;`;
            const resposta = await database.query(query);

            resposta.rows.forEach((prato) => {
                let novoPrato = new Prato(
                    prato.nome,
                    prato.descricao,
                    parseFloat(prato.preco),
                    prato.id_gerente
                );
                novoPrato.setIdPrato(prato.id_prato);
                listaPratos.push(novoPrato);
            });

            return listaPratos;
        } catch (error) {
            console.error(`Erro ao listar pratos: ${error}`);
            return null;
        }
    }

    static async cadastrarPrato(prato: Prato): Promise<boolean> {
        let insertResult = false;

        try {
            const query = `
                INSERT INTO prato (nome, descricao, preco, id_gerente)
                VALUES (
                    '${prato.getNome().toUpperCase()}',
                    '${prato.getDescricao()}',
                    ${prato.getPreco()},
                    ${prato.getIdGerente()}
                )
                RETURNING id_prato;
            `;
            const result = await database.query(query);

            if (result.rows.length > 0) {
                console.log(`Prato cadastrado com sucesso. ID: ${result.rows[0].id_prato}`);
                insertResult = true;
            }

            return insertResult;
        } catch (error) {
            console.error(`Erro ao cadastrar prato: ${error}`);
            return insertResult;
        }
    }

    static async atualizarPrato(prato: Prato): Promise<boolean> {
        let updateResult = false;

        try {
            const query = `
                UPDATE prato SET
                    nome = '${prato.getNome().toUpperCase()}',
                    descricao = '${prato.getDescricao()}',
                    preco = ${prato.getPreco()},
                    id_gerente = ${prato.getIdGerente()}
                WHERE id_prato = ${prato.getIdPrato()};
            `;
            const result = await database.query(query);

            if (result.rowCount !== 0) {
                updateResult = true;
            }

            return updateResult;
        } catch (error) {
            console.error(`Erro ao atualizar prato: ${error}`);
            return updateResult;
        }
    }

    static async removerPrato(idPrato: number): Promise<boolean> {
        let deleteResult = false;

        try {
            const query = `UPDATE prato SET status_prato = false WHERE id_prato = ${idPrato};`;
            const result = await database.query(query);

            if (result.rowCount !== 0) {
                deleteResult = true;
            }

            return deleteResult;
        } catch (error) {
            console.error(`Erro ao remover prato: ${error}`);
            return deleteResult;
        }
    }
}
