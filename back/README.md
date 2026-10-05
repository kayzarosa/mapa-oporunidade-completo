# Mapa de Oportunidades — Back-end

API do Mapa de Oportunidades, um app para acompanhar processos seletivos: empresa, vaga, expectativa e a linha do tempo de etapas de cada candidatura. O front-end que consome esta API está em `../front`.

## Funcionalidades

- CRUD de processos, com filtro por empresa e expectativa e paginação
- CRUD de etapas (Triagem, Técnica, Cultural e Proposta), com validação dos campos obrigatórios de cada tipo
- Badge de status de cada processo calculado a partir da etapa atual
- Contagem de candidaturas anteriores na mesma empresa e histórico com o resultado de cada uma
- Nome da empresa normalizado ao salvar ("  mercado   LIVRE " vira "Mercado Livre"), para o histórico reconhecer a mesma empresa
- Erros com status HTTP corretos: 400 para dado inválido, 404 para o que não existe

## Stack

| Para quê | O que |
|---|---|
| Servidor | Node.js 24, Fastify 5, TypeScript |
| Banco | SQLite com Prisma 7 e o adapter `better-sqlite3` |
| Validação | Zod |
| Lint e formatação | Biome |

## Pré-requisitos

- Node.js 24
- pnpm

## Como rodar

```bash
pnpm install
cp .env.example .env
pnpm db:migrate
pnpm dev
```

O servidor sobe em `http://localhost:3333`. Confira em `http://localhost:3333/health`.

O pnpm bloqueia por padrão os scripts de instalação de pacotes nativos. A aprovação de `prisma`, `@prisma/engines`, `better-sqlite3` e `esbuild` já está em `pnpm-workspace.yaml`. Se aparecer o aviso mesmo assim, rode `pnpm approve-builds`.

## Variáveis de ambiente

| Variável | Para quê | Exemplo |
|---|---|---|
| `PORT` | Porta em que o servidor sobe | `3333` |
| `DATABASE_URL` | Caminho do banco SQLite | `file:./dev.db` |

O servidor valida as variáveis ao subir e para com uma mensagem clara se alguma faltar.

## Scripts

| Comando | O que faz |
|---|---|
| `pnpm dev` | Servidor com recarga automática |
| `pnpm lint` | Confere o código com o Biome |
| `pnpm format` | Corrige formatação e ordem dos imports |
| `pnpm db:migrate` | Cria e aplica migrations no banco |
| `pnpm db:generate` | Gera o client do Prisma em `src/generated/prisma` |
| `pnpm db:status` | Mostra se o banco está em dia com as migrations |
| `pnpm db:studio` | Abre o banco no navegador |
| `pnpm db:reset` | Apaga todos os dados e reaplica as migrations |

`db:reset` apaga tudo. Use só em banco de desenvolvimento.

## Endpoints

| Método | Rota | O que faz | Sucesso | Erros |
|---|---|---|---|---|
| `GET` | `/health` | Confere se o servidor está de pé | 200 | |
| `POST` | `/processes` | Cria um processo | 201 | 400 |
| `GET` | `/processes` | Lista processos com filtro e paginação | 200 | 400 |
| `GET` | `/processes/:id` | Busca um processo | 200 | 400, 404 |
| `PUT` | `/processes/:id` | Atualiza um processo (só os campos enviados) | 200 | 400, 404 |
| `DELETE` | `/processes/:id` | Exclui o processo e as etapas dele | 204 | 400, 404 |
| `GET` | `/processes/:id/history` | Candidaturas anteriores na mesma empresa | 200 | 400, 404 |
| `POST` | `/processes/:processId/stages` | Cria uma etapa | 201 | 400, 404 |
| `GET` | `/processes/:processId/stages` | Lista as etapas, da mais recente para a mais antiga | 200 | 400, 404 |
| `PUT` | `/stages/:id` | Atualiza uma etapa (corpo completo) | 200 | 400, 404 |
| `DELETE` | `/stages/:id` | Exclui uma etapa | 204 | 400, 404 |

**Filtros da listagem:** `company` (parte do nome), `expectation` (`sonho` ou `gosto muito`), `page` (padrão 1) e `perPage` (padrão 10, máximo 50).

```bash
curl "http://localhost:3333/processes?company=nubank&page=1&perPage=5"
```

**Campos obrigatórios por tipo de etapa:**

| Tipo | Campos extras |
|---|---|
| `triagem`, `cultural` | nenhum |
| `tecnica` | `challenge` e `deadline` |
| `proposta` | `compensation`, `benefits` e `respondBy` |

O `comment` é opcional em qualquer tipo. O `PUT` de etapa exige o corpo completo, porque trocar o tipo muda quais campos valem. Os campos que não pertencem ao tipo novo são zerados.

## Badge do processo

A lista e o detalhe devolvem `badge: { variant, label }`, calculado pela etapa mais recente. O primeiro caso que bater vence:

| # | Variante | Quando |
|---|---|---|
| 1 | `encerrado` | status da etapa é `reprovada` ("Processo encerrado") |
| 2 | `conquista` | proposta com status `aceita` ("Consegui!") |
| 3 | `urgente` | prazo da etapa vence em menos de 2 dias |
| 4 | `atencao` | etapa sem mudança há mais de 7 dias |
| 5 | `info` | tem prazo, faltam 2 dias ou mais |
| 6 | `neutro` | nenhum dos anteriores, mostra o status. Sem etapa: "Candidatura enviada" |

## Arquitetura

Camadas, cada uma só fala com a de baixo:

```
route → middleware (validação Zod) → controller → service → repository (Prisma)
```

```
src/
  routes/        URL, método HTTP e middleware de cada endpoint
  middlewares/   validate: valida body, params e querystring com Zod
  controllers/   chama o service e escolhe o status HTTP
  services/      regra de negócio, um arquivo por ação
  models/        repository (contrato) e implementação com Prisma
  factories/     monta repository, service e controller
  schemas/       formato válido de cada entrada
  types/         tipos do domínio
  lib/           client do Prisma, regra do badge e do resultado do histórico
  errors/        AppError e NotFoundError
  env/           validação das variáveis de ambiente
  utils/         funções puras (normalização do nome da empresa)
prisma/
  schema.prisma  modelos Process e Stage
  migrations/
```

O service depende do contrato `ProcessRepository` e não do Prisma. Quem escolhe a implementação é a factory, então trocar de ORM mexe só em `models/` e `factories/`.

## Produção

O `pnpm build` usa `tsc` puro, que não reescreve o alias `@/` nem as extensões nos imports. O Node não resolve o resultado (`ERR_MODULE_NOT_FOUND`). Para publicar, troque o build por um bundler (como o `tsup`) ou use `tsc && tsc-alias`.

---

Feito com carinho por Kayza ❤️
