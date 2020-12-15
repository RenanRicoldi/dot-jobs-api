import { getRepository } from 'typeorm'

import { Interest } from '../models/Interest'

interface Request {
    interestId: string
    service_id: string
    freelancer_id: string
    status: string
}

class UpdateInterestService {
    public async execute({ interestId, service_id, freelancer_id, status }: Request): Promise<Interest> {
        const interestsRepository = getRepository(Interest)

        const interest = await interestsRepository.findOne(interestId)

        if(!interest) {
            throw new Error('Interest not found with the provided id')
        }

        // if(service_id && freelancer_id) {
        //     const checkInterestExists = await interestsRepository.findOne({
        //         where: { service_id, freelancer_id },
        //     })
        //     if (checkInterestExists) {
        //         throw new Error('Freelancer already interested in service')
        //     }
        //     interest.service_id = service_id
        //     interest.freelancer_id = freelancer_id
        // }
        
        if(status) {
            interest.status = status
        }

        await interestsRepository.save(interest)

        return interest
    }
}

export default UpdateInterestService