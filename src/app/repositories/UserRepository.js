const User = require('../models/User')

/**
 * Acesso ao banco de dados
 */

class UserRepository {
    async create ({ name, username, email, password }) {  
        const user = await User.create({
            name,
            username,
            email,
            password
        })

        return user
    }

    async read (where) {
        if (where) {
            const user = await User.findOne({ where })

            return user
        } else {
            const users = await User.findAll()

            return users
        }
    }

    async update (data, where) {
        const user = await User.findOne({ where })

        if (!user) return false

        const updated = await user.update(data)

        return updated
    }

    async delete (where) {
        const user = await User.findOne({ where })

        if (!user) return false // Retorna false caso não exista

        const deleted = user.destroy()

        return deleted
    }
}

module.exports = new UserRepository()