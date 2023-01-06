const CustomException = require('../../utils/CustomException')
const UserRepository = require('../repositories/UserRepository')
const User = require('../models/User')

/**
 * Regras de negócio
 */

class UserService {
    async create ({ name, username, email, password }) {

        const usernameExixts = await UserRepository.read({ username })

        if (usernameExixts) throw new CustomException('Username já está sendo utilizado')

        const emailExixts = await UserRepository.read({ email })

        if (emailExixts) throw new CustomException('E-mail já está sendo utilizado')

        const result = await UserRepository.create({
            name,
            username,
            email,
            password
        })

        return result
    }

    async read (where) {
        const result = await UserRepository.read(where)// <- { name: name }

        if ( !result ) throw new CustomException('Usuário não encontrado')

        return result
    }

    async readById (id) {
        if ( !id ) {
            const result = await UserRepository.read()

            return result
        }

        const result = await UserRepository.read({ id })

        if ( !result ) throw new CustomException('Usuário não encontrado')

        return result
    }

    async update (data, where) {
        const result = await UserRepository.update(data, where)// -> { name: Maria }, { id: 332 }

        if (!result) throw new CustomException('User not found') 

        return result
    }

    async delete (where) {
        const result = await UserRepository.delete(where)// -> { name: Maria } or { id: 21 }
        
        if (!result) throw new CustomException('User not found') 

        return result
    }
}

module.exports = new UserService()