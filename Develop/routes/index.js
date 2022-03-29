const express = require('express');

// Import our modular routers for notes
const notesTaker = require('./notes');

const app = express();

app.use('/notes', notesTaker);


module.exports = app;
