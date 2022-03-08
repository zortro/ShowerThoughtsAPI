const router = require('express').Router()

const {
    getAllUsers,
    getUserById,
    newUser,
    deleteUser,
    updateUser,
    addFriend,
    deleteFriend
} = require('../../controllers/users-controller')

router.route('/').get(getAllUsers).post(newUser)

router.route('/:userId')
.get(getUserById)
.put(updateUser)
.delete(deleteUser)

router.route('/:userId/friends/:friendId')
.post(addFriend)
.delete(deleteFriend)

module.exports = router