import { Prato } from "../model/Prato";
import { Request, Response } from "express";

/**
 * Interface PratoDTO
 * Define os atributos que devem ser recebidos do cliente nas requisições
 */
interface PratoDTO {
    nome: string;
    descricao: string;
    preco: number;
    idGerente: number;
}

/**
 * Controlador para operações relacionadas aos pratos.
 */
class PratoController extends Prato {

    /**
     * Lista todos os pratos.
     * @param req Objeto de requisição HTTP.
     * @param res Objeto de resposta HTTP.
     * @returns Lista de pratos em formato JSON.
     */
    static async todos(req: Request, res: Response) {
        try {
            const listaDePratos = await Prato.listarPratos();
            res.status(200).json(listaDePratos);
        } catch (error) {
            console.log(`Erro ao acessar método herdado: ${error}`);
            res.status(400).json("Erro ao recuperar as informações do Prato");
        }
    }

    /**
     * Cadastra um novo prato.
     * @param req Objeto de requisição HTTP com os dados do prato.
     * @param res Objeto de resposta HTTP.
     * @returns Mensagem de sucesso ou erro em formato JSON.
     */
    static async cadastrar(req: Request, res: Response): Promise<any> {
        try {
            const dadosRecebidos: PratoDTO = req.body;

            const novoPrato = new Prato(
                dadosRecebidos.nome,
                dadosRecebidos.descricao,
                dadosRecebidos.preco,
                dadosRecebidos.idGerente
            );

            const result = await Prato.cadastrarPrato(novoPrato);

            if (result) {
                return res.status(200).json("Prato cadastrado com sucesso");
            } else {
                return res.status(400).json("Não foi possível cadastrar o prato no banco de dados");
            }
        } catch (error) {
            console.log(`Erro ao cadastrar o prato: ${error}`);
            return res.status(400).json("Erro ao cadastrar o prato");
        }
    }

    /**
     * Remove um prato.
     * @param req Objeto de requisição HTTP com o ID do prato a ser removido.
     * @param res Objeto de resposta HTTP.
     * @returns Mensagem de sucesso ou erro em formato JSON.
     */
    static async remover(req: Request, res: Response): Promise<any> {
        try {
            const idPrato = parseInt(req.query.idPrato as string);
            const result = await Prato.removerPrato(idPrato);

            if (result) {
                return res.status(200).json("Prato removido com sucesso");
            } else {
                return res.status(400).json("Erro ao deletar prato");
            }
        } catch (error) {
            console.log("Erro ao remover o Prato");
            console.log(error);
            return res.status(500).send("error");
        }
    }

    /**
     * Método para atualizar o cadastro de um prato.
     * @param req Objeto de requisição do Express.
     * @param res Objeto de resposta do Express
     * @returns Resposta HTTP indicando sucesso ou falha.
     */
    static async atualizar(req: Request, res: Response): Promise<any> {
        try {
            const dadosRecebidos: PratoDTO = req.body;

            const prato = new Prato(
                dadosRecebidos.nome,
                dadosRecebidos.descricao,
                dadosRecebidos.preco,
                dadosRecebidos.idGerente
            );

            prato.setIdPrato(parseInt(req.query.idPrato as string));

            if (await Prato.atualizarPrato(prato)) {
                return res.status(200).json({ mensagem: "Cadastro atualizado com sucesso!" });
            } else {
                return res.status(400).json("Não foi possível atualizar o prato no banco de dados");
            }
        } catch (error) {
            console.error(`Erro no modelo: ${error}`);
            return res.json({ mensagem: "Erro ao atualizar prato." });
        }
    }
}

export default PratoController;
