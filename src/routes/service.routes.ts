import { Router } from 'express'
import { getRepository } from 'typeorm'
import { Service } from '../models/Service'
import CreateServiceService from '../services/CreateServiceService'
import UpdateServiceService from '../services/UpdateServiceService'

const servicesRouter = Router()

servicesRouter.get('/', async (request, response) => {
    const serviceRepository = getRepository(Service)

    const services = await serviceRepository.find()

    return response.json(services)
})

servicesRouter.get('/:id', async (request, response) => {
    const serviceId = request.params.id
    const serviceRepository = getRepository(Service)

    const services = await serviceRepository.findOne(serviceId)

    return response.json(services)
})

servicesRouter.post('/', async (request, response) => {
    const { employer_id, description, price, localization, conclusion_date } = request.body

    const createService = new CreateServiceService()

    const service = await createService.execute({
        employer_id,
        description,
        price,
        localization,
        conclusion_date
    })

    return response.status(201).json(service)
})

servicesRouter.put('/:id', async (request, response) => {
    const serviceId = request.params.id
    const { description, price, localization, conclusion_date } = request.body

    const updateService = new UpdateServiceService()

    const service = await updateService.execute({
        serviceId,
        description,
        price,
        localization,
        conclusion_date
    })

    return response.json(service)

})

servicesRouter.delete('/:id', async (request, response) => {
    const serviceId = request.params.id

    const serviceRepository = getRepository(Service)

    const service = await serviceRepository.findOne(serviceId)
    
    if(!service) {
        throw new Error('Service not found with the provided id')
    }

    await serviceRepository.remove(service)

    return response.json({ status: 'success', message: 'Service deleted' })
})

export default servicesRouter