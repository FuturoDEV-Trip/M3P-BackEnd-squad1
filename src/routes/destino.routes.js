const { Router } = require('express')
const DestinoController = require('../controllers/DestinoController')
const destinoRoutes = new Router()
const { auth } = require('../middleware/auth')

destinoRoutes.post('/', auth, DestinoController.cadastrar)
destinoRoutes.get('/', DestinoController.listarTodos)
destinoRoutes.get('/destinos_usuario/:id', auth, DestinoController.listarDestinosUsuario)
destinoRoutes.get('/:id', auth, DestinoController.listarUm)
destinoRoutes.put('/:id', auth, DestinoController.atualizar)
destinoRoutes.delete('/:id', auth, DestinoController.excluir)

module.exports = destinoRoutes