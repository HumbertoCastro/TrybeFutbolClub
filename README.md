# Boas vindas ao repositório do Trybe Futebol Clube!
Projeto desenvolvido por Humberto Castro, enquanto estudava no curso Trybe desenvolvimendo web.

<h1>sobre o projeto</h1>

o TFC é um projeto que utiliza de um banco de dados ficticio para gerar partidas e classificaçoes de um campeonato de futebol

Humberto castro - ficou responsavel pelo desenvolvimento do back-end da aplicaçao, construindo o 
banco de dados via node.js, sequelize e express. todos os arquivos foram feitos utilizando TypeScript respeitando o lint. Toda o projeto é conteinerizado utilizando o docker para tal.


<details>
  <summary><strong>Project preview</strong></summary><br />

  ![Exemplo app front](assets/front-example.png)
</details>

<details>
  <summary><strong> Estrutura do projeto</strong></summary><br />

O projeto é composto de 4 entidades importantes para sua estrutura:

1️⃣ **Banco de dados:**
  - Tem o papel de fornecer dados para o serviço _back-end_. Durante os testes sempre vai ser acessado pelo `sequelize` e via porta `3002` do `localhost`; 
  - O projeto contém um script `db:reset` para resetar o banco de dados, criando este e rodando as _migrations_ e _seeders_. Você pode usá-lo em `app/backend` com o commando `npm run db:reset`;
  - Já existem _seeders_ prontas em `app/backend/seeders`. Quando acabar de fazer uma _migration_ você deve renomear a _seeder_ retirando o underline (`_`) ao fim dela, assim o script `db:reset` vai usá-la nos testes e você testará sua _migration_.

2️⃣ **Back-end:**
 - Deve rodar na porta `3001`, pois o front-end faz requisições para ele na porta `3001` por padrão;
 - Sua aplicação deve ser inicializada a partir do arquivo `app/backend/src/server.ts`;
 - Garanta que o `express` é executado e a aplicação ouve a porta que vem das variáveis de ambiente;
 - Todas as dependências extras (tal como `joi`, `boom`, `express-async-errors`...) devem ser listadas em `app/backend/packages.npm`.
  
3️⃣ **Front-end:**
  - Esse site faz requisições para o back-end na porta `3001` para acessar e modificar os dados do banco através dos endpoints que você deve construir nos requisitos.

4️⃣ **Docker:**
  - O Docker entra com o papel de unir todas as partes e subir um projeto completo com um comando só via o `docker-compose`;
