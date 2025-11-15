# Projeto Móvel - WYDEN GAMES

Projeto da disciplina de programação de dispositivos móveis com ReactNative + Expo (Android)

Orientador: Prof. Luiz Gustavo Turatti

A solução compartilhada neste repositório consiste no desenvolvimento de uma plataforma para ajudar usuarios a logar seus status de jogos

## Equipe do projeto

202403522594 -  Daniel Vitor Fonseca de Oliveira

- Ademir Filho Pinho da Silva



## Sumário

1. Requisitos
2. Configuração de acesso aos dados
3. Estrutura do projeto
4. Instale os requisitos do projeto
5. Executando o projeto
6. Telas do projeto

A ordem dos itens do sumário pode e deve ser ajustada para melhor entendimento sobre o seu projeto

Lembre-se que todas as instruções presentes neste arquivo devem permitir que outra pessoa seja capaz de clonar o repositório público e seguir os passos para utilizar o projeto


## 🔧 Requisitos:

- NodeJS LTS versão v24.7.0

- React Native versão 0.81.5
  
- Java 21

- Banco de dados: h2

### 🗃️ Tabela 'usuarios' com os seguintes campos:
```
id:   int (primary key)
email : text (nullable)
username: text (nullable)
email: text (nullable)
password: text (nullable)
role: text (nullable)
```
### 🗃️ Tabela 'jogos' com os seguintes campos:
```
gameYear:   int (primary key)
score: int (primary key)
id: int (primary key)
genre: text (nullable)
img_url : text (nullable)
long_description: text (nullable)
plataform:text (nullable)
shot_descript: text (nullable)
```


## 📁 Estrutura do projeto:
```
WydenGames/
├── apresentacao
│   ├── apresentacao.pdf
│   └── apresentacao.pptx
├── backend
│   ├── src
│   ├── .gitignore
│   ├── readme.md
│   └── ...demais arquivos
├── documentacao
│   ├── 01_cartaDeApresentacao.pdf
│   ├── 02_cartaDeAutorizacao.pdf
│   ├── 03_declaracaoDeUsoDeDadosPublicos.pdf
│   ├── 04_roteiroDeExtensao.pdf
│   └── documentacao.md
├── frontend
│   ├── assets
│   ├── src
│   ├── .gitignore
│   ├── package.json
│   ├── readme.md
│   └── ...demais arquivos
├── video
│   ├── apresentacao.gif
│   ├── apresentacao.mkv
│   ├── apresentacao.mp4
│   └── video.txt 
└── readme.md 
```

## 📦 Instale os requisitos do projeto:

Instruções para instalação em um computador com Windows 11

Caso não tenha o chocolatey instalado, inicie o preparo do sistema abrindo um terminar do powershell com privilégio de administrador

```
PS> Set-ExecutionPolicy AllSigned

PS> Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))

PS> choco --version
```

Com o chocolatey instalado, continuamos com a instalação dos requisitos do projeto

```
PS> choco install nodejs-lts -y

PS> choco install openjdk21 -y

PS> choco install nvm -y
```

## 🚀 Execute o projeto:

```
npx expo start
```

## Telas do projeto

Tela 1: login

Tela 2: criacao de usuario

Tela 3: tela inicial

Tela 4: tela de jogos

Tela 5: tela de especificações do jogo

Tela 5: tela de perfil

Tela 6: tela de logar o jogo

Tela 7: tela de painel de admin ( se for um admin)


