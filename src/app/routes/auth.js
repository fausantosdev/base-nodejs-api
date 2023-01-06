const { Router } = require('express')

const UserController = require('../controllers/UserController')
const AuthController = require('../controllers/AuthController')

const { verifyToken } = require('../middlewares/auth')

const routes = new Router()

routes.post('/register', UserController.store)
routes.post('/login', AuthController.login)
routes.post('/forget-password', AuthController.login)

routes.post('/logout', verifyToken, AuthController.logout)
routes.post('/token-refresh', verifyToken, AuthController.tokenRefresh)
routes.post('/recover-password', verifyToken, AuthController.recoverPassword)

module.exports = routes