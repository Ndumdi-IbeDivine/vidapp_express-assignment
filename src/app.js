const express = require('express');
require('dotenv').config();
const connectDB = require('./db/connect');
const customerRouter = require('./routes/customer');
const genreRouter = require('./routes/genre');
const movieRouter = require('./routes/movie');
const rentalRouter = require('./routes/rental')
;

const app = express();


app.use(express.json());
app.use(express.urlencoded({extended: true}));

const PORT = process.env.PORT;

app.use('/api/customer', customerRouter);
app.use('/api/genre', genreRouter);
app.use('/api/movie', movieRouter);
app.use('/api/rental', rentalRouter);

const start = async () => {
    try{
        await connectDB(process.env.MONGODB_URI);
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
        })
    }
    catch(error){
        console.log(error);
    }
}

start()