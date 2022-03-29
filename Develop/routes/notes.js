// Import all the require packages
const note = require('express').Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');