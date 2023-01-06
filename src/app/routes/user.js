const { Router } = require('express')

const UserController = require('../controllers/UserController')

const { checkUserOrIsAdmin } = require('../middlewares/auth')

const routes = new Router()

routes.post('/',UserController.store)

routes.get('/:id?', checkUserOrIsAdmin, UserController.index)
routes.put('/:id', checkUserOrIsAdmin, UserController.update)
routes.delete('/:id', checkUserOrIsAdmin, UserController.remove)

module.exports = routes