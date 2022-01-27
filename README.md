# teste-tallos-api

Este é um projeto para controle de funcionários usando Nestjs e MongoBD, solicitado pela empresa Tallos como teste admissional. O objetivo é em construir uma API protegida pelo método de autenticação JWT e limitando as ações de cada usuário.

## Tecnologias utilizadas:
  - [Node.js](https://nodejs.org)
  - [NestJS](https://nestjs.com/)
  - [NPM](https://www.npmjs.com/)
  - [MongoDB](https://www.mongodb.com)
  - [MongoDB Cloud](https://www.mongodb.com/pt-br/cloud)
  - [Docker](https://www.docker.com/)
  - [Socket.IO](https://socket.io/)

### Instalando as dependências e rodando o projeto:
```
npm run start:docker:dev
```
##### ou utilizar o docker
```
docker-compose up
```
###### (Caso não utilizar o npm install mas também não queria ficar com os warnings do editor de códigos, você pode copiar do container o node_modules)
```
docker cp teste-tallos-api:/app/node_modules/. ./node_modules)
```

## Rotas das API
### As rotas estão documentadas no Swagger, ao iniciar a aplicação será possível ter acesso a elas. Mas abaixo temos uma prévia.

###### Na nossa API somente a rota login não é protegida:
  - /login, para geração do token JWT (POST)

###### Existe três níveis de acesso: admin, manager e user, em ordem de prioridade. As rotas são:
  Exclusivas ao admin:
  - /employee, para remover um funcionário (DELETE)

  Exclusivas ao admin e ao manager:
  - /employee, para cadastrar um funcionário (POST)
  - /employee/:id, para editar um funcionário (PATCH)

  Liberadas para todos os níveis:
  - /user, para acessar os dados do usuário atual (GET)
  - /employee, para listar todos os funcionários (GET)
  - /employee/:id, para consultar um funcionário específico (GET)
