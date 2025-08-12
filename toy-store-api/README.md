# Toy Store API

## Objetivo

A Toy Store API foi desenvolvida para gerenciar uma loja de brinquedos, permitindo o cadastro, autenticação e gerenciamento de clientes, além do controle de vendas. O objetivo é fornecer uma interface RESTful para operações essenciais de um sistema de vendas, com autenticação e persistência de dados.

## Funcionamento

A API é construída em Node.js com TypeScript e utiliza o padrão MVC (Model-View-Controller). Ela expõe endpoints para:

- **Autenticação**: login de usuários e geração de tokens JWT.
- **Clientes**: cadastro, listagem, atualização e remoção de clientes.
- **Vendas**: registro e consulta de vendas realizadas.

A autenticação é feita via middleware, protegendo rotas sensíveis. O acesso ao banco de dados é abstraído por serviços e utilitários.

## Arquitetura

A estrutura do projeto segue boas práticas de separação de responsabilidades:

```
toy-store-api/
├── src/
│   ├── app.ts                # Inicialização do servidor Express
│   ├── controllers/          # Lógica dos endpoints (auth, clientes, vendas)
│   ├── middlewares/          # Middlewares (ex: autenticação)
│   ├── models/               # Modelos de dados (ex: Cliente, Venda)
│   ├── routes/               # Definição das rotas da API
│   ├── services/             # Regras de negócio e acesso a dados
│   ├── utils/                # Utilitários (ex: conexão com banco)
│   └── tests/                # Testes automatizados
├── package.json              # Dependências e scripts
├── tsconfig.json             # Configuração do TypeScript
```

### Fluxo de uma requisição

1. O cliente faz uma requisição HTTP para um endpoint.
2. A rota correspondente aciona um controller.
3. O controller valida e processa a requisição, utilizando serviços para lógica de negócio.
4. Se necessário, middlewares são executados (ex: autenticação).
5. O serviço acessa o banco de dados via utilitários.
6. A resposta é enviada ao cliente.

## Tecnologias Utilizadas

- Node.js
- TypeScript
- Express
- JWT (autenticação)
- Testes automatizados (Jest ou similar)

## Como executar

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Inicie o servidor:
   ```bash
   npm start
   ```
3. Acesse os endpoints via ferramentas como Postman ou Insomnia.

## Testes

Os testes estão localizados em `src/tests/` e podem ser executados com:

```bash
npm test
```

---

Para mais detalhes, consulte os arquivos de cada pasta ou entre em contato com o desenvolvedor responsável.
