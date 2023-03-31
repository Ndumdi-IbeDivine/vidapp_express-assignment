const mongoose = require('mongoose');

const rentalSchema = new mongoose.Schema({
    customer: String,
    movie: String,
    dateOut: Date,
    rentalFee: Number,
    dateReturned: Date,
})