const { Rental } = require('../models/rentals'); 
const {Movie} = require('../models/movies'); 
const {Customer} = require('../models/customers'); 
const express = require('express');
const Joi = require('joi');
const router = express.Router();

const joiSchema = Joi.object({
  customer: Joi.string().required(),
  movieId: Joi.string().required(),
});

router.get('/', async (req, res) => {
  const rentals = await Rental.find().sort('-dateOut');
  res.send(rentals);
});

router.post('/', async (req, res) => {
  const validatedRental = joiSchema.validate({...req.body});
  if (validatedRental.error) return res.status(400).send(validatedRental.error.details[0].message);

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send('Invalid customer.');

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(400).send('Invalid movie.');

  if (movie.numberInStock === 0) return res.status(400).send('Movie not in stock.');

  const order = new Rentals({
    customer: {
        _id: customer._id,
        name: customer.name, 
        phone: customer.phone
      },
      movie: {
        _id: movie._id,
        title: movie.title,
        dailyRentalRate: movie.dailyRentalRate
      }
    })
    order.save()
    .then(doc => {
        res.status(200).json(doc);
    })
    .catch(err => console.log(err));
});

router.get('/:id', async (req, res) => {
  const rental = await Rental.findById(req.params.id);

  if (!rental) return res.status(404).send('The rental with the given ID was not found.');

  res.send(rental);
});

module.exports = router; 