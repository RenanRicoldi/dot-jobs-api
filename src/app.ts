// lib que utilizamos para criar o servidor
import express, { Request, Response, NextFunction } from 'express'
import 'express-async-errors'
import 'reflect-metadata'

// importa as rotas do servidor
import routes from './routes/index'
// importa a conexão com o banco de dados, de forma que ele é acessado
import './database'

// cria um servidor
const app = express()
// permite a gente desserializar o json passado pela requisição em um objeto typescript
app.use(express.json())

// usa as rotas no servidor
app.use(routes)

// segurança para quem faz a requisição
app.disable('x-powered-by')

// caso algum erro seja gerado durante uma rota ele ira chamar essa função para lidar
app.use(
    (error: Error, request: Request, response: Response, _: NextFunction) => {
        console.log(error.message)
        return response.status(400).json({
            status: 'error',
            message: error.message,
        })
    },
)


// exporta o servidor
export default app