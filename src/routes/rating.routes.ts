import { Router } from 'express'
import { getRepository } from 'typeorm'
import { Rating } from '../models/Rating'
import CreateRatingService from '../services/CreateRatingService'
import UpdateRatingService from '../services/UpdateRatingService'

const ratingsRouter = Router()

ratingsRouter.get('/', async (request, response) => {
    const ratingRepository = getRepository(Rating)

    const ratings = await ratingRepository.find()

    return response.json(ratings)
})

ratingsRouter.get('/:id', async (request, response) => {
    const ratingId = request.params.id
    const ratingRepository = getRepository(Rating)

    const ratings = await ratingRepository.findOne(ratingId)

    return response.json(ratings)
})

ratingsRouter.post('/', async (request, response) => {
    const { cep, user_from_id, user_to_id, rate, comment, created_at } = request.body

    const createRating = new CreateRatingService()

    const rating = await createRating.execute({
        cep,
        user_from_id,
        user_to_id,
        rate,
        comment,
        created_at
    })

    return response.status(201).json(rating)
})

ratingsRouter.put('/:id', async (request, response) => {
    const ratingId = request.params.id
    const { cep, rate, comment, created_at } = request.body

    const updateRating = new UpdateRatingService()

    const rating = await updateRating.execute({
        ratingId,
        cep,
        rate,
        comment,
        created_at
    })

    return response.json(rating)

})

ratingsRouter.delete('/:id', async (request, response) => {
    const ratingId = request.params.id

    const ratingRepository = getRepository(Rating)

    const rating = await ratingRepository.findOne(ratingId)
    
    if(!rating) {
        throw new Error('Rating not found with the provided id')
    }

    await ratingRepository.remove(rating)

    return response.json({ status: 'success', message: 'Rating deleted' })
})

export default ratingsRouter