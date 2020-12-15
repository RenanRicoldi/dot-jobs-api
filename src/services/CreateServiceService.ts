import { getRepository } from 'typeorm'

import { Service } from '../models/Service'

interface Request {
    employer_id: string
    description: string
    price: number
    localization: string
    conclusion_date: Date
}

class CreateServiceService {
    public async execute({ employer_id, description, price, localization, conclusion_date }: Request): Promise<Service> {
        const servicesRepository = getRepository(Service)

        const service = servicesRepository.create({
            employer_id,
            description,
            price,
            localization,
            conclusion_date
        })

        await servicesRepository.save(service)

        return service
    }
}

export default CreateServiceService