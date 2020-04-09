const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
    username: { type: String, requireed: true },
    description: { type: String, requireed: true },
    duration: { type: Number, requireed: true },
    date: { type: Date, requireed: true },
}, {
    timestamps: true
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;
