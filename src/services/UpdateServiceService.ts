import { getRepository } from 'typeorm'

import { Service } from '../models/Service'

interface Request {
    serviceId: string
    description: string
    price: number
    localization: string
    conclusion_date: Date
}

class UpdateServiceService {
    public async execute({ serviceId, description, price, localization, conclusion_date }: Request): Promise<Service> {
        const servicesRepository = getRepository(Service)

        const service = await servicesRepository.findOne(serviceId)

        if(!service) {
            throw new Error('Service not found with the provided id')
        }
        
        if(description) {
            service.description = description
        }
        if(price) {
            service.price = price
        }
        if(localization) {
            service.localization = localization
        }
        if(conclusion_date) {
            service.conclusion_date = conclusion_date
        }

        await servicesRepository.save(service)

        return service
    }
}

export default UpdateServiceService