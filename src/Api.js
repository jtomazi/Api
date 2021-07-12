const express = require("express");
const http = require("http");
const app = express();
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const SECRET = "joaovitor";

app.use(bodyParser.json());

//Criando rota raiz, onde qualquer um consegue fazer o get sem autenticação.
app.get("/", (req, res) => {
  return res.json({ message: "Acessou!" });
});

//Criando rota de produtos, retornando dados estáticos. Essa rota só pode ser acessada caso tenha sido feito o "/login" e se o token estiver válido no header.
app.get("/produtos", verifyJWT, (req, res) => {
  console.log(
    "Usuário de id " + req.userId + " fez a requisição para " + req.url
  );
  res.json([
    { id: 1, nome: "Produto teste", preco: 10.5, codigoBarras: "789680640037" },
  ]);
});

//Criando rota de login, caso o usuário tenha os dados "user" e "password" passados no body da requisição.
app.post("/login", (req, res) => {
  if (req.body.user === "João" && req.body.password === "123") {
    const token = jwt.sign({ userId: 1 }, SECRET, { expiresIn: 300 }); //token é assinado com o id usuário que fez a requisição, o secret e tempo de expiração de 5 min.
    return res.json({ auth: true, token });
  }
  res.status(401).send({ message: "user ou password incorretos" });
});

const blacklist = [];

//Criando rota de logout, fazendo com que quando o usuário acesse essa rota, o token seja enviado para um array "blacklist"
app.post("/logout", function (req, res) {
  blacklist.push(req.headers["x-access-token"]);
  res.end();
});

//Criando função de verificação do token.
function verifyJWT(req, res, next) {
  const token = req.headers["x-access-token"]; // token recebe o x-access-token passado no header da requisição.

  //Criando if para verificar se o token não está na blacklist. O token entra para a blacklist caso tenha sido feito logout ou expirado(5 min).
  const index = blacklist.findIndex((item) => item === token);
  if (index !== -1) return res.status(401).send({ message: "Token expirado" });

  //Passando o token e o SECRET para verificação do token.
  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) return res.status(401).send({ message: "Token inválido" });

    req.userId = decoded.userId;
    next();
  });
}

//Iniciando servidor
const server = http.createServer(app);
const porta = 6000;
server.listen(porta);
console.log(`Servidor online na porta ${porta}`);
