import { getRepository } from 'typeorm'
import { hash } from 'bcryptjs'

import { Freelancer } from '../models/Freelancer'

interface Request {
    cep: string
    user_id: string
    address: string
    phone: string
    description: string
    rg: string
    cpf: string
    rg_picture: string
    cpf_picture: string
}

class CreateFreelancerService {
    public async execute({ cep, user_id, address, phone, description, rg, cpf, rg_picture, cpf_picture }: Request): Promise<Freelancer> {
        const freelancersRepository = getRepository(Freelancer)

        const checkUserExists = await freelancersRepository.findOne({
            where: { user_id },
        })
        
        if (checkUserExists) {
            throw new Error('User already exists')
        }

        const freelancer = freelancersRepository.create({
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

        await freelancersRepository.save(freelancer)

        return freelancer
    }
}

export default CreateFreelancerService