const router = require('express').Router()

const {
    getAllThoughts,
    getThoughtById,
    newThought,
    deleteThought,
    updateThought,
    newReaction,
    deleteReaction
} = require('../../controllers/thoughts-controller')

router.route('/').get(getAllThoughts)

router.route('/:userId').post(newThought)

router.route('/:thoughtId').get(getThoughtById).put(updateThought).delete(deleteThought)

router.route('/:thoughtId/reactions').post(newReaction)

router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction)
module.exports = router