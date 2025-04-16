import { Cliente } from "../model/Cliente";
import { Request, Response } from "express";

/**
 * Interface ClienteDTO
 * Define os atributos que devem ser recebidos do cliente nas requisições
 */
interface ClienteDTO {
    nome: string;
    email: string;
    endereco: string;
    telefone: string;
}

/**
 * Controlador para operações relacionadas aos clientes.
 */
class ClienteController extends Cliente {

    /**
     * Lista todos os clientes.
     * @param req Objeto de requisição HTTP.
     * @param res Objeto de resposta HTTP.
     * @returns Lista de clientes em formato JSON.
     */
    static async todos(req: Request, res: Response) {
        try {
            const listaDeClientes = await Cliente.listarClientes();
            res.status(200).json(listaDeClientes);
        } catch (error) {
            console.log(`Erro ao acessar método herdado: ${error}`);
            res.status(400).json("Erro ao recuperar as informações do Cliente");
        }
    }

    /**
     * Cadastra um novo cliente.
     * @param req Objeto de requisição HTTP com os dados do cliente.
     * @param res Objeto de resposta HTTP.
     * @returns Mensagem de sucesso ou erro em formato JSON.
     */
    static async cadastrar(req: Request, res: Response): Promise<any> {
        try {
            const dadosRecebidos: ClienteDTO = req.body;

            const novoCliente = new Cliente(
                dadosRecebidos.nome,
                dadosRecebidos.email,
                dadosRecebidos.endereco,
                dadosRecebidos.telefone
            );

            const result = await Cliente.cadastrarCliente(novoCliente);

            if (result) {
                return res.status(200).json("Cliente cadastrado com sucesso");
            } else {
                return res.status(400).json("Não foi possível cadastrar o cliente no banco de dados");
            }
        } catch (error) {
            console.log(`Erro ao cadastrar o cliente: ${error}`);
            return res.status(400).json("Erro ao cadastrar o cliente");
        }
    }

    /**
     * Remove um cliente.
     * @param req Objeto de requisição HTTP com o ID do cliente a ser removido.
     * @param res Objeto de resposta HTTP.
     * @returns Mensagem de sucesso ou erro em formato JSON.
     */
    static async remover(req: Request, res: Response): Promise<any> {
        try {
            const idCliente = parseInt(req.query.idCliente as string);
            const result = await Cliente.removerCliente(idCliente);

            if (result) {
                return res.status(200).json("Cliente removido com sucesso");
            } else {
                return res.status(400).json("Erro ao deletar cliente");
            }
        } catch (error) {
            console.log("Erro ao remover o Cliente");
            console.log(error);
            return res.status(500).send("error");
        }
    }

    /**
     * Método para atualizar o cadastro de um cliente.
     * @param req Objeto de requisição do Express.
     * @param res Objeto de resposta do Express.
     * @returns Resposta HTTP indicando sucesso ou falha.
     */
    static async atualizar(req: Request, res: Response): Promise<any> {
        try {
            const dadosRecebidos: ClienteDTO = req.body;

            const cliente = new Cliente(
                dadosRecebidos.nome,
                dadosRecebidos.email,
                dadosRecebidos.endereco,
                dadosRecebidos.telefone
            );

            cliente.setIdCliente(parseInt(req.query.idCliente as string));

            if (await Cliente.atualizarCliente(cliente)) {
                return res.status(200).json({ mensagem: "Cadastro atualizado com sucesso!" });
            } else {
                return res.status(400).json("Não foi possível atualizar o cliente no banco de dados");
            }
        } catch (error) {
            console.error(`Erro no modelo: ${error}`);
            return res.json({ mensagem: "Erro ao atualizar cliente." });
        }
    }
}

export default ClienteController;
