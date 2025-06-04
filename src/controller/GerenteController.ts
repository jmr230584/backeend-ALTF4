import { Gerente } from "../model/Gerente";
import { Request, Response } from "express";

/**
 * Interface GerenteDTO
 * Define os atributos que devem ser recebidos do cliente nas requisições
 */
interface GerenteDTO {
    nome: string;
    telefone: string;
    email: string;
    senha: string;
}

/**
 * Controlador para operações relacionadas aos gerentes.
 */
class GerenteController extends Gerente {

    /**
     * Lista todos os gerentes.
     * @param req Objeto de requisição HTTP.
     * @param res Objeto de resposta HTTP.
     * @returns Lista de gerentes em formato JSON.
     */
    static async todos(req: Request, res: Response) {
        try {
            const listaDeGerentes = await Gerente.listarGerentes();
            res.status(200).json(listaDeGerentes);
        } catch (error) {
            console.log(`Erro ao acessar método herdado: ${error}`);
            res.status(400).json("Erro ao recuperar as informações do Gerente");
        }
    }

    /**
     * Cadastra um novo gerente.
     * @param req Objeto de requisição HTTP com os dados do gerente.
     * @param res Objeto de resposta HTTP.
     * @returns Mensagem de sucesso ou erro em formato JSON.
     */
    static async cadastrar(req: Request, res: Response): Promise<any> {
        try {
            const dadosRecebidos: GerenteDTO = req.body;

            const novoGerente = new Gerente(
                dadosRecebidos.nome,
                dadosRecebidos.telefone,
                dadosRecebidos.email,
                dadosRecebidos.senha
            );

            const result = await Gerente.cadastrarGerente(novoGerente);

            if (result) {
                return res.status(200).json("Gerente cadastrado com sucesso");
            } else {
                return res.status(400).json("Não foi possível cadastrar o gerente no banco de dados");
            }
        } catch (error) {
            console.log(`Erro ao cadastrar o gerente: ${error}`);
            return res.status(400).json("Erro ao cadastrar o gerente");
        }
    }

    /**
     * Remove um gerente.
     * @param req Objeto de requisição HTTP com o ID do gerente a ser removido.
     * @param res Objeto de resposta HTTP.
     * @returns Mensagem de sucesso ou erro em formato JSON.
     */
    static async remover(req: Request, res: Response): Promise<any> {
        try {
            const idGerente = parseInt(req.query.idGerente as string);
            const result = await Gerente.removerGerente(idGerente);

            if (result) {
                return res.status(200).json("Gerente removido com sucesso");
            } else {
                return res.status(400).json("Erro ao deletar gerente");
            }
        } catch (error) {
            console.log("Erro ao remover o Gerente");
            console.log(error);
            return res.status(500).send("error");
        }
    }

    /**
     * Método para atualizar o cadastro de um gerente.
     * @param req Objeto de requisição do Express.
     * @param res Objeto de resposta do Express
     * @returns Resposta HTTP indicando sucesso ou falha.
     */
    static async atualizar(req: Request, res: Response): Promise<any> {
        try {
            const dadosRecebidos: GerenteDTO = req.body;

            const gerente = new Gerente(
                dadosRecebidos.nome,
                dadosRecebidos.telefone,
                dadosRecebidos.email,
                dadosRecebidos.senha
            );

            gerente.setIdGerente(parseInt(req.query.idGerente as string));

            if (await Gerente.atualizarGerente(gerente)) {
                return res.status(200).json({ mensagem: "Cadastro atualizado com sucesso!" });
            } else {
                return res.status(400).json("Não foi possível atualizar o gerente no banco de dados");
            }
        } catch (error) {
            console.error(`Erro no modelo: ${error}`);
            return res.json({ mensagem: "Erro ao atualizar gerente." });
        }
    }
}

export default GerenteController;
