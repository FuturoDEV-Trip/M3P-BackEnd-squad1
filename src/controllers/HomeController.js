const Destino = require("../models/Destino");
const Usuario = require("../models/Usuario");

class HomeController {
  async usuariosAtivos(req, res) {
    /*
        #swagger.path = '/usuariosAtivos',
        #swagger.method = 'get',
        #swagger.tags = ['Home'],
        #swagger.description= 'Retorna o número de usuários que estão ativos (status = true).'
    */
    try {
      const { count } = await Usuario.findAndCountAll({
        where: { status: true },
      });

      return res.status(200).json({ usuariosAtivos: count });
    } catch (error) {
      return res.status(500).json({
        error:
          "Erro ao contar usuários ativos na plataforma, tente novamente mais tarde.",
        error,
      });
    }
  }

  async totalDestinos(req, res) {
    /*
        #swagger.path = '/totalDestinos',
        #swagger.method = 'get',
        #swagger.tags = ['Home'],
        #swagger.description= 'Retorna a contagem total de destinos no sistema e a lista de destinos cadastrados na plataforma.'
    */
    try {
      const { count } = await Destino.findAndCountAll();

      return res.status(200).json({ totalDestinos: count });
    } catch (error) {
      return res.status(500).json({
        error:
          "Erro ao contar destinos cadastrados na plataforma, tente novamente mais tarde.",
        error,
      });
    }
  }

  async logout(req, res) {
    /*
        #swagger.path = '/:id',
        #swagger.method = 'put',    
        #swagger.tags = ['Home'],
        #swagger.description= 'Desativa o status de um usuário ao realizar o logout (status = false).',
    */
    try {
      const { id } = req.params;
      const usuario = await Usuario.findByPk(id);

      if (!usuario) {
        return res.status(404).json({
          erro: "Nenhum usuário cadastrado na plataforma com o id informado.",
        });
      }

      usuario.status = false;
      await usuario.save();

      res.status(200).json({ message: "Logout realizado com sucesso." });
    } catch (error) {
      res.status(500).json({
        error: "Erro ao realizar o logout, tente novamente mais tarde.",
      });
    }
  }
}

module.exports = new HomeController();
