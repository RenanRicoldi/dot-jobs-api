import { getRepository } from 'typeorm'

import { Freelancer } from '../models/Freelancer'

// os ? dizem que os atributos são opcionais
interface Request {
    freelancerId: string
    cep?: string
    user_id?: string
    address?: string
    phone?: string
    description?: string
    rg?: string
    cpf?: string
    rg_picture?: string
    cpf_picture?: string
}

class UpdateFreelancerService {
    public async execute({ freelancerId, cep, user_id, address, phone, description, rg, cpf, rg_picture, cpf_picture }: Request): Promise<Freelancer> {
        const freelancersRepository = getRepository(Freelancer)

        const freelancer = await freelancersRepository.findOne(freelancerId)

        if(!freelancer) {
            throw new Error('Freelancer not found with the provided id')
        }

        if(rg) {
            const checkFreelancerExists = await freelancersRepository.findOne({
                where: { rg },
            })
            if (checkFreelancerExists) {
                throw new Error('RG already in use')
            }
            freelancer.rg = rg
        }
        if(cpf) {
            const checkFreelancerExists = await freelancersRepository.findOne({
                where: { cpf },
            })
            if (checkFreelancerExists) {
                throw new Error('RG already in use')
            }
            freelancer.cpf = cpf
        }

        if(cep) {
            freelancer.cep = cep
        }
        if(user_id) {
            //Checar se usuário já existe?
            //Não dar update em user_id?
            freelancer.user_id = user_id
        }
        if(address) {
            freelancer.address = address
        }
        if(phone) {
            freelancer.phone = phone
        }
        if(description) {
            freelancer.description = description
        }
        if(rg_picture) {
            freelancer.rg_picture = rg_picture
        }
        if(cpf_picture) {
            freelancer.cpf_picture = cpf_picture
        }

        await freelancersRepository.save(freelancer)

        return freelancer
    }
}

export default UpdateFreelancerService