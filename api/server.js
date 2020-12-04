const express = require('express');


const server = express();

//Middleware _)_)_)_)_)_)_)_)_)_)_)_)_)_)_)_)_)
server.use(express.json()); 

//Catch All End Point 
server.get('/', (req, res) => {
    res.send(`<h1> JL-LambdaSchool-API-Sprint </h1>`); 
}); 

module.exports = server;
