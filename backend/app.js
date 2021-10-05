
const express = require('express');

const app = express();
require('dotenv/config')

// middleware libray 
const morgan = require('morgan');

// importing mongoose
const mongoose = require('mongoose');

const productsRouter = require('./routers/products.router')
const categoriesRouter = require('./routers/category.router')

// Middleware: replacement of bodyParser 
app.use(express.json())

// tiny is used for displaying a specific request 
app.use(morgan('tiny'))

const api = process.env.API_URL;

// this cors will slove api connection with the front end 
const cors = require('cors')

// the star * allows all http request to be pass from any origin
app.use(cors());
app.options('*', cors());

//Routes
app.use(`${api}/products`, productsRouter);
app.use(`${api}/categories`, categoriesRouter);

// this connect returns a promise which contain .then(success) and .catch(fail) methods
mongoose.connect(process.env.MONGO_CONNECTION_STRING)
    .then(() => {
        console.log('Database is connected......')
    })
    .catch((err) => {
        console.log(`Database connection failed ${err}`)
    })

app.listen (3000,() => {
    console.log("app is running on port 3000")
} )
 