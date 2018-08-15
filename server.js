const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');



const cultureRouter = require('./server/routes/cultureRouter');
const foodRouter = require('./server/routes/foodRouter');
const mountainRouter = require('./server/routes/mountainRouter');

const app = express();

const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/conFusion';
const connect = mongoose.connect(url);

connect.then((db) => {
    console.log("Connected correctly to server");
}, (err) => { console.log(err); });

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist/Taiwan')));

app.use('/cultures', cultureRouter);
app.use('/foods',foodRouter);
app.use('/mountains',mountainRouter);


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/Taiwan/index.html'));
});


/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));
