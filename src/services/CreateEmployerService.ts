import { getRepository } from 'typeorm'

import { Employer } from '../models/Employer'

interface Request {
    cep: string
    user_id: string
    address: string
    phone: string
}

class CreateEmployerService {
    public async execute({ cep, user_id, address, phone }: Request): Promise<Employer> {
        const employersRepository = getRepository(Employer)

        const checkEmployerExists = await employersRepository.findOne({
            where: { user_id },
        })
        
        if (checkEmployerExists) {
            throw new Error('User already exists')
        }

        const employer = employersRepository.create({
            cep,
            user_id,
            address,
            phone
        })

        await employersRepository.save(employer)

        return employer
    }
}

export default CreateEmployerService