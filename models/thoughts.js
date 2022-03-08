const { Schema, model, Types } = require('mongoose')

const reactionsSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: ()=> new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
)

const thoughtsSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            length: [1, 280]
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        username: {
            type: String,
            required: true
        },
        reactions: [reactionsSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
    }
)

thoughtsSchema.virtual('reactionCount').get(function() {
    return `reactionCount: ${this.reactions.length}`
})

const Thoughts = model('thoughts', thoughtsSchema)

module.exports = Thoughts