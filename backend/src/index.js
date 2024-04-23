const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const codeRoutes = require('./routes/codeRoutes');
const authRoutes = require('./routes/authRoutes');
const transactionRoutes = require('./routes/transactionRoutes');

// middleware to check if the user is log In 
const middleware = require('./middleware/middleware');

dotenv.config()

//Loading variables
const PORT = process.env.PORT || 3300;
const DB = process.env.DB || 'mongodb://localhost:27017/DBCoinkapp';

//Initial confirguriations
const app = new express();
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());


//Configuring the database connection
mongoose.connect(DB).then(() =>
    console.log(`Connected to: ${DB}`))
    .catch((error) => console.log(error));

//Configuring the routes
app.use('/api/v1/user', middleware.authenticate, userRoutes);
app.use('/api/v1/transaction',middleware.authenticate, transactionRoutes);
app.use('/api/v1/code', codeRoutes);
app.use('/api/v1/auth', authRoutes);

//Configuring the server 
app.listen(3000, () => {
    console.log(`Listen to port: ${PORT}`);
});