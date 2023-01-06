const { Router } = require('express')

const { verifyToken } = require('../middlewares/auth')

const testeController = require('../controllers/TesteController')

const routes = new Router()

routes.use(verifyToken)

routes.get('/', testeController.index)

module.exports = routes