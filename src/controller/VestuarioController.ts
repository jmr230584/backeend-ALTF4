// Importa as definições de Request e Response do Express
import { Request, Response } from "express";
// Importa a classe Vestuario do modelo correspondente
import { Vestuario } from "../model/Vestuario";

// Define a interface para representar os dados de um vestuário
interface VestuarioDTO {
    nicho: string;     // Nicho do vestuário
    genero: string;    // Gênero do vestuário (masculino, feminino, etc.)
    marca: string;     // Marca do vestuário
    tamanho: string[];   // Tamanho do vestuário (P, M, G, etc.)
    valor: number;     // Valor do vestuário
    quantidade: number;
    cor: string;
    descricao: string; // Quantidade disponível em estoque
}



/**
 * A classe `VestuarioController` estende a classe `Vestuario` e é responsável por controlar as requisições relacionadas aos Vestuários.
 * 
 * - Esta classe atua como um controlador dentro de uma API REST, gerenciando as operações relacionadas ao recurso "Vestuario".
 * - Herdando da classe `Vestuario`, ela pode acessar métodos e propriedades da classe base, como a listagem de Vestuários.
 */
export class VestuarioController extends Vestuario {

    /**
     * Lista todos os Vestuários.
     * 
     * @param req Objeto de requisição HTTP contendo os dados da requisição.
     * @param res Objeto de resposta HTTP para enviar a resposta ao cliente.
     * @returns Lista de Vestuários em formato JSON com status 200 em caso de sucesso.
     * @throws Retorna um status 400 e uma mensagem de erro caso ocorra uma falha ao acessar a listagem de Vestuários.
     */
    static async todos(req: Request, res: Response): Promise<any> {
        try {
            // Acessa a função de listar os Vestuários e armazena o resultado
            const listaDeVestuarios = await Vestuario.listagemVestuario();

            // Retorna a lista de Vestuários em formato JSON com status 200
            return res.status(200).json(listaDeVestuarios);
        } catch (error) {
            // Registra uma mensagem de erro no console caso haja falha na consulta
            console.log('Erro ao acessar listagem de Vestuários');

            // Retorna um status 400 e uma mensagem de erro ao cliente
            return res.status(400).json({ mensagem: "Não foi possível acessar a listagem de Vestuários" });
        }
    }

    /**
     * Cadastra um novo vestuário no sistema.
     * 
     * @param req Objeto de requisição HTTP contendo os dados do vestuário no corpo da requisição.
     * @param res Objeto de resposta HTTP.
     * @returns Retorna uma mensagem de sucesso com status 200 ou uma mensagem de erro com status 400.
     */
    static async novo(req: Request, res: Response): Promise<any> {
        try {
            // Recupera os dados do vestuário enviados no corpo da requisição
            const vestuarioRecebido: VestuarioDTO = req.body;

            // Cria uma nova instância de Vestuario com os dados fornecidos
            const novoVestuario = new Vestuario(
                vestuarioRecebido.nicho,   // Nicho do Vestuário
                vestuarioRecebido.genero,  // Gênero do Vestuário
                vestuarioRecebido.marca,   // Marca do Vestuário
                vestuarioRecebido.tamanho, // Tamanho do Vestuário
                vestuarioRecebido.valor,   // Valor do Vestuário
                vestuarioRecebido.quantidade, // Quantidade do Vestuário
                vestuarioRecebido.cor, //cor do vestuario
                vestuarioRecebido.descricao // descricao do vestuario
            );

            // Chama a função responsável pelo cadastro do Vestuário no banco de dados
            const respostaClasse = await Vestuario.cadastroVestuario(novoVestuario);

            // Verifica se o cadastro foi realizado com sucesso
            if (respostaClasse) {
                // Retorna uma resposta HTTP 200 (OK) com uma mensagem de sucesso
                return res.status(200).json({ mensagem: "Vestuario cadastrado com sucesso!" });
            } else {
                // Retorna uma resposta HTTP 400 (Bad Request) com mensagem de erro
                return res.status(400).json({ mensagem: "Erro ao cadastrar o Vestuario. Entre em contato com o administrador do sistema." });
            }
        } catch (error) {
            // Lança uma mensagem de erro no console
            console.log('Erro ao cadastrar Vestuario:', error);

            // Retorna uma resposta HTTP 400 (Bad Request) com mensagem de erro genérica
            return res.status(400).json({ mensagem: "Não foi possível cadastrar o Vestuario. Entre em contato com o administrador do sistema." });
        }
    }
    /**
     * Método responsável por remover um vestuário do sistema.
     * @param req - Objeto da requisição contendo o ID do vestuário a ser removido.
     * @param res - Objeto da resposta HTTP que retorna o status da remoção.
     * @returns Retorna uma resposta JSON indicando sucesso ou falha na operação.
     * @throws Retorna um erro 400 caso ocorra falha na remoção do vestuário.
     */
    
    static async remover(req: Request, res: Response): Promise<any> {
        try {
            // Recupera o ID do vestuário a ser removido a partir dos parâmetros da requisição
            const idVestuario = parseInt(req.params.idVestuario);
    
            // Chama o método para remover o vestuário do banco de dados
            const respostaModelo = await Vestuario.removerVestuario(idVestuario);
    
            // Verifica se a remoção foi bem-sucedida e retorna a resposta apropriada
            if (respostaModelo) {
                return res.status(200).json({ mensagem: "Vestuario removido com sucesso!" });
            } else {
                return res.status(400).json({ mensagem: "Erro ao remover o vestuario. Entre em contato com o administrador do sistema." });
            }
        } catch {
            // Registra o erro no console para fins de depuração
            // Registra o erro no console (erro na variável Error está incorreto, deveria ser capturado no catch)
            console.log(`Erro ao remover um vestuário. ${Error}`);

            // Retorna uma resposta HTTP indicando falha na operação
    
            // Retorna uma resposta de erro ao cliente
            return res.status(400).json({ mensagem: "Erro ao remover o Vetuario. Entre em contato com o administrador do sistema." });
        }
    }

    /**
     * Método responsável por atualizar um vestuário no sistema.
     * @param req - Objeto da requisição contendo as informações do vestuário a ser atualizado.
     * @param res - Objeto da resposta HTTP que retorna o status da atualização.
     * @returns Retorna uma resposta JSON indicando sucesso ou falha na operação.
     * @throws Retorna um erro 400 caso ocorra falha na atualização do vestuário.
     */
    
    static async atualizar(req: Request, res: Response): Promise<any> {
        try {
            // Recupera o ID do vestuário que será atualizado a partir dos parâmetros da requisição
            const idVestuario = parseInt(req.params.idVestuario);

            // Recupera as informações do vestuário que serão atualizadas a partir do corpo da requisição
            const vestuarioRecebido: VestuarioDTO = req.body;

            // Cria um novo objeto do tipo Vestuario com as informações recebidas na requisição
            const vestuarioAtualizado = new Vestuario(vestuarioRecebido.nicho,
                vestuarioRecebido.genero,
                vestuarioRecebido.marca,
                vestuarioRecebido.tamanho,
                vestuarioRecebido.valor,
                vestuarioRecebido.quantidade,
                vestuarioRecebido.cor,
                vestuarioRecebido.descricao);

            // Define o ID do vestuário que será atualizado
            vestuarioAtualizado.setIdVestuario(idVestuario);

            // Chama a função de atualização no modelo, passando o vestuário com os novos dados
            const resposta = await Vestuario.atualizarVestuario(vestuarioAtualizado);

            // Verifica se a resposta da função de atualização foi bem-sucedida
            if (resposta) {
                // Se a atualização for bem-sucedida, retorna uma mensagem de sucesso
                return res.status(200).json({ mensagem: "Vestuario atualizado com sucesso!" });
            } else {
                // Caso ocorra algum erro na atualização, retorna uma mensagem de erro
                return res.status(400).json({ mensagem: "Erro ao atualizar o Vestuario. Entre em contato com o administrador do sistema." });
            }
        } catch (error) {
            // Caso ocorra um erro inesperado, registra o erro no console para depuração
            console.log(`Erro ao atualizar um Vestuario. ${error}`);

            // Retorna uma resposta com erro 400 e uma mensagem genérica de falha na atualização
            return res.status(400).json({ mensagem: "Não foi possível atualizar o Livro. Entre em contato com o administrador do sistema." });
        }
    }
}
