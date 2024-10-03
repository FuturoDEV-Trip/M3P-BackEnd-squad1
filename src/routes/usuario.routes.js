const { Router } = require('express')
const UsuarioController = require('../controllers/UsuarioController')
const usuarioRoutes = new Router()
const { auth } = require('../middleware/auth')

usuarioRoutes.post('/', UsuarioController.cadastrar)
usuarioRoutes.get('/:id', auth, UsuarioController.listar)
usuarioRoutes.put('/:id', auth, UsuarioController.atualizar)
usuarioRoutes.delete('/:id', auth, UsuarioController.excluir)

module.exports = usuarioRoutes