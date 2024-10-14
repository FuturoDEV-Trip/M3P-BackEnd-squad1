const { verify } = require("jsonwebtoken");

async function auth(req, res, next) {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: "Token não fornecido." });
    }

    let token;

    if (authorization.startsWith("Bearer ")) {
      token = authorization.split(" ")[1];
    } else {
      token = authorization;
    }

    if (!token) {
      return res.status(401).json({ message: "Token inválido." });
    }

    const payload = verify(token, process.env.SECRET_JWT);

    req.userId = payload.sub;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "A autenticação falhou, tente novamente.",
      cause: error.message,
    });
  }
}

module.exports = { auth };
