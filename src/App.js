const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const path = require('path')
const rfs = require('rotating-file-stream')

const routes = require('./app/routes')

require('./database')

class App {
    constructor() {
        this.server = express()

        this.middlewares()
        this.routes()
    }

    middlewares() {
        this.server.set('port', process.env.PORT || 5000)

        this.server.use(express.json())

        if(process.env.PRODUCTION)
        {
            let accessLogStream = rfs.createStream('request.log', {
                interval: '1d', // rotate daily
                path: path.join(path.resolve(__dirname, '..'), 'log')
            })

            this.server.use(morgan('combined', { stream: accessLogStream }))
        }
        else
        {
            this.server.use(morgan('dev'))
        }  

        this.server.use(cors())

        // Rota para os arquivos estáticos(imagens) dos posts.
        this.server.use('/files', express.static(path.resolve(__dirname, '..', 'tmp', 'uploads')))
    }

    routes() {
        this.server.use('/',routes)
    }
}

module.exports = new App().server