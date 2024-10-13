const Destino = require("../models/Destino");
const Usuario = require("../models/Usuario");

class DestinoController {
  async cadastrar(req, res) {
    /*
        #swagger.path = '/',
        #swagger.method = 'post', 
        #swagger.tags = ['Destino'],
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
      const {
        usuario_id,
        nome,
        descricao,
        coordenadas_geo,
        cep,
        cidade,
        estado,
        pais,
      } = req.body;

      if (
        !usuario_id ||
        !nome ||
        !descricao ||
        !coordenadas_geo ||
        !cep ||
        !cidade ||
        !estado ||
        !pais
      ) {
        return res
          .status(400)
          .json({ erro: "Todos os campos são obrigatórios." });
      }

      const coordenadasExistente = await Destino.findOne({
        where: {
          usuario_id,
          coordenadas_geo,
        },
      });

      if (coordenadasExistente) {
        return res.status(400).json({
          mensagem: "Coordenadas já foram cadastradas para este usuário.",
        });
      }

      const destino = await Destino.create({
        usuario_id,
        nome,
        descricao,
        coordenadas_geo,
        cep,
        cidade,
        estado,
        pais,
      });

      res.status(201).json({ message: "Destino criado com sucesso", destino });
    } catch (error) {
      console.error("Erro ao cadastrar destino:", error);
      res
        .status(500)
        .json({ erro: "Não foi possível efetuar o cadastro do destino." });
    }
  }

  async listarDestinosUsuario(req, res) {
    /*
        #swagger.path = '/listarDestinosUsuario',
        #swagger.method = 'get',
        #swagger.tags = ['Destino'],
        #swagger.description = 'Lista todos os locais cadastrados pelo usuário autenticado'
    */
    try {
      const usuario_id = req.userId;
      req.body.usuario_id = usuario_id;

      const { count, rows } = await Destino.findAndCountAll({
        where: {
          usuario_id: usuario_id,
        },
      });

      res.status(200).json({ totalDestinos: count, destinos: rows });
    } catch (error) {
      res.status(500).json({ erro: "Não foi possível listar os destinos." });
    }
  }

  async listarUm(req, res) {
    /*
        #swagger.path = '/:id',
        #swagger.method = 'get',
        #swagger.tags = ['Destino'],
        #swagger.description = 'Lista local específico cadastrado pelo usuário autenticado'
    */
    try {
      const { id } = req.params;
      const destino = await Destino.findByPk(id);

      if (!destino) {
        return res
          .status(404)
          .json({ erro: "Nenhum destino cadastrado com o id informado." });
      }

      if (!(destino.usuario_id === req.userId)) {
        return res.status(401).json({ erro: "Acesso não autorizado." });
      }

      res.status(200).json(destino);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ erro: "Não foi possível listar o destino." });
    }
  }

  async atualizar(req, res) {
    /*
        #swagger.path = '/:id',
        #swagger.method = 'put',
        #swagger.tags = ['Destino'],
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
      const { id } = req.params;
      const destino = await Destino.findByPk(id);

      if (!destino) {
        return res
          .status(404)
          .json({ erro: "Nenhum destino cadastrado com o id informado." });
      }

      if (!(destino.usuario_id === req.userId)) {
        return res.status(401).json({ erro: "Acesso não autorizado." });
      }

      await destino.update(req.body);
      await destino.save();

      res.status(200).json({ mensagem: "Alterações efetuadas com sucesso." });
    } catch (error) {
      res.status(500).json({ erro: "Não foi possível atualizar o destino." });
    }
  }

  async excluir(req, res) {
    /*
            #swagger.path = '/:id',
            #swagger.method = 'delete',
            #swagger.tags = ['Destino'],
            #swagger.description = 'Exclui local cadastrado pelo usuário autenticado'
        */
    try {
      const { id } = req.params;
      const destino = await Destino.findByPk(id);

      if (!destino) {
        return res
          .status(404)
          .json({ erro: "Nenhum destino cadastrado com o id informado." });
      }

      if (!(destino.usuario_id === req.userId)) {
        return res.status(401).json({ erro: "Acesso não autorizado." });
      }

      await destino.destroy();
      res.status(200).json({ mensagem: "Local excluído com sucesso." });
    } catch (error) {
      res.status(500).json({
        error:
          "Não foi possível excluir o destino, tente novamente mais tarde.",
      });
    }
  }
}

module.exports = new DestinoController();
