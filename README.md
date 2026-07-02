# Jules

[![Node.js](https://img.shields.io/badge/Node.js-24.x-339933?style=flat-square&logo=node.js)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5.x-000000?style=flat-square&logo=express)](https://expressjs.com/)
[![Jest](https://img.shields.io/badge/Jest-30.x-C21325?style=flat-square&logo=jest)](https://jestjs.io/)
[![License](https://img.shields.io/badge/License-ISC-blue?style=flat-square)]()

> API REST segura e escalável construída com Express, pronta para servir como base para aplicações modernas.

## Funcionalidades

- **Segurança em camadas** — Helmet para headers de segurança, CORS configurável, rate limiting por IP
- **Validação de entrada** — Validação robusta com express-validator em todas as rotas
- **Pronto para produção** — Health check, tratamento de erros global, parser de corpo limitado
- **Testado** — Suite de testes com Jest + Supertest

## Stack

| Camada | Tecnologia |
|--------|-----------|
| Runtime | Node.js 24 |
| Framework | Express 5 |
| Segurança | Helmet, CORS, Rate Limiting |
| Validação | express-validator |
| Testes | Jest, Supertest |

## Instalação

```bash
git clone https://github.com/juninmd/jules.git
cd jules
npm install
```

## Uso

```bash
# Desenvolvimento
npm start

# Testes
npm test
```

## Endpoints

| Método | Rota | Descrição |
|--------|------|-----------|
| `GET` | `/health` | Health check da aplicação |
| `POST` | `/api/users` | Criação de usuário com validação |

## Variáveis de Ambiente

| Variável | Padrão | Descrição |
|----------|--------|-----------|
| `PORT` | `3000` | Porta do servidor |
| `ALLOWED_ORIGIN` | `http://localhost:3000` | Origem permitida para CORS |
