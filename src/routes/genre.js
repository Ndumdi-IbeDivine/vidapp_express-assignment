const { Movie } = require('../models/movies'); 
const {Genre} = require('../models/genres');
const express = require('express');
const Joi = require('joi');
const router = express.Router();

const joiSchema = Joi.object({
  name: Joi.string().min(3).required()
})

router.get('/', async (req, res) => {
  const movies = await Movie.find().sort('name');
  res.json(movies);
});

router.post('/', async (req, res) => {
  const validatedGenre = joiSchema.validate({...req.body});
  if (validatedGenre.error) return res.status(400).send(validatedGenre.error.details[0].message);

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send('Invalid genre.');

  const movie = new Movie({ 
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate
  });
  await movie.save();
  
  res.send(movie);
});

router.put('/:id', async (req, res) => {
  const validatedGenre = joiSchema.validate({...req.body});
  if (validatedGenre.error) return res.status(400).send(validatedGenre.error.details[0].message);


  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send('Invalid genre.');

  const movie = await Movie.findByIdAndUpdate(req.params.id,
    { 
      title: req.body.title,
      genre: {
        _id: genre._id,
        name: genre.name
      },
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate
    }, { new: true });

  if (!movie) return res.status(404).send('The movie with the given ID was not found.');
  
  res.send(movie);
});

router.delete('/:id', async (req, res) => {
  const movie = await Movie.findByIdAndRemove(req.params.id);

  if (!movie) return res.status(404).send('The movie with the given ID was not found.');

  res.send(movie);
});

router.get('/:id', async (req, res) => {
  const movie = await Movie.findById(req.params.id);

  if (!movie) return res.status(404).send('The movie with the given ID was not found.');

  res.send(movie);
});

module.exports = router; 