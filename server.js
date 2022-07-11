if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');

const bodyParser = require('body-parser');

const indexRouter = require('./routes/index');
const authorsRouter = require('./routes/authors');
const booksRouter = require('./routes/books');


// configuring the express app
// We use ejs as views engine
app.set('view engine', 'ejs');
// We set where our views are coming from
app.set('views', __dirname + '/views');

// Hookup express layouts where our layout file is going to be
// every single file is going to be inside it, no need to duplicate
// header and footer of our html
app.set('layout', 'layouts/layout');

// we tell our pap we want to use express layouts
app.use(expressLayouts);

// tell where our public file is going to be (style, scripts, images)
// often use public as folder name for public file
app.use(express.static('public'));

// Set up the parser
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }));

// connect with the DB
const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL, {
    // No need to mention in mongoose v6
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // useCreateIndex: true 
})

const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => console.log('Connected to Mongoose'));

// Connect the routes to the app
app.use('/', indexRouter);
app.use('/authors', authorsRouter);
app.use('/books', booksRouter);

// tell our app we wanna listen
// from environment variable, server tells us which port we listen to
// for development, would be 3000
app.listen(process.env.PORT || 3000);

