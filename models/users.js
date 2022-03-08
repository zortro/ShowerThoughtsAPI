const { Schema, model } = require('mongoose')

const usersSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: false,
            max_length: 25,
            trim: true
        },
        email: {
            type: String,
            required: false,
            unique: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
        },
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'thoughts'
        }],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'users'
        }]
    },
    {
        ToJSON: {
            virtuals: true,
            getters: true
        },
    }
)

usersSchema.virtual('friendCount').get(function () {
    return `friendCount: ${this.friends.length}`
})

const Users = model('users', usersSchema)

module.exports = Users
