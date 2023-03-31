const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    genre: {
        type: String,
    },
    numberInStock: {
        type: Number,  
    },
    dailyRentalRate: {
        type: Number,
    }
})

module.exports = mongoose.model("movie", movieSchema);