Você precisará ter o NodeJS instalado na sua máquina, após isso, clonar este repositório:

$ git clone https://github.com/jtomazi/Api.git

**Executando a aplicação**

Para executá-la é muito simples, ****acesse a pasta pelo prompt**** e rode os seguintes comandos:

$ npm add express - Baixando as dependências express.

$ npm add http - Baixando as dependências http.

$ npm add jsonwebtoken - Baixando as dependências jsonwebtoken.

$ node src/Api.js - Para iniciar o servidor local (com o prompt aberto, CTRL + C para parar o servidor).

Tudo pronto! faça as requisições utilizando um API Client (Postman, Insomnia).

Rotas que serão utilizadas pela API Client:

GET - http://localhost:6000/

GET - http://localhost:6000/produtos

POST - http://localhost:6000/login

POST - http://localhost:6000/logout
