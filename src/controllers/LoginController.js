const Usuario = require('../models/Usuario')
const { sign } = require('jsonwebtoken')
const bcrypt = require('bcrypt')

class LoginController {
    async logar(req, res) {
                /*
            #swagger.tags = ['Login'],
            #swagger.parameters['body'] = {
                in: 'body',
                description: 'Login',
                schema: {
                    $email: 'gabrielly_catarina_costa@lins.net.br',
                    $password: 'RnGLYZFgc4'
                }
            }
        */
        try {
            const email = req.body.email
            const password = req.body.password
           
            if (!email) {
                return res.status(400).json({ erro: 'Informe o email' })
            }
            if (!password) {
                return res.status(400).json({ erro: 'Informe a senha' })
            }

            const usuario = await Usuario.findOne({
                where: { email: email }
            })
            if (!usuario) {
                return res.status(404).json({ erro: 'Email e senha não correspondem a nenhum usuário' })
            }

            const hashSenha = await bcrypt.compare(password, usuario.password)
            if(!hashSenha) {
                return res.status(400).json({ mensagem: 'Senha inválida' })
            }

            const payload = { sub: usuario.id, email: usuario.email, nome: usuario.nome }
            const token = sign(payload, process.env.SECRET_JWT, { expiresIn: '15m' })

            res.status(200).json({ Token: token })

        } catch (error) {   
            console.log(error.message)         
            return res.status(500).json({ erro: 'Solicitação não pôde ser atendida' })            
        }
    }
}

module.exports = new LoginController()
