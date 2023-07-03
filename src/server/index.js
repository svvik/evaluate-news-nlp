var path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const dotenv = require('dotenv');

dotenv.config();
const apiKey = process.env.API_KEY;
const baseURL = `https://api.meaningcloud.com/sentiment-2.1?key=${apiKey}&lang=auto`;

const app = express()
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('dist'))

console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile('dist/index.html');
})

const processCallback = async (req, res) => {
    const processUrl = req.query['url'];
    console.log(`Requested url ${processUrl}`);
    const url = `${baseURL}&url=${processUrl}`;
    console.log(`Quering ${url}`);
    return fetch(url)
        .then(r => r.json())
        .then(json => res.send(json))
        .catch(e => {
            console.error(e.message);
            res.sendStatus(500);
        });;
}

app.get('/process', processCallback);

app.listen(8080, function () {
    console.log('App listening on port 8080!')
});