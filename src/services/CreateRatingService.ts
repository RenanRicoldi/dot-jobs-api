import { getRepository } from 'typeorm'

import { Rating } from '../models/Rating'

interface Request {
    cep: string
    user_from_id: string
    user_to_id: string
    rate: number
    comment: string
    created_at: Date
}

class CreateRatingService {
    public async execute({ cep, user_from_id, user_to_id, rate, comment, created_at }: Request): Promise<Rating> {
        const ratingsRepository = getRepository(Rating)

        const rating = ratingsRepository.create({
            cep,
            user_from_id,
            user_to_id,
            rate,
            comment,
            created_at
        })

        await ratingsRepository.save(rating)

        return rating
    }
}

export default CreateRatingService