# 🎮 WydenGames API

API RESTful desenvolvida com **Java** e **Spring Boot** para gerenciamento de coleção de jogos pessoais.  
Inspirada no [Backloggd](https://www.backloggd.com/), a aplicação permite que usuários registrem jogos, avaliem, escrevam reviews e organizem suas bibliotecas (*Played, Backlog, Wishlist*, etc.).

---

## 🚀 Tecnologias Utilizadas

- **Java 21**
- **Spring Boot 3**
- **Spring Security + JWT** (Autenticação e Autorização)
- **Spring Data JPA** (Persistência de dados)
- **H2 Database** (ambiente de desenvolvimento)
- **PostgreSQL** (produção)
- **Lombok** (redução de boilerplate)

---

## 🔐 Autenticação e Segurança

A API utiliza **JWT (JSON Web Token)** para autenticação.  
Para acessar endpoints protegidos, envie o token no cabeçalho da requisição:

Authorization: Bearer <seu_token_jwt>



### Níveis de Acesso (Roles)
| Role  | Descrição |
|-------|------------|
| **USER** | Usuário padrão. Pode gerenciar seus próprios logs e visualizar jogos. |
| **ADMIN** | Administrador. Pode gerenciar jogos, visualizar usuários e excluir contas. |

---

## 🧩 Endpoints Principais

### 1. 👤 Usuários (`/users`)

| Método | Endpoint | Acesso | Descrição |
|--------|-----------|---------|------------|
| **POST** | `/users/register` | Público | Cria uma nova conta de usuário (Role: USER). |
| **POST** | `/users/login` | Público | Autentica o usuário e retorna o Token JWT. |
| **GET** | `/users/me` | Autenticado | Retorna o perfil e estatísticas do usuário logado. |
| **PUT** | `/users/me` | Autenticado | Atualiza dados do usuário e retorna novo Token. |
| **DELETE** | `/users/{id}` | ADMIN | Exclui um usuário (e seus logs). |

#### Exemplo de Body (Register/Login)
json
{
  "email": "usuario@exemplo.com",
  "password": "senha123",
  "username": "GamerOne"
}  


| Método     | Endpoint      | Acesso  | Descrição                               |
| ---------- | ------------- | ------- | --------------------------------------- |
| **GET**    | `/games`      | Público | Lista todos os jogos cadastrados.       |
| **GET**    | `/games/{id}` | Público | Retorna detalhes de um jogo específico. |
| **POST**   | `/games`      | ADMIN   | Cadastra um novo jogo.                  |
| **DELETE** | `/games/{id}` | ADMIN   | Remove um jogo.                         |

# Exemplo de Resposta
```bash
{
  "id": 1,
  "title": "Hades II",
  "year": 2024,
  "imgUrl": "https://...",
  "shortDescription": "...",
  "score": 4.8
}
```

3. 📚 Logs de Jogos / Biblioteca (/gamelogs)

Esse é o núcleo da aplicação, onde o usuário vincula um jogo ao seu perfil.

| Método   | Endpoint            | Acesso      | Descrição                                         |
| -------- | ------------------- | ----------- | ------------------------------------------------- |
| **POST** | `/gamelogs`         | Autenticado | Cria ou atualiza um log (status, rating, review). |
| **GET**  | `/gamelogs/my-logs` | Autenticado | Lista todos os jogos logados pelo usuário.        |



Exemplo de Body (POST /gamelogs)

```bash
    {
    "gameId": 10,
    "status": "PLAYED",
    "rating": 5,
    "review": "Jogo incrível, recomendo!"
    }
```

**Status possíveis: PLAYED, PLAYING, BACKLOG, WISHLIST**

4. 🧑‍💻 Painel Administrativo (/admin)

| Método   | Endpoint       | Acesso | Descrição                                 |
| -------- | -------------- | ------ | ----------------------------------------- |
| **GET**  | `/admin/users` | ADMIN  | Lista todos os usuários com estatísticas. |
| **POST** | `/admin/users` | ADMIN  | Cria um usuário manualmente.              |


🛠️ Como Executar o Projeto

**Clone o repositório**

```bash
git clone https://github.com/seu-usuario/wyden-games-api.git
```


**Execute o projeto**
```bash
./mvnw spring-boot:run
```

📂 Estrutura de Pacotes
```bash
src/main/java/com/wyden/games
├── controllers      # Endpoints REST
├── services         # Regras de negócio
├── repositories     # Acesso a dados (JPA)
├── entities         # Modelos de banco (User, Game, GameLog)
├── dto              # Objetos de transferência (Request/Response)
└── config           # Configurações (Security, CORS)
