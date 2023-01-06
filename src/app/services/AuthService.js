const { sign, verify } = require('jsonwebtoken')

const authConfig = require('../../config/auth')

const CustomException = require('../../utils/CustomException')

const User = require('../models/User')

class AuthService {
    async login ({ email, password }) {
                    
        const user = await User.findOne({ where: { email } })

        if(!user) throw new CustomException('Email não cadastrado no sistema')

        if(!(await user.checkPassword(password))) throw new CustomException('Senha incorreta')

        const { id, username, is_admin } = user

        const token = this.generateToken({ user: { id, username, email, is_admin } })

        return {
            user: {
                id, username, email, is_admin
            },
            token
        }
    }

    async refreshToken (token) {
        
        const decoded = this.decodeToken(token)

        const { user } = decoded

        const userExists = await User.findByPk(user.id)

        if (!userExists) throw new CustomException('Token inválido [rt]')

        const { id, username, email, is_admin } = userExists

        const newToken = this.generateToken({ user: { id, username, email, is_admin } })

        return {
            user: {
                id, username, email, is_admin
            },
            newToken
        }
    }

    async recoveryPassword(email) {
        return {
            email
        }
    }

    generateToken (payload) {
        return sign(payload, authConfig.secret, { expiresIn: authConfig.expiresIn })
    }

    decodeToken (token) {
        return verify(token, authConfig.secret)
    }
}

module.exports = new AuthService()

