const Yup = require('yup')

const UserService = require('../services/UserService')

class UserController {
    async index(req, res) {
        const { id } = req.params

        try {
            const result = await UserService.readById(id)

            return res.status(200).json({
                status: true,
                data: result,
                message: ''
            })      
        } catch (error) {
            return res.status(error.code || 500).json({
                status: false,
                data: null,
                message: error.message
            })
        }
    }

    async store(req, res){   
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            username: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().min(8).max(100).required()
        })

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({ error: 'Erro de validação' })
        }

        try {
            //const result = await CreateUserService.execute(req.body)
            const result = await UserService.create(req.body)

            return res.status(201).json({
                status: true,
                data: result,
                message: 'Usuário criado com sucesso'
            })

        } catch (error) {
            return res.status(error.code || 500).json({
                status: false,
                data: null,
                message: error.message
            })
        }
    }

    async update(req, res){
        const id = req.params.id
        
        try {
            const result = await UserService.update(req.body, { id })

            return res.status(200).json({
                status: true,
                data: result,
                message: 'Usuário atualizado com sucesso'
            })

        } catch (error) {
            return res.status(error.code || 500).json({
                status: false,
                data: null,
                message: error.message
            })
        }
    }

    async remove(req, res){
        const id = req.params.id

        try {
            const result = await UserService.delete({ id })
            
            return res.status(200).json({
                status: true,
                data: result,
                message: ''
            })

        } catch (error) {
            return res.status(error.code || 500).json({
                status: false,
                data: null,
                message: error.message
            })
        } 
    }
}

module.exports = new UserController()