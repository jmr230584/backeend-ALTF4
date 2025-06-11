// imports
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { DatabaseModel } from '../model/DataBaseModel';

// palavra secreta
const SECRET = 'bananinha';
// pool de conexão ao banco de dados
const database = new DatabaseModel().pool;

/**
 * Interface para representar um Payload do JWT
 * (Não obrigatório, mas recomendado)
 */
interface JwtPayload {
    id: number;
    nome: string;
    email: string;
    nivel_acesso: 'cliente' | 'gerente';
    exp: number;
}

/**
 * Gera e trata um token de autenticação para o sistema
 */
export class Auth {

    /**
     * Valida as credenciais do usuário no banco de dados
     * @param req Requisição com as informações do usuário
     * @param res Resposta enviada a quem requisitou o login
     * @returns Token de autenticação caso o usuário seja válido, mensagem de login não autorizado caso negativo
     */
   static async validacaoUsuario(req: Request, res: Response): Promise<any> {
    const { email, senha } = req.body;

    const queries = [
        {
            sql: `SELECT id_cliente AS id, nome, email FROM cliente WHERE email=$1 AND senha=$2;`,
            nivel_acesso: 'cliente' as const
        },
        {
            sql: `SELECT id_gerente AS id, nome, email FROM gerente WHERE email=$1 AND senha=$2;`,
            nivel_acesso: 'gerente' as const
        }
    ];

    try {
        for (const { sql, nivel_acesso } of queries) {
            const result = await database.query(sql, [email, senha]);

            if (result.rowCount != 0) {
                const user = result.rows[0];
                const token = Auth.generateToken(user.id, user.nome, user.email, nivel_acesso);
                return res.status(200).json({ auth: true, token, usuario: user, nivel_acesso });
            }
        }

        return res.status(401).json({ auth: false, token: null, message: "Email ou senha incorretos" });
    } catch (error) {
        console.log(`Erro na autenticação: ${error}`);
        return res.status(500).json({ message: "Erro interno do servidor" });
    }
}

    /**
     * Gera token de validação do usuário
     * 
     * @param id ID do usuário no banco de dados
     * @param nome Nome do usuário no banco de dados
     * @param email Email do usuário no banco de dados
     * @returns Token de autenticação do usuário
     */
   static generateToken(id: number, nome: string, email: string, nivel_acesso: 'cliente' | 'gerente') {
    return jwt.sign({ id, nome, email, nivel_acesso }, SECRET, { expiresIn: '1h' });
}

    /**
     * Verifica o token do usuário para saber se ele é válido
     * 
     * @param req Requisição
     * @param res Resposta
     * @param next Próximo middleware
     * @returns Token validado ou erro
     */
    static verifyToken(req: Request, res: Response, next: NextFunction): any {
    const token = req.headers['x-access-token'] as string;

    if (!token) {
        return res.status(401).json({ message: "Token não informado", auth: false }).end();
    }

    jwt.verify(token, SECRET, (err, decoded) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ message: "Token expirado", auth: false }).end();
            }
            return res.status(401).json({ message: "Token inválido", auth: false }).end();
        }

        const { exp, id, nivel_acesso } = decoded as JwtPayload;

        if (!exp || !id || !nivel_acesso) {
            return res.status(401).json({ message: "Token inválido", auth: false }).end();
        }

        const currentTime = Math.floor(Date.now() / 1000);
        if (currentTime > exp) {
            return res.status(401).json({ message: "Token expirado", auth: false }).end();
        }

        req.body.userId = id;
        req.body.nivelAcesso = nivel_acesso;

        next();
    });
}

static requireGerente(req: Request, res: Response, next: NextFunction): any {
    if (req.body.nivelAcesso !== 'gerente') {
        return res.status(403).json({ message: 'Acesso permitido apenas para gerentes' });
    }
    next();
}
}
