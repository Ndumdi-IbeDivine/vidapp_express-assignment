const express = require('express');

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
    let found = movieGenres.find(movies => movies.id === req.params.id);
    if (found) {
        res.status(200).json(found);
    } 
    res.status(404).json({message: 'Movie not found'});
})

//POST / TO CREATE A NEW GENRE

router.post('/', (req, res) => {
    let newId = movieGenres.length + 1;

    let newGenre = {
        id: newId,
        name: req.body.name
    };
    movieGenres.push(newGenre);

    res.status(201).json(newGenre);
});

// PUT / TO UPDATE GENRE

router.put('/:id', (req, res) => {
    let found = movieGenres.find(movies => movies.id === req.params.id);
    if (found) {
        let updatedGenre = {
            id: found.id,
            name: req.body.name
        }
        const targetGenre = movieGenres.indexOf(found)
        movieGenres.splice(targetGenre, 1, updatedGenre);
        res.status(201).json(updatedGenre);
    }
        res.status(404).json({message: 'Genre not found'});
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