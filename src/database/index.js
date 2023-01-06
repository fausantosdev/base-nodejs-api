const Sequelize = require('sequelize')

const dbConfig = require('../config/database')

const User = require('../app/models/User')

class Database {
  constructor() {
    this.init()
  }

  async init() {
    const sequelize = new Sequelize(dbConfig.development)

    User.init(sequelize)

    try {
      await sequelize.authenticate();
      console.log('~ connection has been established successfully')
    } catch (error) {
      console.error('~ unable to connect to the database:', error)
    }
  }
}

module.exports = new Database()
