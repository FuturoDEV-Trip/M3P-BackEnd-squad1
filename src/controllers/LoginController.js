const Usuario = require('../models/Usuario')
const { sign } = require('jsonwebtoken')
const bcrypt = require('bcrypt')

class LoginController {
    async logar(req, res) {
    /*
        #swagger.path = '/',
        #swagger.method = 'post',
        #swagger.tags = ['Login'],
        #swagger.parameters['body'] = {
            in: 'body',
            description: 'Login',
            schema: {
                $email: 'catarina_costa@lins.net.br',
                $password: '12345'
            }
        }
    */
        try {
            const email = req.body.email
            const password = req.body.password
           
            if (!email) {
                return res.status(400).json({ erro: 'Informe seu email.' })
            }
            if (!password) {
                return res.status(400).json({ erro: 'Informe sua senha.' })
            }

            const usuario = await Usuario.findOne({
                where: { email: email }
            })
            if (!usuario) {
                return res.status(401).json({ erro: 'Email e senha não correspondem a nenhum usuário.' })
            }

            const hashSenha = await bcrypt.compare(password, usuario.password)
            if(!hashSenha) {
                return res.status(400).json({ mensagem: 'Senha inválida.' })
            }

            usuario.status = true;
            await usuario.save()

            const payload = { sub: usuario.id, nome: usuario.nome }
            const token = sign(payload, process.env.SECRET_JWT, { expiresIn: '60m' })

            // res.status(200).json({ Token: token })
            return res.json({
                usuario: {
                  id: usuario.id,
                  nome: usuario.nome,
                },
                token: token
              });

        } catch (error) {   
            console.log(error.message)         
            return res.status(500).json({ erro: 'Solicitação não pôde ser atendida.' })            
        }
    }
}

module.exports = new LoginController()