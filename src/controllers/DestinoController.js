const Destino = require('../models/Destino')
const { consultaCidade } = require('../utils/consultaCidade')

class DestinoController {
    async cadastrar(req, res) {
                /*
            #swagger.tags = ['Local'],
            #swagger.description = 'Cadastra novo local, buscando a cidade e o estado pelas coordenadas informadas, pelo usuário autenticado',
            #swagger.parameters['body'] = {
                in: 'body',
                description: 'Cadastra novo local',
                schema: {
                    $nome: "Praia da Armação",
                    $descricao: "Praia extensa com restaurantes de frutos do mar e ideal para passear de barco, nadar e fazer caminhadas pela encosta.",
                    $coordenadas_geo: "-27.7442822,-48.5182281"
                }
            }
        */

        try {          
            
            const usuario_id = req.userId
            req.body.usuario_id = usuario_id
            
            const nome =  req.body.nome
            const descricao = req.body.descricao
            const coordenadas_geo = req.body.coordenadas_geo           

            if (!(nome || descricao || coordenadas_geo)) {
                return res.status(400).json({ erro: 'Todos os campos devem ser preenchidos' })
            }

            const coordenadasExistente = await Destino.findOne({
                where: {
                    usuario_id: usuario_id,
                    coordenadas_geo: coordenadas_geo                    
                }
            })
            if (coordenadasExistente) {
                return res.status(409).json({ mensagem: 'Coordenadas já foram cadastradas para o usuário' })
            }
            
            if (coordenadas_geo) {
                const { cep, cidade, estado, pais } = await consultaCidade(coordenadas_geo)

                if (cep && cidade && estado && pais) {
                    req.body.cep =cep
                    req.body.cidade = cidade
                    req.body.estado = estado
                    req.body.pais = pais                    
                } else {
                    throw new Error('Não foi possível encontrar a cidade e estado para as coordenadas fornecidas')
                }
            }

            const destino = await Destino.create(req.body)
            await destino.save()

            res.status(201).json(destino)

        } catch (error) {    
            console.error('Erro ao cadastrar destino:', error)
            res.status(500).json({ erro: 'Não foi possível efetuar o cadastro do destino' })
        }
    }

    async listar(req, res) {
        /*
            #swagger.tags = ['Local'],
            #swagger.description = 'Lista todos os locais cadastrados pelo usuário autenticado'
        */
        try {            
            const userId = req.userId
            const destinos = await Destino.findAll({
                where: {
                    usuario_id: userId
                }
            })
            res.status(200).json(destinos)

        } catch (error) {
            res.status(500).json({ erro: 'Não foi possível listar os destinos'})
        }
    }

    async listarUm(req, res) {
        /*
            #swagger.tags = ['Local'],
            #swagger.description = 'Lista local específico cadastrado pelo usuário autenticado'
        */
        try {
            const { id } = req.params
            const destino = await Destino.findByPk(id)

            if(!destino) {
                return res.status(404).json({erro: "Nenhum destino cadastrado com o id informado."})
            }

            if (!(destino.usuario_id === req.userId)) {
                return res.status(401).json({ erro: 'Acesso não autorizado' })
            }

            res.status(200).json(destino)

        } catch (error) {
            console.log(error.message)
            res.status(500).json({ erro: 'Não foi possível listar o destino'})
        }
    }

    async atualizar(req, res) {
        /*
            #swagger.tags = ['Local'],
            #swagger.description = 'Atualiza dados do local cadastrado pelo usuário autenticado',
            #swagger.parameters['body'] = {
                in: 'body',
                description: 'Atualiza local',
                schema: {
                    nome: 'Praia da Armação',
                    descricao: 'Praia extensa com restaurantes de frutos do mar e ideal para passear de barco, nadar e fazer caminhadas pela encosta.',
                    coordenadas_geo: '-27.7442822,-48.5182281',
                    cep: '88066260',
                    cidade: 'Florianópolis',
                    estado: 'Santa Catarina',
                    pais: 'Brasil'
                }
            }
        */
        try {
            const { id } = req.params
            const destino = await Destino.findByPk(id)

            if(!destino) {
                return res.status(404).json({erro: "Nenhum destino cadastrado com o id informado."})
            }

            if (!(destino.usuario_id === req.userId)) {
                return res.status(401).json({ erro: 'Acesso não autorizado' })
            }

            await destino.update(req.body)
            await destino.save()
            res.status(200).json({ mensagem: 'Alteração efetuada com sucesso' })

        } catch (error) {
            res.status(500).json({ erro: 'Não foi possível atualizar destino' })            
        }
    }

    async excluir(req, res) {
        /*
            #swagger.tags = ['Local'],
            #swagger.description = 'Exclui local cadastrado pelo usuário autenticado'
        */
        try {
            const { id } = req.params
            const destino = await Destino.findByPk(id)

            if(!destino) {
                return res.status(404).json({erro: "Nenhum destino cadastrado com o id informado."})
            }

            if(!(destino.usuario_id === req.userId)) {
                return res.status(401).json({ erro: 'Acesso não autorizado' })
            }

            await destino.destroy()
            res.status(200).json({ mensagem: 'Local excluído com sucesso' })
            
        } catch (error) {
            res.status(500).json({ error: 'Não foi possível excluir o destino' })
        }
    }

}

module.exports = new DestinoController()
