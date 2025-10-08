CREATE TABLE cliente (
    id_cliente SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(100) NOT NULL,
    endereco VARCHAR(100) NOT NULL,
    telefone VARCHAR(20),
    status_cliente BOOLEAN DEFAULT TRUE
);

CREATE TABLE gerente (
    id_gerente SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    telefone VARCHAR(15) UNIQUE,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(100) NOT NULL,
    status_gerente BOOLEAN DEFAULT TRUE
);

CREATE TABLE prato (
    id_prato SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao VARCHAR(100) NOT NULL,
    preco DECIMAL(10, 2) NOT NULL,
    status_prato BOOLEAN DEFAULT TRUE
);

CREATE TABLE pedido (
    id_pedido SERIAL PRIMARY KEY,
    id_cliente INT NOT NULL,
    id_prato INT NOT NULL,
    data_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    quantidade INT,
    status_pedido BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (id_cliente) REFERENCES Cliente(id_cliente),
    FOREIGN KEY (id_prato) REFERENCES Prato(id_prato)
);

    INSERT INTO gerente (nome, telefone, email, senha) VALUES
    ('Carlos Andrade', '168823746578', 'carlos@restaurante.com', 'senha123'),
    ('Fernanda Lima', '118827364576', 'fernanda@restaurante.com', 'seguro456'), 
    ('Lucas Martins', '13092736456',  'lucas@restaurante.com', 'admin789'),
    ('Juliana Rocha', '11875647586', 'juliana@restaurante.com', 'chef2025'),
    ('Junim Péroxo', '18657465867', 'junimnim@restaurante.com', 'gerente123');



INSERT INTO cliente (nome, email, senha, endereco, telefone) VALUES
('João Silva', 'joao@gmail.com', 'joaao2312', 'Rua A, 123', '11988887777'),
('Maria Oliveira', 'maria@gmail.com', 'abcd1234', 'Rua B, 456', '11999996666'),
('Pedro Costa', 'pedro@gmail.com', 'fjghus', 'Rua C, 789', '11977775555'),
('Ana Beatriz', 'ana@gmail.com', 'aninhabananinha', 'Rua D, 321', '11966668888'),
('Ricardo Mendes', 'ricardo@gmail.com', 'ricardaodascasadas', 'Rua E, 654', '11955554444'),
('Fernanda Lima', 'fernanda@gmail.com', 'fefelinda123', 'Rua F, 111', '11944443333'),
('Lucas Rocha', 'lucasr@gmail.com', 'lucao2025', 'Rua G, 222', '11933332222'),
('Juliana Souza', 'juliana@gmail.com', 'juju_brilho', 'Rua H, 333', '11922221111'),
('Bruno Martins', 'brunom@gmail.com', 'bm2024login', 'Rua I, 444', '11911110000'),
('Carla Dias', 'carla@gmail.com', 'carlinha456', 'Rua J, 555', '11900009999'),
('Felipe Alves', 'felipe@gmail.com', 'felipao321', 'Rua K, 666', '11988886666'),
('Amanda Torres', 'amanda@gmail.com', 'amandinha321', 'Rua L, 777', '11977778888'),
('Renato Gonçalves', 'renato@gmail.com', 'r3n4t0', 'Rua M, 888', '11966667777'),
('Patrícia Moraes', 'patricia@gmail.com', 'moraes_2024', 'Rua N, 999', '11955556666'),
('Diego Ramos', 'diego@gmail.com', 'diegoboy987', 'Rua O, 1000', '11944445555');


INSERT INTO prato (nome, descricao, preco) VALUES
('Hambúrguer Clássico', 'Pão com gergelim, hambúrguer bovino 150g, queijo prato, alface e tomate', 35.90),
('Hambúrguer Caesar', 'Hambúrguer de frango empanado com molho Caesar, alface e parmesão', 27.50),
('Hambúrguer Parmesão', 'Carne empanada com queijo derretido, molho especial e pão artesanal', 42.00),
('Hambúrguer Funghi', 'Hambúrguer de carne com molho cremoso de cogumelos e queijo suíço', 38.00),
('Hambúrguer Cremoso', 'Frango desfiado com creme de leite, batata palha e queijo cheddar', 32.90),
('Hambúrguer Marguerita', 'Tomate, mussarela de búfala, manjericão e hambúrguer vegetal', 45.00),
('Hambúrguer Alho e Óleo', 'Hambúrguer artesanal com toque de alho crocante e azeite aromático', 29.90),
('Hambúrguer do Mar', 'Blend de peixe crocante com molho tártaro e alface americana', 49.50),
('Hambúrguer Feijoada', 'Hambúrguer de feijão preto com bacon, couve e farofa no pão', 39.90),
('Hambúrguer da Casa', 'Carne bovina 180g, queijo, cebola caramelizada e maionese caseira', 34.00),
('Hambúrguer do Chef', 'Salmão grelhado, cream cheese, rúcula e pão australiano', 52.00),
('Hambúrguer Frios', 'Blend de carnes com recheio de queijos e salame, servido com molho de mostarda', 43.70),
('Hambúrguer Camarão', 'Camarões empanados com molho rosé e alface no pão brioche', 59.90),
('Hambúrguer Frango Cream', 'Frango grelhado, requeijão cremoso, milho e batata palha', 28.50),
('Hambúrguer Panqueca', 'Hambúrguer envolto em panqueca salgada com queijo e molho especial', 31.20),
('Hambúrguer Veggie Poró', 'Grão-de-bico, alho-poró e aveia em pão integral com molho leve', 26.90);


INSERT INTO pedido (id_cliente, id_prato, data_pedido, quantidade) VALUES
(1, 1, '2025-04-15 12:30:00', 2),
(1, 2, '2025-04-15 12:35:00', 1),
(2, 3, '2025-04-15 13:00:00', 1),
(3, 4, '2025-04-15 13:15:00', 2),
(2, 1, '2025-04-16 11:00:00', 1),
(4, 5, '2025-04-16 12:00:00', 1),
(5, 2, '2025-04-16 12:10:00', 3),
(3, 6, '2025-04-16 12:20:00', 2),
(1, 7, '2025-04-16 12:30:00', 1),
(6, 8, '2025-04-16 13:00:00', 1),
(4, 9, '2025-04-16 13:10:00', 2),
(2, 10, '2025-04-17 11:45:00', 1),
(5, 3, '2025-04-17 12:15:00', 2),
(6, 4, '2025-04-17 12:30:00', 1),
(3, 1, '2025-04-17 13:00:00', 2);