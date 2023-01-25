const express = require('express');

const genreRoute = require('./routes/genre');

const app = express();
//require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res, next) => {
    res.status(200).send("Welcome to VidApp");
    next();
});

app.use('/genre', genreRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})