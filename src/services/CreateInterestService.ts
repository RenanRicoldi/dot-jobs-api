import { getRepository } from 'typeorm'

import { Interest } from '../models/Interest'

interface Request {
    service_id: string
    freelancer_id: string
    status: string
}

class CreateInterestService {
    public async execute({ service_id, freelancer_id, status }: Request): Promise<Interest> {
        const interestsRepository = getRepository(Interest)

        const checkInterestExists = await interestsRepository.findOne({
            where: { service_id, freelancer_id },
        })
        
        if (checkInterestExists) {
            throw new Error('Freelancer already interested in service')
        }

        const interest = interestsRepository.create({
            service_id,
            freelancer_id,
            status
        })

        await interestsRepository.save(interest)

        return interest
    }
}

export default CreateInterestService