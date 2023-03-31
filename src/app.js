const express = require('express');
require('dotenv').config();
const connectDB = require('./db/connect');
const customerRouter = require('./routes/customer')
// const genreRoute = require('./models/genre');

const app = express();


app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

const PORT = 3000;

app.use('/api/v1/customer', customerRouter);

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