const mongoose = require('mongoose')

const SusUrlEventSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        default: Date.now,
    },
    susUrl: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('SusUrlEvent', SusUrlEventSchema)
