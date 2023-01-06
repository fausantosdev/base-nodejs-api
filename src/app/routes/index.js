const { Router } = require('express')

const authRoutes = require('./auth')
const userRoutes = require('./user')
//1const testesRoutes = require('./testes')

const routes = Router()

routes.use('/auth',authRoutes)
routes.use('/user',userRoutes)
//routes.use('/teste',testesRoutes)

module.exports = routes