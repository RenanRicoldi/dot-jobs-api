// importa um router, que irá criar rotas no nosso servidor
import { Router } from 'express'
import employersRouter from './employer.routes'
import freelancersRouter from './freelancer.route'
import interestsRouter from './interest.routes'
import messagesRouter from './message.routes'
import servicesRouter from './service.routes'

// importa um outro router para ser usado
import usersRouter from './users.routes'

// criar o router
const routes = Router()

// diz que o router de usuário será acessado pelo caminho /users
routes.use('/users', usersRouter)

routes.use('/employers', employersRouter)

routes.use('/freelancers', freelancersRouter)

routes.use('/services', servicesRouter)

routes.use('/interests', interestsRouter)

routes.use('/messages', messagesRouter)

// cria uma rota acessível por GET
routes.get('/', (request, response) => {
    // retorna uma resposta JSON
    return response.json({ status: 'Server listening' })
})

// exporta o router
export default routes