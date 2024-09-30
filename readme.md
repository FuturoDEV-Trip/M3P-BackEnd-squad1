
<p>
  <img src = "" alt="Logo da Birdy">
</p>


# 🚀 Não faça sua viagem sem antes utilizar a Birdy

   A Birdy é uma plataforma que visa promover viagens sustentáveis e experiências positivas para os usuários, fornecendo acesso a informações sobre destinos turísticos, praias, atrações naturais e atividades recreativas os quais os usuários poderão cadastra-los em cada viagens que fizerem. Também podem explorar e descobrir novos destinos, encontrar dicas de viagem sustentável com as experiências de outros viajantes.

  O nome 'Birdy' foi escolhido pensando na sensação de liberdade e aventura. 
O aplicativo permitirá aos usuários explorar novos destinos e experiências, desfrutando da beleza e diversidade da natureza de forma leve, como um passarinho.🐦
  
## 🏦 Módulo 1 - Projeto Avaliativo

Este repositório se baseia em um projeto avaliativo do curso FuturoDev o qual faço parte da turma TRIP com entrega no dia 17/05/2024 encerrando o primeiro módulo.
Seguindo um roteiro e aplicando as regras de negócio e rotas que devem ser criadas na aplicação com todas as regras de entrega do projeto avaliativo.

**Objetivo: Montagem e execução de uma aplicação Back-End, que deverá ser uma API Rest, codificada com uso do Node, Express e PostgreSQL - Software MVP**

A API Birdy deseja automatizar algumas ações de atendimento, criando um sistema para armazenamento de informações do usuário(s) e seus destino(s) que poderá servir para gerar um aplicativo que demonstra os pontos de interesses dos usuários para coletar dados, gerar marketing pra empresas de turismo, engajamento em rotas desconhecidas e melhorias de conservação da natureza local... As funcionalidades incluem o cadastro de novos usuários, listagem, edição e deleção de destinos, visualização de informações dos destinos, entre outras.

  *Bora usar as boas praticas de desenvolvimento de software!*

## 📉 Diagrama relacional

<p>
  <img src = "" alt="diagrama UML">
</p>

## 🤖 Como rodar o repositório:

Clone o repositório em sua máquina em uma pasta local 

`Git clone https://github.com/FuturoDEV-Trip/M3P-BackEnd-squad1.git`


### ≈IMPORTANTE!!!!! Na primeira vez é necessário instalar as dependências:

1. `npm install`
2. Se for em ambiente local: `npm install --dev`
3. No documento criado de nome **.env**, rode no terminal: `cp .env_exemple .env` e configure com seus dados conforme a descrição e salve.

 ## 🏗️ Gere as estruturas das tabelas rodando a migration:

 1. Cria uma dataBase em seu postgress PGADMIN com o nome : viagem365 ou igual ao que colocaste no teu .env.
 2. Rode o comando para fazer a migração das tabelas

`sequelize db:migrate`  

## 🌱 Alimente com os primeiros cadastros rodando o seeders:

Para ter valores inciais no banco de dados será necessário rodar o comando abaixo. Voce tera alguns dados em seu Banco de dados para testar login e destino: listar por usuário, atualizar algum existente ou deletar

`npx sequelize-cli db:seed:all`

### Sempre que precisas rodar o repositório em ambiente local

`node src/index.js` - conexão bem sucedida!   ----    Conseguiu?
  
## 🤖 Como rodar o Swagger:

Pelo terminal passa o comando: `node ./swagger.js` 

## 🛝 Acesse pelo navegador:

[link] (http://localhost:3000/docs) ou a porta que esta no seu .env


## 📂 PARA ACESSAR A DOCUMENTAÇÃO ACESSE O LINK:

Caso tenha alguma dúvida!!

[SEQUELIZE](https://sequelize.org/docs/v6/core-concepts/model-basics/)

[SWAGGER Autogen](https://swagger-autogen.github.io/docs/)

  
## 🔪 Validações importantes

- Token JWT - criado na rota login (email e senha do usuário) utilizado para autenticação das rotas privadas. Obs: Token com tempo de expiração de 15 minutos.
  
- Tabela usuário:
  Impor o preenchimento do nome, sexo, data_nascimento, endereco, cpf, email, senha
  CPF e email são único - não podem repetir nas colunas respectivas - cpf-check

- Tabela destinos:
  Nas rotas o id é extraído do seu token (feito no login)
  Cep é inserido e através dele extraído as coordenadas geograficas pela API externa (https://docs.awesomeapi.com.br/api-cep)

  Para requisições geográficas:
- axios
- nominatim-geocodere colocada no banco de dados daquele destino.


  Somente o usuário daquele destino pode atualizar ou deletar seu(s) destino (s) cadastrado(s).
  
## 🛠️ Construído com

- Trello - todos os passos que fiz para criar, roteiro da aplicação, regras de negócios e validações exigidas
- VsCode - para formar o código em Node.js
- GitHub - utilizando o GitFlow, criado a main, develop e algumas branches para desenvolver cada passo exigido (rotas, controllers, seeders, swagger, API externa para obter coordenadas geográficas a partir do CEP informado...)
- Node.js 
- Express - para execução do javascript como linguagem de back-end.
- Sequelize - usado na formulação da migration, models, controllers, routes...
- Postgres - utilizado como Banco de dados.
- Postman - Utilizado para criar, compartilhar, testar e documentar APIs
- JWT - utilizado para geração do token que utilizaremos nas autenticação das rotas privadas
- Swagger - criar manualmente a documentação da API
- Seeders - usadas para popular automaticamente o banco de dados com dados de teste ou dados iniciais
- 
## 🌊 GitFlow:

Iniciei na main mesmo e organizei as pastas, deletei arquivos e iniciei limpo.

developBack: 
Nossa base de produção para criar novas features
 
*feature/EndPointsLogin - login e geração do token com validade git stat
*feature/consultaCepCoordenadas - consulta de API viaCEP para usuarios
*feature/padronizaStatusCode - padronização do status codes 

  
## 🧑🏻‍🏫 Professores para auxilio

* **Bruno Costa** - [GitHub](https://github.com/Bruno-Costa-fig)


## 👀 Melhorias

- Outros usuários fazer comentário nos destinos de outros usuários.
- Aprender a utilizar o npm e seus validators (npm i cpf-cnpj-validator -S)
- Dar um tempo de expiração ao token, por exemplo de 1 hora
- Fazer YUP
- Alterar a URL automaticamente 


## 🎁 Expressões de gratidão

* O Floripa Mais Tec é uma iniciativa da Prefeitura de Florianópolis, em parceria com SENAI/SC, SEBRAE e ACATE, que visa democratizar o acesso ao ensino tecnológico para todos, oferecendo cursos de Tecnologia gratuitos!  📢;
* Lab365 e todos os monitores;
* Aos melhores colegas de equipe que poderiamos ter!!!
* Qualquer dúvida ou sugestão de melhorar o código eu aceito - algumas escrevi acima!!!
