import { compare } from 'bcryptjs'
import { Router } from 'express'
import { getRepository } from 'typeorm'
import { User } from '../models/User'
import CreateUserService from '../services/CreateUserService'
import UpdateUserService from '../services/UpdateUserService'

// Cria um novo Router.
const usersRouter = Router()

usersRouter.get('/', async (request, response) => {
    const userRepository = getRepository(User)

    const users = await userRepository.find()

    return response.json(users)
})

// :id representa um parâmetro de rota
usersRouter.get('/:id', async (request, response) => {
    // pega o id passado na rota como parâmetro
    const userId = request.params.id
    const userRepository = getRepository(User)

    const users = await userRepository.findOne(userId)

    return response.json(users)
})

// Cria uma rota Post no path '/users/'.
usersRouter.post('/', async (request, response) => {
    // Pega os dados do corpo da requisição
    const { email, name, password, picture, status } = request.body

    // Cria uma nova instância do serviço de criação de usuário.
    // Serviços são utilizadas para definir as regras da aplicação, 
    // verificando os dados, modificando-os e retornando o necessário.
    const createUser = new CreateUserService()

    // Um service possui o metodo execute, que executa o nome da classe.
    // Usamos o await pois o método execute demora, 
    // então ele retornar uma Promessa de que vai retornar um usuário, 
    // então usamos o await (espera) essa promessa ser cumprida.
    const user = await createUser.execute({
        email,
        name,
        password,
        picture,
        status
    })

    // Retorna uma resposta com status 201 (created) e com os dados do usuário em formato JSON
    return response.status(201).json(user)
})

usersRouter.put('/:id', async (request, response) => {
    const userId = request.params.id
    const { email, name, password, picture, status } = request.body

    const updateUser = new UpdateUserService()

    const user = await updateUser.execute({
        userId,
        email,
        name,
        password,
        picture,
        status
    })

    return response.json(user)

})

usersRouter.delete('/:id', async (request, response) => {
    const userId = request.params.id

    const userRepository = getRepository(User)

    const user = await userRepository.findOne(userId)
    
    if(!user) {
        throw new Error('User not found with the provided id')
    }

    await userRepository.remove(user)

    return response.json({ status: 'success', message: 'User deleted' })
})


usersRouter.post('/login', async (request, response) => {
    const userRepository = getRepository(User)

    const {email, password} = request.body

    const user = await userRepository.findOne({
        where: { email } 
    })
    
    if(!user) {
        throw new Error('User not found with the provided email')
    }

    if(await compare(password,user.password)){
        return response.status(200).json(user)
    }   

    return response.sendStatus(401)
})

export default usersRouter