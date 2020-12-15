import { getRepository } from 'typeorm'

import { Rating } from '../models/Rating'

interface Request {
    ratingId: string
    cep: string
    rate: number
    comment: string
    created_at: Date
}

class UpdateRatingService {
    public async execute({ ratingId, cep, rate, comment, created_at }: Request): Promise<Rating> {
        const ratingsRepository = getRepository(Rating)

        const rating = await ratingsRepository.findOne(ratingId)

        if(!rating) {
            throw new Error('Rating not found with the provided id')
        }
        
        if(cep) {
            rating.cep = cep
        }
        if(rate) {
            rating.rate = rate
        }
        if(comment) {
            rating.comment = comment
        }
        if(created_at) {
            rating.created_at = created_at
        }

        await ratingsRepository.save(rating)

        return rating
    }
}

export default UpdateRatingService