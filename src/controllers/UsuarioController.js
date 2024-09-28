const Usuario = require('../models/Usuario')
const { consultaCep } = require('../utils/consultaCep')
const bcrypt = require("bcrypt");


class UsuarioController {
    async cadastrar(req, res) {
        /*
            #swagger.tags = ['Usuario'],
            #swagger.description = 'Cadastra novo usuário, validação de duplicidade de email e cpf, busca endereço a partir do CEP informado',
            #swagger.parameters['body'] = {
                in: 'body',
                description: 'Cadastra novo usuário',
                schema: {
                    $nome: 'Catarina Márcia Costa',
                    $sexo: 'Feminino',
                    $cpf: '25942677085',
                    $data_nascimento: '1980-03-03',
                    $email: 'catarina_costa@lins.net.br',
                    $password: '12345',
                    $cep: '91160040',
                    $numero: '700'                   
                }
            }
        */
        try {
            const { nome, sexo, cpf, cep, numero,
                email, data_nascimento, password } = req.body            

            const { endereco, bairro, cidade, estado } = await consultaCep(cep)  
            req.body.endereco = endereco  
            req.body.bairro = bairro
            req.body.cidade = cidade
            req.body.estado = estado          

            if (!(nome || sexo || cpf || cep || numero
                || email || data_nascimento || password)) {
                return res.status(400).json({ erro: 'Todos os campos devem ser preenchidos corretamente.' })
            }

            const cpfExistente = await Usuario.findOne({
                where: {
                    cpf: cpf                    
                }
            })
            const emailExistente = await Usuario.findOne({
                where: {
                    email: email                    
                }
            })

            if (cpfExistente) {
                return res.status(400).json({ mensagem: 'CPF já cadastrado' })
            }
            if (emailExistente) {
                return res.status(400).json({ mensagem: 'E-mail já cadastrado' })
            }           

            const hash = await bcrypt.hash(password, 8);

            const usuario = await Usuario.create({
              nome,
              sexo,
              cpf,
              cep,
              numero,
              email,
              data_nascimento,
              password: hash,
              endereco,
              bairro,
              cidade,
              estado
            });
            await usuario.validate()
            await usuario.save()

            res.status(201).json(usuario)

        } catch (error) {      
            console.log(error.message)      
            res.status(500).json({ erro: 'Não foi possível efetuar o cadastro do usuário, verifique os dados inseridos.' })
        }        
    }

    async listar(req, res) {
        try {
            /*
            #swagger.tags = ['Usuario'],
            #swagger.description = 'Lista dados do usuário autenticado',
        */
            const { id } = req.params
            const usuario = await Usuario.findByPk(id)

            if (!usuario) {
                return res.status(404).json({ erro: 'Usuário não encontrado.'})
            }
            if (!(usuario.id === req.userId)) {
                return res.status(401).json({ erro: 'Acesso não autorizado.' })
            }

            res.status(200).json(usuario)

        } catch (error) {
            res.status(500).json({ erro: 'Não foi possível encontrar usuário.' })
        }
    }

    async atualizar(req, res) {
        /*
            #swagger.tags = ['Usuario'],
            #swagger.description = 'Atualiza dados do usuário autenticado',
            #swagger.parameters['body'] = {
                in: 'body',
                description: 'Atualiza usuário',
                schema: {
                    nome: 'Gabrielly Catarina Márcia Costa',
                    sexo: 'Feminino',                    
                    data_nascimento: '1980-03-03',
                    email: 'gabrielly_catarina_costa@lins.net.br',                    
                    cep: '69307540',
                    endereco: 'Rua da Tamarineira',
                    numero: '786',
                    bairro: 'Caçari',
                    cidade: 'Boa Vista',
                    estado: 'Roraima'                   
                }
            }
        */
        try {
            const { id } = req.params
            const usuario = await Usuario.findByPk(id)

            if (!(usuario.id === req.userId)) {
                return res.status(401).json({ erro: 'Acesso não autorizado.' })
            }

            await usuario.update(req.body)
            await usuario.save()
            res.status(200).json({ mensagem: 'Alteração efetuada com sucesso.' })

        } catch (error) {
            res.status(500).json({ erro: 'Não foi possível atualizar usuário.' })
        }
    }

    async excluir(req, res) {
        /*
            #swagger.tags = ['Usuario'],
            #swagger.description = 'Exclui usuário autenticado, desde que não tenha locais cadastrados',
        */
        try {
            const { id } = req.params
            const usuario = await Usuario.findByPk(id)

            if(!(usuario.id === req.userId)) {
                return res.status(401).json({ erro: 'Acesso não autorizado.' })
            }

            if(!usuario) {
                return res.status(404).json({erro: 'Nenhum usuário cadastrado com o id informado.'})
            }

            const localUsuario = await Local.findAll({
                where: {
                    usuario_id: id
                }
            })

            if (localUsuario.length > 0) {
                return res.status(400).json({erro: 'Este usuário não pode ser excluído pois possui locais cadastrados.'})
            }

            await usuario.destroy()
            res.status(200).json({ mensagem: 'Usuário excluído com sucesso.' })

        } catch (error) {
            console.log(error.message)
            res.status(500).json({ erro: 'Não foi possível excluir usuário.' })
        }
    }
}

module.exports = new UsuarioController()
