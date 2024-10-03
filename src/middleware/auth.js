const { verify } = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

async function auth(req, res, next) {
    try {
        const { authorization } = req.headers

        const payload = verify(authorization, process.env.SECRET_JWT)

        const usuario = await Usuario.findByPk(payload.sub);
        if (usuario && !usuario.status) {
          usuario.status = true;
          await usuario.save();
        }

        req.userId = payload.sub
    
        next()

    } catch (error) {
        return res.status(401).json({
            message: 'A autenticação falhou, tente novamente.',
            cause: error.message
        })
    }
}

module.exports = { auth }