const {ObjectId} = require('mongoose').Types
const { Users, Thoughts } = require('../models')

module.exports = {
    
    getAllUsers(req, res) {
        Users.find()
        .then(async (users) => {
            const user = {
                users,
            }
            return res.json(user)
        })
        .catch((err) => {
            console.log(err)
            return res.status(500).json(err)
        })
    },
    
    getUserById(req, res) {
        Users.findOne({ _id: req.params.userId })
        .populate('thoughts')
        .populate('friends')
        .select('-__v')
        .then(async (user) => 
            !user
                ? res.status(404).json({message: 'No user with that id exists'})
                : res.json({user})
        )
        .catch((err) => {
            console.log(err)
            return res.status(500).json(err)
        })
    },

    newUser(req, res) {
        Users.create(req.body)
        .then(user => res.json(user))
        .catch(err => res.status(500).json(err))
    },

    deleteUser(req, res) {
        Users.findOneAndRemove({_id: req.params.userId})
        .then((user) => 
            !user
                ? res.status(404).json({message: 'No user with that id exists'})
                : Thoughts.findOneAndUpdate(
                    { users: req.params.userId },
                    { $pull: { users: req.params.userId }},
                    { new: true }
                )
        )
        .then((thought) =>
            !thought
            ? res.status(404).json({message: 'User removed, no thoughts found'})
            : res.json({ message: 'User removed'})
        )
        .catch((err) => {
            console.log(err)
            res.status(500).json(err)
        })
    },

    updateUser(req, res) {
        Users.findOneAndUpdate(
            {_id: req.params.id},
            { $set: req.body },
            { runValidators: true, new: true})
            .populate('thoughts')
            .populate('friends')
            .select('-__v')
            .then(async (user) =>
                !user
                ? res.status(404).json({message: 'No user with that id exists'})
                : res.json({user})
            )
            .catch((err) => {
                console.log(err)
                return res.status(500).json(err)
            })
    },

    addFriend(req, res) {
        Users.findOneAndUpdate(
            {_id: req.params.userId},
            {$addToSet: {friends: req.params.friendId}},
            {new: true})
        .populate('thoughts')
        .populate('friends')
        .select('-__v')
        .then((user) =>
            !user
                ? res.status(404).json({message: 'No user with that id exists'})
                : res.json(user)
        )
        .catch((err) => res.status(400).json(err))
    },

    deleteFriend(req, res) {
        Users.findOneAndUpdate(
            {_id: req.params.userId},
            {$pull: {friends: req.params.friendId}},
            {new: true})
        .populate('thoughts')
        .populate('friends')
        .select('-__v')
        .then((user) => 
            !user
                ? res.status(404).json({message: 'No user with that id exists'})
                : res.json(user)
        )
        .catch((err) => res.status(500).json(err))
    }
}