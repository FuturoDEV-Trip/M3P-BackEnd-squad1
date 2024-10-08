const { Router } = require('express')
const homeRoutes = new Router()
const HomeController = require('../controllers/HomeController')
const { auth } = require('../middleware/auth')

homeRoutes.get('/totalUsuariosAtivos', HomeController.usuariosAtivos)
homeRoutes.put('/:id', auth, HomeController.logout)
homeRoutes.get('/listarDestinos', HomeController.listarDestinos)
homeRoutes.get('/totalDestinos', HomeController.totalDestinos)


module.exports = homeRoutes