import { Router } from 'express'
import { getRepository } from 'typeorm'
import { Freelancer } from '../models/Freelancer'
import CreateFreelancerService from '../services/CreateFreelancerService'
import UpdateFreelancerService from '../services/UpdateFreelancerService'

// Cria um novo Router.
const freelancersRouter = Router()

freelancersRouter.get('/', async (request, response) => {
    const freelancerRepository = getRepository(Freelancer)

    const freelancers = await freelancerRepository.find()

    return response.json(freelancers)
})

// :id representa um parâmetro de rota
freelancersRouter.get('/:id', async (request, response) => {
    // pega o id passado na rota como parâmetro
    const freelancerId = request.params.id
    const freelancerRepository = getRepository(Freelancer)

    const freelancers = await freelancerRepository.findOne(freelancerId)

    return response.json(freelancers)
})

// Cria uma rota Post no path '/freelancers/'.
freelancersRouter.post('/', async (request, response) => {
    // Pega os dados do corpo da requisição
    const { cep, user_id, address, phone, description, rg, cpf, rg_picture, cpf_picture } = request.body

    // Cria uma nova instância do serviço de criação de freelancer.
    // Serviços são utilizadas para definir as regras da aplicação, 
    // verificando os dados, modificando-os e retornando o necessário.
    const createFreelancer = new CreateFreelancerService()

    // Um service possui o metodo execute, que executa o nome da classe.
    // Usamos o await pois o método execute demora, 
    // então ele retornar uma Promessa de que vai retornar um freelancer, 
    // então usamos o await (espera) essa promessa ser cumprida.
    const freelancer = await createFreelancer.execute({
        cep,
        user_id,
        address,
        phone,
        description,
        rg,
        cpf,
        rg_picture,
        cpf_picture
    })

    // Retorna uma resposta com status 201 (created) e com os dados do freelancer em formato JSON
    return response.status(201).json(freelancer)
})

freelancersRouter.put('/:id', async (request, response) => {
    const freelancerId = request.params.id
    const { cep, user_id, address, phone, description, rg, cpf, rg_picture, cpf_picture } = request.body

    const updateFreelancer = new UpdateFreelancerService()

    const freelancer = await updateFreelancer.execute({
        freelancerId,
        cep,
        user_id,
        address,
        phone,
        description,
        rg,
        cpf,
        rg_picture,
        cpf_picture
    })

    return response.json(freelancer)

})

freelancersRouter.delete('/:id', async (request, response) => {
    const freelancerId = request.params.id

    const freelancerRepository = getRepository(Freelancer)

    const freelancer = await freelancerRepository.findOne(freelancerId)
    
    if(!freelancer) {
        throw new Error('Freelancer not found with the provided id')
    }

    await freelancerRepository.remove(freelancer)

    return response.json({ status: 'success', message: 'Freelancer deleted' })
})

export default freelancersRouter