// Set up the routes for our app
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index');
  })

// We export the router so the app has access to the routes
module.exports = router;