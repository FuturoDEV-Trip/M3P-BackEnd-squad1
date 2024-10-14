const Usuario = require('../models/Usuario')
const { consultaCep } = require('../utils/consultaCep')
const bcrypt = require("bcrypt")
const Destino = require('../models/Destino')

class UsuarioController {
    async cadastrar(req, res) {
        /*
            #swagger.path = '/',
            #swagger.method = 'post',
            #swagger.tags = ['Usuario'],
            #swagger.description = 'Cadastra novo usuário, validação de duplicidade de email e cpf, busca endereço a partir do CEP informado.',
            #swagger.parameters['body'] = {
                in: 'body',
                description: 'Cadastra novo usuário.',
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
            console.log('Iniciando cadastro de usuário:', req.body)

            const { nome, sexo, cpf, cep, numero,
                email, data_nascimento, password, endereco, bairro, cidade, estado } = req.body                    

            if (!(nome || sexo || cpf || cep || numero
                || email || data_nascimento || password)) {
                return res.status(400).json({ erro: 'Todos os campos devem ser preenchidos.' })
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
                return res.status(409).json({ mensagem: 'CPF já cadastrado, tente novamente.' })
            }

            if (emailExistente) {
                return res.status(409).json({ mensagem: 'E-mail já cadastrado, tente novamente.' })
            }           
            
            if (cep.length !== 8 || isNaN(cep)) {
                return res.status(400).json({ erro: 'CEP inválido. Deve 8 digítos e ser apenas números.' })
            }

            const hash = await bcrypt.hash(password, 8)

            const dadosCep = await consultaCep (cep)
            
            const usuario = await Usuario.create({
              nome,
              sexo,
              cpf,
              data_nascimento,
              email,
              password: hash,
              cep,
              endereco: dadosCep.endereco,
              numero,
              bairro: dadosCep.bairro,
              cidade: dadosCep.cidade,
              estado: dadosCep.estado,
              status: false
            })
            
            console.log('Usuário cadastrado:', usuario)

            res.status(201).json(usuario)

        } catch (error) {
            console.error('Erro ao cadastrar usuário:', error)
            
            if (error.message.includes('CEP não encontrado')) {
                return res.status(400).json({ erro: 'CEP inválido.' })
            } else {
                return res.status(500).json({ erro: 'Não foi possível cadastrar usuário, preencha todos os campos corretamente.' });
            }
        }        
    }

    async listar(req, res) {
        /*
            #swagger.path = '/:id',
            #swagger.method = 'get',
            #swagger.tags = ['Usuario'],
            #swagger.description = 'Lista dados do usuário autenticado',
        */
        try {
            const { id } = req.params
            const usuario = await Usuario.findByPk(id, {
                attributes: [
                    'id', 
                    'nome', 
                    'sexo', 
                    'data_nascimento', 
                    'email',                  
                    'cep', 
                    'endereco', 
                    'numero', 
                    'bairro', 
                    'cidade', 
                    'estado']
            })

            if(!usuario) {
                return res.status(404).json({erro: 'Nenhum usuário cadastrado com o id informado.'})
            }

            if (!(usuario.id === req.userId)) {
                return res.status(401).json({ erro: 'Acesso não autorizado.' })
            }

            res.status(200).json(usuario)

        } catch (error) {
            res.status(500).json({ erro: 'Não foi possível encontrar usuário, tente novamente mais tarde.' })
        }
    }

    async atualizar(req, res) {
        /*
            #swagger.path = '/:id',
            #swagger.method = 'put',
            #swagger.tags = ['Usuario'],
            #swagger.description = 'Atualiza dados do usuário autenticado.',
            #swagger.parameters['body'] = {
                in: 'body',
                description: 'Atualiza usuário',
                schema: {
                    nome: 'Gabrielly Catarina Márcia Costa',
                    sexo: 'Feminino',                    
                    data_nascimento: '1980-03-03',                  
                    cep: '69307540',
                    numero: '786'              
                }
            }
        */
        try {
            const { id } = req.params
            const usuario = await Usuario.findByPk(id, {
                attributes: [
                    'id', 
                    'nome', 
                    'sexo', 
                    'data_nascimento', 
                    'cep', 
                    'endereco', 
                    'numero', 
                    'bairro', 
                    'cidade', 
                    'estado']
            })

            if(!usuario) {
                return res.status(404).json({erro: 'Nenhum usuário cadastrado com o id informado.'})
            }

            if (!(usuario.id === req.userId)) {
                return res.status(401).json({ erro: 'Acesso não autorizado.' })
            }

            const { cep, cpf} = req.body

            if (cpf !== usuario.cpf) {
                return res.status(400).json({ erro: 'O CPF não pode ser alterado.' });
            }

            if (cep.length !== 8 || isNaN(cep)) {
                return res.status(400).json({ erro: 'CEP inválido. Deve 8 digítos e ser apenas números.' })
            }

            if (req.body.cep !== usuario.cep) {
                const dadosCep = await consultaCep(req.body.cep)

            if (!dadosCep || dadosCep.erro) {
                return res.status(400).json({ erro: 'CEP inválido ou não encontrado.' })
            }

                req.body.endereco = dadosCep.endereco;
                req.body.bairro = dadosCep.bairro;
                req.body.cidade = dadosCep.cidade;
                req.body.estado = dadosCep.estado;
            }

            await usuario.update(req.body)
            res.status(200).json({ mensagem: 'Alteração realizada com sucesso.', usuario: usuario })

        } catch (error) {
            res.status(500).json({ erro: 'Não foi possível atualizar usuário, preencha os campos corretamente.' })
        }
    }

    async excluir(req, res) {
        /*
            #swagger.path = '/:id',
            #swagger.method = 'delete',
            #swagger.tags = ['Usuario'],
            #swagger.description = 'Exclui usuário autenticado, desde que não tenha locais cadastrados',
        */
        try {
            const { id } = req.params
            const usuario = await Usuario.findByPk(id)

            if(!usuario) {
                return res.status(404).json({erro: 'Nenhum usuário cadastrado com o id informado.'})
            }

            if(!(usuario.id === req.userId)) {
                return res.status(401).json({ erro: 'Acesso não autorizado.' })
            }            

            const destinoUsuario = await Destino.findAll({
                where: {
                    usuario_id: id
                }
            })

            if (destinoUsuario.length > 0) {
                return res.status(400).json({erro: 'Este usuário não pode ser excluído pois possui Destinos cadastrados.'})
            }

            await usuario.destroy()
            res.status(200).json({ mensagem: 'Usuário excluído com sucesso.' })

        } catch (error) {
            res.status(500).json({ erro: 'Não foi possível excluir usuário, tente novamente mais tarde.' })
        }
    }
}

module.exports = new UsuarioController()