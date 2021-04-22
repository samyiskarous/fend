
var path = require('path')
const express = require('express')
const fetch = require("node-fetch");
var bodyParser = require('body-parser')
var cors = require('cors')
var bodyParser = require('body-parser')
var FormData = require('form-data')
require('dotenv').config()

const app = express()
app.use(cors())

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use(express.static('dist'))

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

app.post('/sentiment-analysis', function (req, res) {

    const formdata = new FormData();
    formdata.append("key", process.env.API_KEY);
    formdata.append("url", req.body.urlToAnalyze);
    formdata.append("lang", "en");  

    const requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };

    fetch("https://api.meaningcloud.com/sentiment-2.1", requestOptions)
        .then((result) => result.json())
        .then((result) => res.send(result))
        .catch(error => console.log('error', error));

})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})