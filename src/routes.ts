import express from "express";
import { SERVER_ROUTES } from "./appConfig";
import ClienteController from "./controller/ClienteController";
import GerenteController from "./controller/GerenteController";
import PedidoController from "./controller/PedidoController";
import PratoController from "./controller/PratoController";

const router = express.Router();

router.get('/', (req, res) => {
    res.json({ mensagem: "Rota padrão" })
});

// CRUD Cliente
router.get(SERVER_ROUTES.LISTAR_CLIENTES, ClienteController.todos);
router.post(SERVER_ROUTES.NOVO_CLIENTE, ClienteController.cadastrar);
router.put(SERVER_ROUTES.REMOVER_CLIENTE, ClienteController.remover);
router.put(SERVER_ROUTES.ATUALIZAR_CLIENTE, ClienteController.atualizar);


//CRUD Gerente
router.get(SERVER_ROUTES.LISTAR_GERENTES, GerenteController.todos);
router.post(SERVER_ROUTES.NOVO_GERENTE, GerenteController.cadastrar);
router.put(SERVER_ROUTES.REMOVER_GERENTE, GerenteController.remover);
router.put(SERVER_ROUTES.ATUALIZAR_GERENTE, GerenteController.atualizar);


//CRUD Pedido
router.get(SERVER_ROUTES.LISTAR_PEDIDOS, PedidoController.todos);
router.post(SERVER_ROUTES.NOVO_PEDIDO, PedidoController.cadastrar);
router.put(SERVER_ROUTES.REMOVER_PEDIDO, PedidoController.remover);
router.put(SERVER_ROUTES.ATUALIZAR_PEDIDO, PedidoController.atualizar);


//CRUD Prato
router.get(SERVER_ROUTES.LISTAR_PRATOS, PratoController.todos);
router.post(SERVER_ROUTES.NOVO_PRATO, PratoController.cadastrar);
router.put(SERVER_ROUTES.REMOVER_PRATO, PratoController.remover);
router.put(SERVER_ROUTES.ATUALIZAR_PRATO, PratoController.atualizar);

export { router }