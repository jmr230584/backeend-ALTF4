import { Pedido } from "../model/Pedido";
import { Request, Response } from "express";

/**
 * Interface PedidoDTO
 * Define os atributos que devem ser recebidos do cliente nas requisições
 */
interface PedidoDTO {
    idCliente: number;
    idPrato: number;
    dataPedido: Date;
    quantidade: number;
}

/**
 * Controlador para operações relacionadas aos pedidos.
 */
class PedidoController extends Pedido {

    /**
     * Lista todos os pedidos.
     * @param req Objeto de requisição HTTP.
     * @param res Objeto de resposta HTTP.
     * @returns Lista de pedidos em formato JSON.
     */
    static async todos(req: Request, res: Response) {
        try {
            const listaDePedidos = await Pedido.listarPedidos();
            res.status(200).json(listaDePedidos);
        } catch (error) {
            console.log(`Erro ao acessar método herdado: ${error}`);
            res.status(400).json("Erro ao recuperar as informações do Pedido");
        }
    }

    /**
     * Cadastra um novo pedido.
     * @param req Objeto de requisição HTTP com os dados do pedido.
     * @param res Objeto de resposta HTTP.
     * @returns Mensagem de sucesso ou erro em formato JSON.
     */
    static async cadastrar(req: Request, res: Response): Promise<any> {
        try {
            const dadosRecebidos: PedidoDTO = req.body;

            const novoPedido = new Pedido(
                dadosRecebidos.idCliente,
                dadosRecebidos.idPrato,
                dadosRecebidos.dataPedido,
                dadosRecebidos.quantidade
            );

            const result = await Pedido.cadastrarPedido(novoPedido);

            if (result) {
                return res.status(200).json("Pedido cadastrado com sucesso");
            } else {
                return res.status(400).json("Não foi possível cadastrar o pedido no banco de dados");
            }
        } catch (error) {
            console.log(`Erro ao cadastrar o pedido: ${error}`);
            return res.status(400).json("Erro ao cadastrar o pedido");
        }
    }

    /**
     * Remove um pedido.
     * @param req Objeto de requisição HTTP com o ID do pedido a ser removido.
     * @param res Objeto de resposta HTTP.
     * @returns Mensagem de sucesso ou erro em formato JSON.
     */
    static async remover(req: Request, res: Response): Promise<any> {
        try {
            const idPedido = parseInt(req.query.idPedido as string);
            const result = await Pedido.removerPedido(idPedido);

            if (result) {
                return res.status(200).json("Pedido removido com sucesso");
            } else {
                return res.status(400).json("Erro ao deletar pedido");
            }
        } catch (error) {
            console.log("Erro ao remover o Pedido");
            console.log(error);
            return res.status(500).send("error");
        }
    }

    /**
     * Método para atualizar o cadastro de um pedido.
     * @param req Objeto de requisição do Express.
     * @param res Objeto de resposta do Express
     * @returns Resposta HTTP indicando sucesso ou falha.
     */
    static async atualizar(req: Request, res: Response): Promise<any> {
        try {
            const dadosRecebidos: PedidoDTO = req.body;

            const pedido = new Pedido(
                dadosRecebidos.idCliente,
                dadosRecebidos.idPrato,
                dadosRecebidos.dataPedido,
                dadosRecebidos.quantidade
            );

            pedido.setIdPedido(parseInt(req.query.idPedido as string));

            if (await Pedido.atualizarPedido(pedido)) {
                return res.status(200).json({ mensagem: "Cadastro atualizado com sucesso!" });
            } else {
                return res.status(400).json("Não foi possível atualizar o pedido no banco de dados");
            }
        } catch (error) {
            console.error(`Erro no modelo: ${error}`);
            return res.json({ mensagem: "Erro ao atualizar pedido." });
        }
    }
}

export default PedidoController;
