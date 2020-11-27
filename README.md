<img src="https://www.luby.com.br/wp-content/uploads/2020/05/Logo-01-160x52.png" style="img { width: 100%; }" />

# Nodejs Challenge

A aplicação sera uma api que armazenara informações a respeito dos usuários dos github

### Protótipo da aplicação

- [x] A sua Api irá fornecer dados para o protótipo disponibilizado no [link](https://xd.adobe.com/view/1798f30c-7746-444c-bffa-91b29835eef5-42cb/ 'Protótipo')

### Requisitos não funcionais

- [x] A aplicação deverá ser feita em utilizando express com o (sequelize) ou adonisjs.
- [x] Os métodos get, post, put, devem ser coerentes com os retornos necessários definidos no protótipo. Ex: na tela de repositórios é necessário retornar um objeto {
      data: (array de repositório com suas respectivas stars),
      count: quantidade de itens retornados.
      }

### Requisitos funcionais

- [x] CRUD de users (nome, email, localização, avatar, username, bio). Um usuário deve ser único
- [x] O método de autenticação devera buscar se o usuário esta cadastrado na tabela users, se sim retornar os dados com sucesso, e armazenar o id do usuário e a data da requisição em uma tabela chamada Tokens.
- [x] CRUD de follower (todo follower deve ser um usuário, criar a relação pertinente para follower e user).
- [x] CRUD de following (todo following deve ser um usuário, criar a relação pertinente para following e user).
- [x] CRUD de repositories (nome, description, public, slug). A propriedade slug deve ser concatenada com o nome de usuário e o nome do repositório.
- [x] CRUD de repositories stars (Esse crud devera manter a relação de usuários que deram stars para um repositório, criar relação pertinente entre users, repositories).
- [X] Gostaríamos de ver os campos necessários para os endpoints fossem validados na request, opcional.
<hr>

### Instalação

#### Necessário:
   
     NodeJs
     Npm | Yarn
	 Npx
	 Postgres

#### Na pasta raiz do projeto
Execute os comandos:

    npm i

##### ou

    yarn add

#### Crie um banco de dados Postgres:

     CREATE DATABASE githubapi

##### ou

    docker run --name postgres -e POSTGRES_PASSWORD=senha -p 5432:5432 -d postgres
#### Configure o arquivo src/config/database.js:

    module.exports = {
	    dialect: 'postgres',
	    host: 'localhost',
	    username: 'postgres',
	    password: 'senha',
	    database: 'githubapi',
	    define: {
		    timestamps: true,
		    underscored: true,
		    underscoredAll: true,
	    }
    };
<hr>

### :file_folder: Rotas e dados:
#### Para fazer login/logout:

|Rota|Método|Funcionalidade|Dados|
|--|--|--|--|
|/login|POST|Criar|username|
|/logout|PUT|Atualizar|name, email, username, avatar, bio,  local|
<hr>

#### :busts_in_silhouette: Para manipular usuários:

|Rota|Método|Funcionalidade|Dados|
|--|--|--|--|
|/users|POST|Criar|name, email, username|
|/users/:id|PUT|Atualizar|name, email, username, avatar, bio,  local|
|/users/:username|GET|Buscar|user, repositories, following, followers|
|/users/:id|DELETE|Excluir||
<hr>

#### Para manipular repositórios:

|Rota|Método|Funcionalidade|Dados|
|--|--|--|--|
|/repository|POST|Criar|name, description, is_private|
|/repository/:id|PUT|Atualizar|name, description, is_private|
|/repository/:id|GET|Buscar|repository, user|
|/repository/:id|DELETE|Excluir||
<hr>

#### Para seguir ou deixar de seguir outros usuários:

|Rota|Método|Funcionalidade|Dados|
|--|--|--|--|
|/follow/:id|POST|Começar a seguir|user, follower|
|/followers/:id|DELETE|Deixar de seguir||
|/:id/followers|GET|Buscar seguidores|user, follower|
|/:id/following|GET|Buscar usuários seguindo|user, following|
<hr>

#### Para dar ou tirar estrelas de um repositório:

|Rota|Método|Funcionalidade|Dados|
|--|--|--|--|
|/repository/:id/star|POST|Marcar um repositório com estrela|repository|
|/repository/:id/star|DELETE|Tirar estrela de um repositório||
<hr>
