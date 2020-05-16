// All the starter and boilerplate code for an Express app

const indexFileContent = `
// External packages
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

// Internal routes & modules


// Server decalarations
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(morgan('combined')); // Logging all HTTP requests
app.use(express.urlencoded({ extended: false })); // Body parser

// Database connection
                            
app.listen(PORT, () => console.log("Express server started at port: " + PORT));
`;

module.exports = indexFileContent;
