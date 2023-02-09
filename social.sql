CREATE TABLE usuario (
    nome_completo varchar(50),
    email varchar(30),
    data_nascimento date,
    nome_usuario varchar(30),
    senha varchar(30),
    cpf char(11),
    foto_perfil BYTEA,
	saldo Decimal(19,4) DEFAULT 0.0000,
    fk_localizacao_id INTEGER,
    PRIMARY KEY (nome_usuario, cpf)
);

CREATE TABLE localizacao (
    id SERIAL PRIMARY KEY,
    pais varchar(30),
    cidade varchar(30),
    estado varchar(30)
);

CREATE TABLE pagina (
    id SERIAL PRIMARY KEY,
    nome varchar(30),
    fk_usuario_nome_usuario varchar(30),
    fk_usuario_cpf char(11)
);

CREATE TABLE categoria_pagina (
    id SERIAL PRIMARY KEY,
    nome varchar(30)
);

CREATE TABLE postagem (
    id SERIAL PRIMARY KEY,
    data TIMESTAMPTZ DEFAULT Now(),
    conteudo BYTEA,
	legenda TEXT,
    fk_usuario_nome_usuario varchar(30),
    fk_usuario_cpf char(11),
    fk_pagina_id INTEGER
);

CREATE TABLE hobbies (
    id SERIAL PRIMARY KEY,
    nome varchar(30)
);

CREATE TABLE grupo (
    id SERIAL PRIMARY KEY,
    categoria_grupo varchar(30),
    nome varchar(30)
);

CREATE TABLE comentario (
    id SERIAL PRIMARY KEY,
    texto varchar(100),
    data TIMESTAMPTZ DEFAULT Now(),
    fk_postagem_id INTEGER,
	fk_usuario_nome_usuario varchar(30),
	fk_usuario_cpf char(11)
);

CREATE TABLE instituicao_ensino (
    id SERIAL PRIMARY KEY,
    nome varchar(30),
    fk_localizacao_id INTEGER
);

CREATE TABLE anuncio (
    id SERIAL PRIMARY KEY,
    valor INTEGER,
    data TIMESTAMPTZ DEFAULT Now(),
	premium Boolean DEFAULT 'false',
    titulo varchar(30),
    fk_localizacao_id INTEGER,
    fk_postagem_id INTEGER
);

CREATE TABLE segue (
    fk_usuario_nome_usuario varchar(30),
    fk_usuario_cpf char(11),
    fk_usuario_nome_usuario_ varchar(30),
    fk_usuario_cpf_ char(11)
);

CREATE TABLE cursada (
    fk_instituicao_ensino_id INTEGER,
    fk_usuario_nome_usuario varchar(30),
    fk_usuario_cpf char(11)
);

CREATE TABLE membros (
    fk_grupo_id INTEGER,
    fk_usuario_nome_usuario varchar(30),
    fk_usuario_cpf char(11)
);

CREATE TABLE praticado (
    fk_hobbies_id INTEGER,
    fk_usuario_nome_usuario varchar(30),
    fk_usuario_cpf char(11)
);

CREATE TABLE categoriza (
    fk_categoria_pagina_id INTEGER,
    fk_pagina_id INTEGER
);

CREATE TABLE forma (
    fk_grupo_id INTEGER,
    fk_usuario_nome_usuario varchar(30),
    fk_usuario_cpf char(11)
);

CREATE TABLE segue_pagina (
    fk_pagina_id INTEGER,
    fk_usuario_nome_usuario varchar(30),
    fk_usuario_cpf char(11)
);

CREATE TABLE curte (
    fk_usuario_nome_usuario varchar(30),
    fk_usuario_cpf char(11),
    fk_postagem_id INTEGER
);
 
ALTER TABLE usuario ADD CONSTRAINT FK_usuario_2
    FOREIGN KEY (fk_localizacao_id)
    REFERENCES localizacao (id)
    ON DELETE SET NULL;
 
ALTER TABLE pagina ADD CONSTRAINT FK_pagina_2
    FOREIGN KEY (fk_usuario_nome_usuario, fk_usuario_cpf)
    REFERENCES usuario (nome_usuario, cpf)
    ON DELETE CASCADE;
 
ALTER TABLE postagem ADD CONSTRAINT FK_postagem_2
    FOREIGN KEY (fk_usuario_nome_usuario, fk_usuario_cpf)
    REFERENCES usuario (nome_usuario, cpf)
    ON DELETE CASCADE;
 
ALTER TABLE postagem ADD CONSTRAINT FK_postagem_3
    FOREIGN KEY (fk_pagina_id)
    REFERENCES pagina (id)
    ON DELETE SET NULL;
 
ALTER TABLE comentario ADD CONSTRAINT FK_comentario_2
    FOREIGN KEY (fk_postagem_id)
    REFERENCES postagem (id)
    ON DELETE CASCADE;
 
ALTER TABLE instituicao_ensino ADD CONSTRAINT FK_instituicao_ensino_2
    FOREIGN KEY (fk_localizacao_id)
    REFERENCES localizacao (id)
    ON DELETE CASCADE;
 
ALTER TABLE anuncio ADD CONSTRAINT FK_anuncio_2
    FOREIGN KEY (fk_localizacao_id)
    REFERENCES localizacao (id)
    ON DELETE CASCADE;
 
ALTER TABLE anuncio ADD CONSTRAINT FK_anuncio_3
    FOREIGN KEY (fk_postagem_id)
    REFERENCES postagem (id)
    ON DELETE CASCADE;
 
ALTER TABLE segue ADD CONSTRAINT FK_segue_1
    FOREIGN KEY (fk_usuario_nome_usuario, fk_usuario_cpf)
    REFERENCES usuario (nome_usuario, cpf)
    ON DELETE CASCADE;
 
ALTER TABLE segue ADD CONSTRAINT FK_segue_2
    FOREIGN KEY (fk_usuario_nome_usuario_, fk_usuario_cpf_)
    REFERENCES usuario (nome_usuario, cpf)
    ON DELETE CASCADE;
 
ALTER TABLE cursada ADD CONSTRAINT FK_cursada_1
    FOREIGN KEY (fk_instituicao_ensino_id)
    REFERENCES instituicao_ensino (id)
    ON DELETE SET NULL;
 
ALTER TABLE cursada ADD CONSTRAINT FK_cursada_2
    FOREIGN KEY (fk_usuario_nome_usuario, fk_usuario_cpf)
    REFERENCES usuario (nome_usuario, cpf)
    ON DELETE SET NULL;
 
ALTER TABLE membros ADD CONSTRAINT FK_membros_1
    FOREIGN KEY (fk_grupo_id)
    REFERENCES grupo (id)
    ON DELETE SET NULL;
 
ALTER TABLE membros ADD CONSTRAINT FK_membros_2
    FOREIGN KEY (fk_usuario_nome_usuario, fk_usuario_cpf)
    REFERENCES usuario (nome_usuario, cpf)
    ON DELETE SET NULL;
 
ALTER TABLE praticado ADD CONSTRAINT FK_praticado_1
    FOREIGN KEY (fk_hobbies_id)
    REFERENCES hobbies (id)
    ON DELETE SET NULL;
 
ALTER TABLE praticado ADD CONSTRAINT FK_praticado_2
    FOREIGN KEY (fk_usuario_nome_usuario, fk_usuario_cpf)
    REFERENCES usuario (nome_usuario, cpf)
    ON DELETE SET NULL;
 
ALTER TABLE categoriza ADD CONSTRAINT FK_categoriza_1
    FOREIGN KEY (fk_categoria_pagina_id)
    REFERENCES categoria_pagina (id)
    ON DELETE RESTRICT;
 
ALTER TABLE categoriza ADD CONSTRAINT FK_categoriza_2
    FOREIGN KEY (fk_pagina_id)
    REFERENCES pagina (id)
    ON DELETE SET NULL;
 
ALTER TABLE forma ADD CONSTRAINT FK_forma_1
    FOREIGN KEY (fk_grupo_id)
    REFERENCES grupo (id)
    ON DELETE SET NULL;
 
ALTER TABLE forma ADD CONSTRAINT FK_forma_2
    FOREIGN KEY (fk_usuario_nome_usuario, fk_usuario_cpf)
    REFERENCES usuario (nome_usuario, cpf)
    ON DELETE SET NULL;
 
ALTER TABLE segue_pagina ADD CONSTRAINT FK_segue_pagina_1
    FOREIGN KEY (fk_pagina_id)
    REFERENCES pagina (id)
    ON DELETE SET NULL;
 
ALTER TABLE segue_pagina ADD CONSTRAINT FK_segue_pagina_2
    FOREIGN KEY (fk_usuario_nome_usuario, fk_usuario_cpf)
    REFERENCES usuario (nome_usuario, cpf)
    ON DELETE SET NULL;
						
ALTER TABLE comentario ADD CONSTRAINT FK_comentario_3
	FOREIGN KEY (fk_usuario_nome_usuario, fk_usuario_cpf)
    REFERENCES usuario (nome_usuario, cpf)
    ON DELETE SET NULL;
						
ALTER TABLE curte ADD CONSTRAINT FK_curte_1
    FOREIGN KEY (fk_usuario_nome_usuario, fk_usuario_cpf)
    REFERENCES usuario (nome_usuario, cpf)
    ON DELETE SET NULL;
 
ALTER TABLE curte ADD CONSTRAINT FK_curte_2
    FOREIGN KEY (fk_postagem_id)
    REFERENCES postagem (id)
    ON DELETE SET NULL;
	

-- ## 5 registros para cada tabela ## --

INSERT INTO localizacao (pais, cidade, estado) 
VALUES 
    ('Brazil', 'Rio de Janeiro', 'RJ'),
    ('Brazil', 'São Paulo', 'SP'),
    ('Brazil', 'Belo Horizonte', 'MG'),
    ('Brazil', 'Brasília', 'DF'),
    ('Brazil', 'Curitiba', 'PR');

INSERT INTO usuario (nome_completo, email, data_nascimento, nome_usuario, senha, cpf, fk_localizacao_id)
VALUES
    ('John Doe', 'johndoe@email.com', '1980-01-01', 'johndoe', 'password1', '12345678901', 1),
    ('Jane Doe', 'janedoe@email.com', '1985-05-05', 'janedoe', 'password2', '10987654321', 2),
    ('Bob Smith', 'bobsmith@email.com', '1990-10-10', 'bobsmith', 'password3', '98765432109', 3),
    ('Emily Brown', 'emilybrown@email.com', '1995-01-01', 'emilybrown', 'password4', '65432109876', 4),
    ('William Johnson', 'williamjohnson@email.com', '2000-12-31', 'williamjohnson', 'password5', '45678901234', 5);
  
INSERT INTO segue (fk_usuario_nome_usuario, fk_usuario_cpf, fk_usuario_nome_usuario_, fk_usuario_cpf_)
VALUES
    ('johndoe', '12345678901', 'janedoe', '10987654321'),
    ('johndoe', '12345678901', 'bobsmith', '98765432109'),
    ('janedoe', '10987654321', 'emilybrown', '65432109876'),
    ('bobsmith', '98765432109', 'williamjohnson', '45678901234'),
    ('emilybrown', '65432109876', 'williamjohnson', '45678901234');

INSERT INTO pagina (nome, fk_usuario_nome_usuario, fk_usuario_cpf)
VALUES 
    ('Minhas Viagens', 'emilybrown', '65432109876'),
    ('Receitas de bolo', 'johndoe', '12345678901'),
    ('UnBSincera', 'johndoe', '12345678901'),
    ('Republicas Asa Norte', 'williamjohnson', '45678901234'),
    ('Gatos da UnB', 'bobsmith', '98765432109');

INSERT INTO categoria_pagina (nome)
VALUES 
    ('Viagem'),
    ('Culinária'),
    ('Lazer'),
    ('Imoveis'),
    ('Animais');

INSERT INTO categoriza (fk_categoria_pagina_id, fk_pagina_id)
VALUES
    (1,1),
    (2,2),
    (3,3),
    (4,4),
    (5,5);


INSERT INTO postagem (conteudo, legenda, fk_usuario_nome_usuario, fk_usuario_cpf, fk_pagina_id)
VALUES 
    (pg_read_binary_file('/home/hiago/Downloads/larc.jpg')::bytea, 'Competição de Robótica', 'emilybrown', '65432109876', 1),
    (pg_read_binary_file('/home/hiago/Downloads/bolo.jpg')::bytea, 'Primeiro bolo de chocolate', 'johndoe', '12345678901', 2),
    (pg_read_binary_file('/home/hiago/Downloads/festaUnB.jpg')::bytea, 'HH de quinta', 'johndoe', '12345678901', 3),
    (pg_read_binary_file('/home/hiago/Downloads/aluguel.jpg')::bytea, 'Aluguel barato perto da UnB', 'williamjohnson', '45678901234', 4),
    (pg_read_binary_file('/home/hiago/Downloads/gato.jpg')::bytea, 'Muito fofo ><', 'bobsmith', '98765432109', 5),
    (pg_read_binary_file('/home/hiago/Downloads/aluguel.jpg')::bytea, 'Aluguel republica', 'williamjohnson', '45678901234', 4),
    (pg_read_binary_file('/home/hiago/Downloads/aluguel.jpg')::bytea, 'Meu amigo ta alugando', 'williamjohnson', '45678901234', 4),
    (pg_read_binary_file('/home/hiago/Downloads/aluguel.jpg')::bytea, 'Aluguel barato Plano', 'williamjohnson', '45678901234', 4),
    (pg_read_binary_file('/home/hiago/Downloads/aluguel.jpg')::bytea, 'Vaga republica mista', 'williamjohnson', '45678901234', 4);



INSERT INTO hobbies (nome)
VALUES
    ('cantar'),
    ('malhar'),
    ('cozinhar'),
    ('ir para festas'),
    ('programar');

INSERT INTO grupo (categoria_grupo, nome)
VALUES
    ('Comidas', 'Comida mais gostosa da rede'),
    ('Comedia', 'Terceirao'),
    ('Noticia', 'Familia Santos'),
    ('Noticia', 'Familia Soares'),
    ('Avisos', 'Materia BD - 2022.2');

INSERT INTO comentario (texto, fk_postagem_id, fk_usuario_nome_usuario, fk_usuario_cpf)
VALUES
    ('Qual o valor ?', 4, 'johndoe', '12345678901'),
    ('Sao os alunos que nao formaram haha', 5, 'johndoe', '12345678901'),
    ('Ainda tá disponivel ?', 4, 'bobsmith', '98765432109'),
    ('Ficou muito bom esse bolo', 2, 'bobsmith', '98765432109'),
    ('Mandei mensagem no direct', 4, 'johndoe', '12345678901');

INSERT INTO instituicao_ensino (nome, fk_localizacao_id)
VALUES
    ('UFRJ', 1),
    ('USP', 2),
    ('UFMG', 3),
    ('UnB', 4),
    ('UFPR', 5);

create or replace procedure CreateADS(
	arg_valor INTEGER,
	arg_nome_usuario varchar(30),
	arg_premium Boolean,
	arg_titulo varchar(30),
	arg_fk_localizacao_id INTEGER,
	arg_fk_postagem_id INTEGER
)
language plpgsql  
as $$
	DECLARE taxa CONSTANT integer := 10;
begin
	if arg_premium then
		perform * from usuario
		where arg_nome_usuario = nome_usuario and saldo >= taxa;
		
		if found then	
			update usuario
			set saldo = saldo - taxa
			where arg_nome_usuario = nome_usuario;
		else
			RAISE NOTICE 'Saldo insuficiente';
			arg_premium = 'false';
		end if;
	end if;
	
	insert into anuncio
	(valor, premium, titulo, fk_localizacao_id, fk_postagem_id)
	values 
	(arg_valor, arg_premium, arg_titulo, arg_fk_localizacao_id, arg_fk_postagem_id);
	
end;
$$;

-- Antes de se criar o anuncio, o usuario pode inserir um valor ao saldo da conta caso deseje um anuncio premium
update usuario 
set saldo = 20
where nome_usuario = 'janedoe';

-- Para a inserção de anuncio é utilizada uma procedure
call CreateADS(50,'williamjohnson','false','perto da UnB',4,4);
call CreateADS(20,'williamjohnson','false','Morei la',4,6);
call CreateADS(500,'janedoe','true','Entrar em contato comigo',4,7);
call CreateADS(40,'williamjohnson','false','Aluguel',4,8);
call CreateADS(30,'williamjohnson','true','Republica mista',4,9);


INSERT INTO cursada (fk_instituicao_ensino_id, fk_usuario_nome_usuario, fk_usuario_cpf)
VALUES 
    (1, 'johndoe', '12345678901'),
    (2, 'janedoe', '10987654321'),
    (3, 'bobsmith', '98765432109'),
    (4, 'emilybrown', '65432109876'),
    (5, 'williamjohnson', '45678901234');

INSERT INTO membros (fk_grupo_id, fk_usuario_nome_usuario, fk_usuario_cpf)
VALUES 
    (1, 'johndoe', '12345678901'),
    (2, 'janedoe', '10987654321'),
    (3, 'bobsmith', '98765432109'),
    (4, 'emilybrown', '65432109876'),
    (5, 'williamjohnson', '45678901234');

INSERT INTO praticado (fk_hobbies_id, fk_usuario_nome_usuario, fk_usuario_cpf)
VALUES 
    (2, 'johndoe', '12345678901'),
    (2, 'janedoe', '10987654321'),
    (4, 'bobsmith', '98765432109'),
    (4, 'emilybrown', '65432109876'),
    (1, 'williamjohnson', '45678901234');

INSERT INTO forma (fk_grupo_id, fk_usuario_nome_usuario, fk_usuario_cpf)
VALUES
    (3, 'johndoe', '12345678901'),
    (1, 'janedoe', '10987654321'),
    (1, 'bobsmith', '98765432109'),
    (4, 'emilybrown', '65432109876'),
    (4, 'williamjohnson', '45678901234');

INSERT INTO segue_pagina (fk_pagina_id, fk_usuario_nome_usuario, fk_usuario_cpf)
VALUES
    (1, 'johndoe', '12345678901'),
    (1, 'janedoe', '10987654321'),
    (3, 'bobsmith', '98765432109'),
    (4, 'emilybrown', '65432109876'),
    (4, 'williamjohnson', '45678901234');

INSERT INTO curte (fk_usuario_nome_usuario, fk_usuario_cpf, fk_postagem_id)
VALUES
    ('johndoe', '12345678901', 3),
    ('janedoe', '10987654321', 4),
    ('bobsmith', '98765432109', 1),
    ('emilybrown', '65432109876', 1),
    ('williamjohnson', '45678901234', 4);



CREATE VIEW comentarios_postagem AS
SELECT comentario.id, comentario.texto, comentario.data, comentario.fk_postagem_id, usuario.nome_completo, usuario.email
FROM comentario
JOIN usuario ON comentario.fk_usuario_nome_usuario = usuario.nome_usuario AND comentario.fk_usuario_cpf = usuario.cpf
JOIN postagem ON comentario.fk_postagem_id = postagem.id;


create or replace procedure DeleteOldADS()
language plpgsql  
as $$
begin
	delete from anuncio
	where id in (
		(select id from anuncio where data < now() - interval '30 days' and premium = 'false')
		union
		(select id from anuncio where data < now() - interval '60 days' and premium = 'true')
	);
end;
$$;


call DeleteOldADS();
