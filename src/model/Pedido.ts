import { DatabaseModel } from "./DataBaseModel";

// Recupera conexão com o banco de dados
const database = new DatabaseModel().pool;

/**
 * Classe que representa um pedido no sistema
 */
export class Pedido {
    private idPedido: number = 0;
    private idCliente: number;
    private idPrato: number;
    private dataPedido: Date;
    private quantidade: number;

    constructor(_idCliente: number, _idPrato: number, _dataPedido: Date, _quantidade: number) {
        this.idCliente = _idCliente;
        this.idPrato = _idPrato;
        this.dataPedido = _dataPedido;
        this.quantidade = _quantidade;
    }

    // Getters e Setters
    public getIdPedido(): number {
        return this.idPedido;
    }

    public setIdPedido(id: number): void {
        this.idPedido = id;
    }

    public getIdCliente(): number {
        return this.idCliente;
    }

    public setIdCliente(id: number): void {
        this.idCliente = id;
    }

    public getIdPrato(): number {
        return this.idPrato;
    }

    public setIdPrato(id: number): void {
        this.idPrato = id;
    }

    public getDataPedido(): Date {
        return this.dataPedido;
    }

    public setDataPedido(data: Date): void {
        this.dataPedido = data;
    }

    public getQuantidade(): number {
        return this.quantidade;
    }

    public setQuantidade(quantidade: number): void {
        this.quantidade = quantidade;
    }

    // Métodos CRUD

    static async listarPedidos(): Promise<Array<Pedido> | null> {
        let listaPedidos: Array<Pedido> = [];

        try {
            const query = `SELECT * FROM pedido WHERE status_pedido = true;`;
            const resposta = await database.query(query);

            resposta.rows.forEach((pedido) => {
                let novoPedido = new Pedido(
                    pedido.id_cliente,
                    pedido.id_prato,
                    pedido.data_pedido,
                    pedido.quantidade
                );
                novoPedido.setIdPedido(pedido.id_pedido);
                listaPedidos.push(novoPedido);
            });

            return listaPedidos;
        } catch (error) {
            console.error(`Erro ao listar pedidos: ${error}`);
            return null;
        }
    }

    static async cadastrarPedido(pedido: Pedido): Promise<boolean> {
        let insertResult = false;

        try {
            const query = `
                INSERT INTO pedido (id_cliente, id_prato, quantidade)
                VALUES (
                    ${pedido.getIdCliente()},
                    ${pedido.getIdPrato()},
                    ${pedido.getQuantidade()}
                )
                RETURNING id_pedido;
            `;
            const result = await database.query(query);

            if (result.rows.length > 0) {
                console.log(`Pedido cadastrado com sucesso. ID: ${result.rows[0].id_pedido}`);
                insertResult = true;
            }

            return insertResult;
        } catch (error) {
            console.error(`Erro ao cadastrar pedido: ${error}`);
            return insertResult;
        }
    }

    static async atualizarPedido(pedido: Pedido): Promise<boolean> {
        let updateResult = false;

        try {
            const query = `
                UPDATE pedido SET
                    id_cliente = ${pedido.getIdCliente()},
                    id_prato = ${pedido.getIdPrato()},
                    quantidade = ${pedido.getQuantidade()}
                WHERE id_pedido = ${pedido.getIdPedido()};
            `;
            const result = await database.query(query);

            if (result.rowCount !== 0) {
                updateResult = true;
            }

            return updateResult;
        } catch (error) {
            console.error(`Erro ao atualizar pedido: ${error}`);
            return updateResult;
        }
    }

    static async removerPedido(idPedido: number): Promise<boolean> {
        let deleteResult = false;

        try {
            const query = `UPDATE pedido SET status_pedido = false WHERE id_pedido = ${idPedido};`;
            const result = await database.query(query);

            if (result.rowCount !== 0) {
                deleteResult = true;
            }

            return deleteResult;
        } catch (error) {
            console.error(`Erro ao remover pedido: ${error}`);
            return deleteResult;
        }
    }
}
