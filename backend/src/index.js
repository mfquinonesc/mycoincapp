const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const codeRoutes = require('./routes/codeRoutes');
const transactionRoutes = require('./routes/transactionRoutes');

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
mongoose.connect(DB, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
}).then(() => console.log(`Connected to: ${DB}`))
    .catch((error) => console.log(error));

//Configuring the routes
app.use('/api/v1/user',userRoutes);
app.use('/api/v1/code',codeRoutes);
app.use('/api/v1/transaction',transactionRoutes);


//Configuring the server 
app.listen(3000, () => {
    console.log(`Listen to port: ${PORT}`);
});