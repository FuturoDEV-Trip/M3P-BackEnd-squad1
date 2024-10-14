const express = require('express')
const cors = require('cors')
const { connection } = require('./database/connection')
const routes = require('./routes/routes')

const PORT_API = process.env.PORT_API

class Server {
    constructor(server = express()) {
        this.middlewares(server)
        this.database()
        server.use(routes)
        this.initializeServer(server)
    }

    async middlewares(app) {
        app.use((req, res, next) => {
            res.setHeader("Content-Security-Policy", "default-src 'self'; script-src 'self' https://translate.yandex.net https://yastatic.net;");
            next();
        });

        app.use(cors({
            origin: 'https://m3p-frontend-squad1-nxcl.onrender.com',
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
            allowedHeaders: ['Content-Type', 'Authorization'],
        }))
        
        app.use(express.json())
    }

    async database() {
        try {
            await connection.authenticate()
            console.log('Conexão com o banco de dados PostgreSQL foi estabelecida com sucesso.')
        } catch (error) {
            console.error('Não foi possível conectar o banco de dados', error)
            throw error
        }
    }

    async initializeServer(app) {
        app.listen(PORT_API, () => console.log(`Servidor executando na porta ${PORT_API}`))
    }
}

module.exports = { Server }
