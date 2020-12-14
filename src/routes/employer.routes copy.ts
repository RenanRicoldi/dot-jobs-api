import { Router } from 'express'
import { getRepository } from 'typeorm'
import { Employer } from '../models/Employer'
import CreateEmployerService from '../services/CreateEmployerService'
import UpdateEmployerService from '../services/UpdateEmployerService'

// Cria um novo Router.
const employersRouter = Router()

employersRouter.get('/', async (request, response) => {
    const employerRepository = getRepository(Employer)

    const employers = await employerRepository.find()

    return response.json(employers)
})

// :id representa um parâmetro de rota
employersRouter.get('/:id', async (request, response) => {
    // pega o id passado na rota como parâmetro
    const employerId = request.params.id
    const employerRepository = getRepository(Employer)

    const employers = await employerRepository.findOne(employerId)

    return response.json(employers)
})

// Cria uma rota Post no path '/employers/'.
employersRouter.post('/', async (request, response) => {
    // Pega os dados do corpo da requisição
    const { cep, user_id, address, phone } = request.body

    // Cria uma nova instância do serviço de criação de usuário.
    // Serviços são utilizadas para definir as regras da aplicação, 
    // verificando os dados, modificando-os e retornando o necessário.
    const createEmployer = new CreateEmployerService()

    // Um service possui o metodo execute, que executa o nome da classe.
    // Usamos o await pois o método execute demora, 
    // então ele retornar uma Promessa de que vai retornar um usuário, 
    // então usamos o await (espera) essa promessa ser cumprida.
    const employer = await createEmployer.execute({
        cep,
        user_id,
        address,
        phone
    })

    // Retorna uma resposta com status 201 (created) e com os dados do usuário em formato JSON
    return response.status(201).json(employer)
})

employersRouter.put('/:id', async (request, response) => {
    const employerId = request.params.id
    const { cep, user_id, address, phone } = request.body

    const updateEmployer = new UpdateEmployerService()

    const employer = await updateEmployer.execute({
        employerId,
        cep,
        user_id,
        address,
        phone
    })

    return response.json(employer)

})

employersRouter.delete('/:id', async (request, response) => {
    const employerId = request.params.id

    const employerRepository = getRepository(Employer)

    const employer = await employerRepository.findOne(employerId)
    
    if(!employer) {
        throw new Error('Employer not found with the provided id')
    }

    await employerRepository.remove(employer)

    return response.json({ status: 'success', message: 'User deleted' })
})

export default employersRouter