Front - SoGame - Desafio soil

Front construido para o desafio da soil, com o intuito de criar um sistema de cadastro de jogos e usuários.

## Tecnologias utilizadas
- Next.js
- NextAuth.js

## Instalação
para executar o projeto é recomendavel ter o node instalado na máquina.

### 1. Instalação e execução
Clone o projeto do github

Entre na pasta do projeto

Instale as dependencias
``` bash
npm install
```

Rode o projeto
``` bash
npm run dev
```

### 2. Instalação e execução com docker
Clone o projeto do github

Entre na pasta do projeto

execute o comando a baixo para criar a subrede do docker para o projeto
``` bash
docker network create --driver bridge --subnet 172.20.0.0/16 soil-net
```

agora temos 2 opções para roda o projeto, a primeira ira mostrar todos os logs do projeto e a segunda ira rodar em segundo plano.

1. Para rodar o projeto com logs
``` bash
docker compose up
```

2. Para rodar o projeto em segundo plano
``` bash
docker compose up -d
```

## Acesso
Para acessar o projeto basta acessar o endereço http://localhost:3001/signin

rode `docker compose down` para parar o projeto

### license
[MIT](https://choosealicense.com/licenses/mit/)