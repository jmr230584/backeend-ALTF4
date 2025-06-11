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
('Ricardo Mendes', 'ricardo@gmail.com', 'ricardaodascasadas', 'Rua E, 654', '11955554444');


INSERT INTO prato (nome, descricao, preco) VALUES
('Lasanha à Bolonhesa', 'Massa recheada com carne moída e molho de tomate', 35.90),
('Salada Caesar', 'Alface, frango grelhado, croutons e molho especial', 27.50, 2),
('Filé à Parmegiana', 'Filé empanado com molho e queijo, acompanhado de arroz e batata', 42.00),
('Risoto de Cogumelos', 'Arroz arbório com cogumelos e parmesão', 38.00),
('Strogonoff de Frango', 'Frango ao molho de creme de leite com arroz e batata palha', 32.90),
('Pizza Marguerita', 'Molho de tomate, mussarela, manjericão e orégano', 45.00);


INSERT INTO pedido (id_cliente, id_prato, data_pedido, quantidade) VALUES
(1, 1, '2025-04-15 12:30:00', 2),
(1, 2, '2025-04-15 12:35:00', 1),
(2, 3, '2025-04-15 13:00:00', 1),
(3, 4, '2025-04-15 13:15:00', 2),
(2, 1, '2025-04-16 11:00:00', 1);