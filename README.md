# Projeto - Rede Social

Alunos:

Felipe da Graça Costa, Matrícula: 170141667<br/>
Hiago dos Santos Rabelo, Matrícula: 160124492

## Introdução

O projeto de banco de dados para aplicativo de rede social é inspirado em um subconjunto de opções disponíveis no Facebook e no Instagram, com o usuário tendo a opção de realizar o cadastro e de interagir com outros usuários através de criação de posts em páginas, podendo outros usuários comentarem esse post ou seguir o usuário.
Também se destaca a possibilidade de interação entre os usuários da criação de grupos, da inserção de hobbies ao perfil e da localização. Sendo que uma aplicação da localização é quanto a possibilidade de filtrar tanto anúncios, instituições de ensino e outros usuários que estejam próximos.<br/><br/>
A rede social também tem a possibilidade de anexar anúncios aos posts, e para tornar a prática de marketing possível dentro da rede social, cada usuário tem um atributo de saldo com valor default de zero e que pode ser utilizado para colocar o anúncio como premium. Embora o saldo default seja zero, no código sql de exemplo é realizado um update em um registro da tabela usuário para simular a inserção de saldo.<br/><br/>
Os anúncios são distinguidos entre premiums e não premiums, os não premiums são deletados após 30 dias da data de postagem enquanto que os premiums permanecem por 60 dias. Uma procedure é responsável pelo descarte dos anúncios de acordo com o plano anexado. Outra procedure é utilizada para a criação do anúncio com a função de verificar se o usuário tem o saldo mínimo necessário para colocar um anúncio como premium, caso tenha o valor e ele deseje então é descontado da conta, caso contrário é criado sem ser premium e levantado um aviso.<br/><br/>
Acerca da inserção de dados no banco de dados, pode ser realizado através da interação com o frontend pelas chamadas das funções CRUD implementadas no backend do servidor criado, ou então através de queries diretas no PostgreSQL. A inserção de imagens é realizada em ambos os modos e demonstrado no código SQL de exemplo.

## Como rodar

- Deve ser instalado o node.js versão 18 (https://nodejs.org/en/)
- Rodar o código SQL que gera o banco de dados no postgres
- o banco de dados deve conter a seguinte configuração:
  ```
          user: "postgres",
          host: "localhost",
          database: "social",
          password: "postgres",
          port: "5432",
  ```
- Caso seu banco de dados esteja configurado de outra maneira, você deve editar o arquivo /src/lib/db.js
- dentro da pasta do projeto, execute:

```bash
        npm i
        npm run dev
```

## Acesso ao banco de dados

O código da API que realiza as leituras e escritas no banco de dados se encontra em **/src/pages/api**.
No projeto foram utilizados o CRUD (Métodos http GET,POST, DELETE, PATCH) de 3 tabelas: usuario, postagem, comentario

## Arquivos importantes

- Script que gera o banco de dados: **/social.sql**
- Arquvo de configuração do banco de dados no backend: **/src/lib/db.js**

Obs.: View e procedure estão no final do arquivo **social.sql**

## Checklist

- [x] Script que gerou o banco de dados: **/social.sql**
- [x] Utilização de pelo menos uma View: está no final do arquivo **social.sql**
- [x] Utilização de pelo menos uma Procedure: está no final do arquivo **social.sql**
- [x] Inserção de um dado binário no banco: Tanto em **social.sql** quanto através do CRUD
