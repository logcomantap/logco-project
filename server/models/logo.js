const mongoose = require('mongoose')

let Schema = mongoose.Schema
const logoSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    user_id: {type: Schema.Types.ObjectId, ref: 'User'}
},{timestamps : true})


const Logo = mongoose.model('Logo',logoSchema)

module.exports = Logo