const Yup = require('yup')

const AuthService = require('../services/AuthService')
//const RecoverPasswordService = require('../services/auth/RecoverPasswordService')

class AuthController {
    async login(req, res) {
        const schema = Yup.object().shape({
            email: Yup.string().email().required(),
            password: Yup.string().required()
        })

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({
                status: false,
                data: null,
                message: 'Validation fails'
            })
        }

        try {
            const result = await AuthService.login(req.body)

            return res.json({
                status: true,
                data: result,
                message: ''
            })
        } catch (error) {
            return res.status(error.code || 500).json({
                status: true,
                data: null,
                message: error.message
            })
        }
        
    }

    async tokenRefresh (req, res) {
        const token = req.headers.authorization.split(' ')[1]

        try {
            const result = await AuthService.refreshToken(token)

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

    logout(req, res) {
        try {
            delete req.user

            return res.status(200).json({
                status: true,
            })
        } catch (error) {
            return res.status(error.code || 500).json({
                status: false,
                data: null,
                message: error.message,
            })
        }
    }

    async recoverPassword (req, res) {
        const schema = Yup.object().shape({
            email: Yup.string().email().required()
        })

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({
                status: false,
                data: null,
                message: 'Validation fails'
            })
        }

        const { email } = req.body

        try {
            const result = await AuthService.recoveryPassword(email)

            return res.status(200).json({
                status: true,
                data: result,
                message: '',
            })
        } catch (error) {
            return res.status(error.code || 500).json({
                status: false,
                data: null,
                message: error.message,
            })
        }
    }
}

module.exports = new AuthController()