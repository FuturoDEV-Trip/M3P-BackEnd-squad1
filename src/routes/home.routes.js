const { Router } = require('express')
const homeRoutes = new Router()
const HomeController = require('../controllers/HomeController')

homeRoutes.get('/usuariosAtivos', HomeController.usuariosAtivos)
homeRoutes.put('/:id', HomeController.logout)
homeRoutes.get('/totalDestinos', HomeController.totalDestinos)


module.exports = homeRoutes