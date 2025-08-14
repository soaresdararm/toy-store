# Tecnologias Utilizadas

Abaixo estão as principais tecnologias utilizadas no projeto Toy Store API, conforme descrito no README:

- **Node.js**: Ambiente de execução para JavaScript/TypeScript no backend.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática ao código.
- **Express**: Framework minimalista para criação de APIs RESTful em Node.js.
- **JWT (JSON Web Token)**: Utilizado para autenticação e autorização de usuários.
- **Jest**: Framework de testes automatizados para JavaScript/TypeScript.

## Como cada tecnologia está implementada

- **Node.js & TypeScript**: O projeto é inicializado com TypeScript (`tsconfig.json`) e scripts no `package.json` para compilar e rodar o servidor.
- **Express**: O servidor é inicializado em `src/app.ts` e as rotas são organizadas em `src/routes/`.
- **JWT**: Implementado em `src/middlewares/authMiddleware.ts` para proteger rotas e validar tokens.
- **Jest**: Testes automatizados estão em `src/tests/` e podem ser executados com `npm test`.
