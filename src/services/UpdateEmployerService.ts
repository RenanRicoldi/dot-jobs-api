import { getRepository } from 'typeorm'

import { Employer } from '../models/Employer'

interface Request {
    employerId: string
    cep?: string
    user_id?: string
    address?: string
    phone?: string
}

class UpdateEmployerService {
    public async execute({ employerId, cep, user_id, address, phone }: Request): Promise<Employer> {
        const employersRepository = getRepository(Employer)

        const employer = await employersRepository.findOne(employerId)

        if(!employer) {
            throw new Error('Employer not found with the provided id')
        }

        if(phone) {
            const checkEmployerExists = await employersRepository.findOne({
                where: { phone },
            })
            if (checkEmployerExists) {
                throw new Error('Phone already in use')
            }
            employer.phone = phone
        }
        
        if(cep) {
            employer.cep = cep
        }
        if(user_id) {
            //Checar se usuário já existe?
            //Não dar update em user_id?
            employer.user_id = user_id
        }
        if(address) {
            employer.address = address
        }
        if(phone) {
            employer.phone = phone
        }

        await employersRepository.save(employer)

        return employer
    }
}

export default UpdateEmployerService