module.exports = {
    development: {
        dialect: 'postgres',
        host: 'localhost',
        database: 'node-api_db',
        username: 'postgres',
        password: '',
        define: {
            timestamps: true,
            underscored: true
        }
    },
    production: {
        dialect: process.env.DIALECT,
        host: process.env.HOST,
        database: process.env.DATABASE,
        username: process.env.USERNAME,
        password: process.env.PASSWORD,
        define: {
            timestamps: true,
            underscored: true
        }
    }
  }