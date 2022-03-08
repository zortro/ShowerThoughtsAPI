const { Thoughts, Users } = require('../models')

module.exports = {

    getAllThoughts(req, res) {
        Thoughts.find()
        .then((thoughts) => res.json(thoughts))
        .catch((err) => res.status(500).json(err))
    },

    getThoughtById(req, res) {
        Thoughts.findOne({ _id })
        .select('-__v')
        .then((thought) => 
            !thought
                ? res.status(404).json({ message: 'No thought was found'})
                : res.json(thought)
                )
                .catch((err) => res.status(500).json(err))
    },

    newThought(req, res) {
        Thoughts.create(req.body)
        .then((thought) =>
        Users.findOneAndUpdate(
            {_id: req.params.userId},
            {$addToSet: {thoughts: thought}},
            {new: true}
        )
        .then(res.json(thought)))
        .catch((err) => {
            console.log(err)
            return res.status(500).json(err)
            })
    },

    deleteThought(req, res) {
        Thoughts.findOneAndDelete({ _id: req.params.thoughtId })
        .then((thought) =>
        !thought
            ? res.status(404).json({message: 'No thought was found'})
            : Users.findOneAndUpdate(
                {thoughts: req.params.thoughtId},
                {$pull: {thought: req.params.thoughtId}},
                {new: true}
            )
        )
        .then(() => res.json({ message: 'Thought removed successfully'}))
        .catch((err) => res.status(500).json(err))
    },

    updateThought(req, res) {
        Thoughts.findOneAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((thought) =>
            !thought
                ? res.status(404).json({ message: 'No thought was found'})    
                : res.json(thought)
            )
            .catch((err) => res.status(500).json(err))
    },

    newReaction(req, res) {
        Thoughts.findOneAndUpdate(
            { _id: req.params.thoughtId}, 
            { $addToSet: {reactions: req.body}}, 
            {new: true }
        )
        .then((thought) =>
        !thought
        ? res
            .status(404)
            .json({ message: 'No thought was found'})
        :res.json(thought)
        )
        .catch((err) => res.status(500).json(err))
    },

    deleteReaction(req, res) {
        Thoughts.findOneAndUpdate(
            { $pull: {reactions: {_id: req.params.reactionId}}},
            {new: true}
        )
            .then((thought) =>
            !thought
                ? res
                    .status(404)
                    .json({ message: 'No thought was found'})
                : res.json(thought)
            )
            .catch(err => res.status(500).json(err))
    }
}