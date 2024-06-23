const port = 3000;

// intialize installed dependencies
const express = require('express');
require('dotenv').config();
const axios = require('axios');
const app = express();
const cors = require('cors');
//use cors middleware
app.use(cors());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
// set .env variables
const API_KEY = process.env.REACT_APP_API_KEY;

//api request
app.get('/weather', async(req, res) => {
    const { city } = req.query;

    if (!city) {
        return res.status(400).json({error: 'City is required'});
    }
    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=imperial`);

       res.json(response.data);
    } catch (error) {
       console.error(error); 
       res.status(500).json({ error: error.message });
    }
});

//listening for port 3000 using ip rather than localhost
app.listen(port, '127.0.0.1', () => {
    console.log(`Listening on port ${port}`);
});