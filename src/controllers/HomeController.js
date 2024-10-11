const Destino = require("../models/Destino");
const Usuario = require("../models/Usuario");

class HomeController {
  async usuariosAtivos(req, res) {
    /*
        #swagger.path = '/totalUsuariosAtivos',
        #swagger.method = 'get',
        #swagger.tags = ['Home'],
        #swagger.description= 'Retorna o número de usuários que estão ativos (status = true).'
    */
    try {
      
      const { count, rows } = await Usuario.findAndCountAll({
        where: { status: true },
        attributes: ['id', 'nome', 'email']
      })
    
      if (!count) {
        return res.status(404).json({ erro: "Nenhum usuário ativo na plataforma.", usuariosAtivos: count })
      }
    
      return res.status(200).json({ totalUsuariosAtivos: count, usuarios: rows})
    } catch (error) {
      return res.status(500).json({ error: "Erro ao contar usuários ativos.", error })
    }
  }

  async logout(req, res) {
     /*
        #swagger.path = '/:id',
        #swagger.method = 'put',    
        #swagger.tags = ['Home'],
        #swagger.description= 'Desativa o status de um usuário ao realizar o logout.',
    */
    try {
      const { id } = req.params;
      const usuario = await Usuario.findByPk(id)

      if (!usuario) {
        return res.status(404).json({ erro: "Nenhum usuário cadastrado com o id informado." })
      }

      if (!(usuario.id === req.userId)) {
        return res.status(401).json({ erro: "Acesso não autorizado." })
      }

      usuario.status = false
      await usuario.save()

      res.status(200).json({ message: "Logout realizado com sucesso." })
    } catch (error) {
      res.status(500).json({ error: "Erro ao realizar o logout." })
    }
  }

  async totalUsuarios(req, res) {
     /*
        #swagger.path = '/totalUsuarios',
        #swagger.method = 'get',
        #swagger.tags = ['Home'],
        #swagger.description= 'Retorna a contagem total de usuários no sistema.'
    */
    try {
      const usuarios = await Usuario.findAndCountAll();

      res.status(200).json(usuarios);
    } catch (error) {
      res.status(500).json({ erro: "Erro ao contar todos os usuários." });
    }
  }
  async totalDestinos(req, res) {
     /*
        #swagger.path = '/listarDestinos',
        #swagger.method = 'get',
        #swagger.tags = ['Home'],
        #swagger.description= 'Retorna a contagem total de destinos no sistema.'
    */
    try {
      const { id } = req.params;
      const destinos = await Destino.findAndCountAll(id);

      res.status(200).json(destinos);
    } catch (error) {
      res.status(500).json({ erro: "Erro ao contar todos os destinos." });
    }
  }

  async listarDestinos(req, res) {
    /*
        #swagger.path = '/totalDestinos',
        #swagger.method = 'get',
        #swagger.tags = ['Home'],
        #swagger.description= 'Retorna uma lista de todos os destinos disponíveis.'
    */
    try {
      const destinos = await Destino.findAll();

      if (destinos.length === 0) {
        return res.status(404).json({ erro: "Nenhum destino cadastrado." });
      }

      res.status(200).json(destinos);
    } catch (error) {
      res
        .status(500)
        .json({ erro: "Não foi possível listar todos os destinos" });
    }
  }
}

module.exports = new HomeController();
