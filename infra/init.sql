CREATE TABLE cliente (
    id_cliente SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    endereco TEXT,
    telefone VARCHAR(20)
);

CREATE TABLE gerente (
    id_gerente SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(100) NOT NULL
);

CREATE TABLE prato (
    id_prato SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    preco DECIMAL(10, 2) NOT NULL,
    id_gerente INTEGER NOT NULL,
    FOREIGN KEY (id_gerente) REFERENCES Gerente(id_gerente)
);

CREATE TABLE pedido (
    id_pedido SERIAL PRIMARY KEY,
    id_cliente INTEGER NOT NULL,
    id_prato INTEGER NOT NULL,
    data_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    quantidade INTEGER NOT NULL CHECK (quantidade > 0),
    FOREIGN KEY (id_cliente) REFERENCES Cliente(id_cliente),
    FOREIGN KEY (id_prato) REFERENCES Prato(id_prato)
);

INSERT INTO gerente (nome, email, senha) VALUES
('Carlos Andrade', 'carlos@restaurante.com', 'senha123'),
('Fernanda Lima', 'fernanda@restaurante.com', 'seguro456'); 
('Lucas Martins', 'lucas@restaurante.com', 'admin789'),
('Juliana Rocha', 'juliana@restaurante.com', 'chef2025');
('Junim Péroxo', 'junimnim@restaurante.com', 'gerente123');



INSERT INTO cliente (nome, email, endereco, telefone) VALUES
('João Silva', 'joao@gmail.com', 'Rua A, 123', '11988887777'),
('Maria Oliveira', 'maria@gmail.com', 'Rua B, 456', '11999996666'),
('Pedro Costa', 'pedro@gmail.com', 'Rua C, 789', '11977775555');
('Ana Beatriz', 'ana@gmail.com', 'Rua D, 321', '11966668888'),
('Ricardo Mendes', 'ricardo@gmail.com', 'Rua E, 654', '11955554444');


INSERT INTO prato (nome, descricao, preco, id_gerente) VALUES
('Lasanha à Bolonhesa', 'Massa recheada com carne moída e molho de tomate', 35.90, 1),
('Salada Caesar', 'Alface, frango grelhado, croutons e molho especial', 27.50, 2),
('Filé à Parmegiana', 'Filé empanado com molho e queijo, acompanhado de arroz e batata', 42.00, 1),
('Risoto de Cogumelos', 'Arroz arbório com cogumelos e parmesão', 38.00, 2);
('Strogonoff de Frango', 'Frango ao molho de creme de leite com arroz e batata palha', 32.90, 3),
('Pizza Marguerita', 'Molho de tomate, mussarela, manjericão e orégano', 45.00, 4);


INSERT INTO pedido (id_cliente, id_prato, data_pedido, quantidade) VALUES
(1, 1, '2025-04-15 12:30:00', 2),
(1, 2, '2025-04-15 12:35:00', 1),
(2, 3, '2025-04-15 13:00:00', 1),
(3, 4, '2025-04-15 13:15:00', 2),
(2, 1, '2025-04-16 11:00:00', 1);