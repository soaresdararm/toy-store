# Toy Store Front

Este projeto é o frontend da Toy Store, desenvolvido com Next.js, React, TypeScript e Tailwind CSS. Ele consome a API da Toy Store para gerenciar clientes, autenticação e vendas, oferecendo uma interface moderna e responsiva.

## Tecnologias Utilizadas

- **Next.js**: Framework React para renderização SSR/SSG e rotas modernas.
- **React**: Biblioteca para construção de interfaces de usuário.
- **TypeScript**: Tipagem estática para maior segurança e produtividade.
- **Tailwind CSS**: Utilitário CSS para estilização rápida e responsiva.
- **tRPC**: Comunicação typesafe entre frontend e backend.
- **ESLint & Prettier**: Padronização e qualidade de código.

## Estrutura do Projeto

```
toy-store-front/
├── src/
│   ├── app/                # Páginas e rotas (Next.js App Router)
│   ├── modules/            # Módulos de domínio (auth, clientes, home, shared)
│   ├── server/             # Configuração de API e tRPC
│   ├── styles/             # Estilos globais
│   └── trpc/               # Configuração do cliente tRPC
├── public/                 # Arquivos estáticos
├── .env                    # Variáveis de ambiente
├── package.json            # Dependências e scripts
├── tsconfig.json           # Configuração do TypeScript
└── ...
```

## Como rodar o projeto

1. Instale as dependências:
    ```bash
    npm install
    ```
2. Inicie o servidor de desenvolvimento:
    ```bash
    npm run dev
    ```
3. Acesse em [http://localhost:3000](http://localhost:3000)

## Scripts principais

- `npm run dev` — Inicia o servidor Next.js em modo desenvolvimento
- `npm run build` — Gera o build de produção
- `npm run lint` — Executa o linter

## Observações

- Certifique-se de que a API (backend) esteja rodando para o frontend funcionar corretamente.
- As variáveis de ambiente devem ser configuradas no arquivo `.env`.

---

Para dúvidas ou sugestões, consulte a documentação dos módulos em `src/modules/` ou entre em contato com o responsável pelo projeto.
