import { Cliente } from "../model/Cliente";
import { Request, Response } from "express";

/**
 * Interface ClienteDTO
 * Define os atributos que devem ser recebidos do cliente nas requisições
 */
interface ClienteDTO {
    nome: string;
    telefone: string;
    email: string;
    senha: string;
    endereco: string;
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
            res.status(400).json("Erro ao recuperar as informações dos clientes");
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

            // Verifica se todos os campos obrigatórios foram enviados
            if (!dadosRecebidos.nome || !dadosRecebidos.email || !dadosRecebidos.telefone || !dadosRecebidos.senha || !dadosRecebidos.endereco) {
                return res.status(400).json("Campos obrigatórios não preenchidos");
            }

            const novoCliente = new Cliente(
                dadosRecebidos.nome,
                dadosRecebidos.telefone,
                dadosRecebidos.email,
                dadosRecebidos.senha,
                dadosRecebidos.endereco
            );

            const result = await Cliente.cadastrarCliente(novoCliente);

            if (result) {
                return res.status(200).json("Cliente cadastrado com sucesso");
            } else {
                return res.status(400).json("Não foi possível cadastrar o cliente no banco de dados");
            }
        } catch (error) {
            console.error(`Erro ao cadastrar o cliente: ${error}`);
            return res.status(500).json("Erro interno ao cadastrar o cliente");
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

            if (isNaN(idCliente)) {
                return res.status(400).json("ID do cliente inválido");
            }

            const result = await Cliente.removerCliente(idCliente);

            if (result) {
                return res.status(200).json("Cliente removido com sucesso");
            } else {
                return res.status(400).json("Erro ao deletar cliente");
            }
        } catch (error) {
            console.error("Erro ao remover o cliente:", error);
            return res.status(500).json("Erro interno ao remover o cliente");
        }
    }

    /**
     * Atualiza o cadastro de um cliente.
     * @param req Objeto de requisição do Express.
     * @param res Objeto de resposta do Express.
     * @returns Resposta HTTP indicando sucesso ou falha.
     */
    static async atualizar(req: Request, res: Response): Promise<any> {
        try {
            const dadosRecebidos: ClienteDTO = req.body;
            const idCliente = parseInt(req.query.idCliente as string);

            if (isNaN(idCliente)) {
                return res.status(400).json("ID do cliente inválido");
            }

            const cliente = new Cliente(
                dadosRecebidos.nome,
                dadosRecebidos.telefone,
                dadosRecebidos.email,
                dadosRecebidos.senha,
                dadosRecebidos.endereco
            );

            cliente.setIdCliente(idCliente);

            if (await Cliente.atualizarCliente(cliente)) {
                return res.status(200).json({ mensagem: "Cadastro atualizado com sucesso!" });
            } else {
                return res.status(400).json("Não foi possível atualizar o cliente no banco de dados");
            }
        } catch (error) {
            console.error(`Erro ao atualizar o cliente: ${error}`);
            return res.status(500).json({ mensagem: "Erro interno ao atualizar o cliente." });
        }
    }
}

export default ClienteController;
