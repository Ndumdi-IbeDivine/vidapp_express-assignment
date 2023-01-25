const express = require('express');
const Joi = require('joi'); 

const router = express.Router();

const movieGenres = [
    {id: 1, name: 'Comedy'},
    {id: 2, name: 'Thriller'},
    {id: 3, name: 'Action'},
    {id: 4, name: 'Horror'},
    {id: 5, name: 'Sci-fi'},
    {id: 6, name: 'Fiction'},
    {id: 7, name: 'Romance'},
    {id: 8, name: 'Fantasy'},
    {id: 9, name: 'Drama'},
    {id: 10, name: 'Crime'}
];

//GET / TO GET ALL GENRES

router.get('/', (req, res) => {
    res.status(200).json(movieGenres);
});

//GET / TO GET GENRES BY id.

router.get('/:id', (req, res) => {
    let found = movieGenres.find(movies => movies.id === parseInt(req.params.id));
    if (found) {
        res.status(200).json(found);
    } 
    res.status(404).json({message: 'Movie not found'});
})

//POST / TO CREATE A NEW GENRE

router.post('/', (req, res) => {
    
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    const result = schema.validate(req.body);

    if (result.error) {
        res.status(400).send(result.error.details[0].message);
        return
    }

    const newGenre = {
        id: movieGenres.length + 1,
        name: req.body.name
    };
    movieGenres.push(newGenre);

    res.status(201).json(newGenre);
});

// PUT / TO UPDATE GENRE

router.put('/:id', (req, res) => {
    let found = movieGenres.find(movies => movies.id === parseInt (req.params.id));
    if (!found) res.status(404).json('Genre not found');

    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    const result = schema.validate(req.body);

    if (result.error) {
        res.status(400).json(result.error.details[0].message);
        return
    }

    found.name = req.body.name;
    res.json(found);
});

//DELETE / TO DELETE GENRE

router.delete('/:id', (req, res) => {
    let found = movieGenres.find(movies => movies.id === req.params.id);
    if (found) {
        const targetGenre = movieGenres.indexOf(found)
        movieGenres.splice(targetGenre, 1);
        res.status(204).json({message: 'Genre deleted'});
    }
})

module.exports = router;