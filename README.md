# dot-jobs-api

## Descrição:
Repositório para Guardar a API do Dot Jobs, um aplicativo para contratar ou prestar serviços.

## Tecnologias:
Typescript
Node.js
Express

## Desenvolvimento:
Para ajudar no desenvolvimento:
- Clonar o Repositório.
- Entrar no diretório.
- Executar o comando:
```bash
    yarn
```

- Para executar o servidor em desenvolvimento execute o comando:
```bash
    yarn dev:server
```

- Para buildar o código execute o comando:
```bash
    yarn build
```

## Importante 🚩

Toda vez que você der Pull no repositório lembre se de dar os seguintes comandos
```bash
    yarn
    yarn typeorm migration:run
```

## Banco de Dados

Para configurar o Banco de dados:

```bash
    docker run --name dot_jobs_postgres -e POSTGRES_PASSWORD=docker -p 5433:5432 -d postgres
    docker exec -it dot_jobs_postgres /bin/bash
    psql postgres postgres -W #"A senha é docker"
    create database dot_jobs;
    quit
    exit
    yarn typeorm migration:run
```

## Testes

Para rodar os testes basta executar: `yarn test`. Este comando ira executar todos os testes localizados na pasta `__test__`
