const express = require('express')
const app = express()
const route = require('./routes');
const db = require('./config/db');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');

const dotenv = require('dotenv');

dotenv.config();

app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());


// connect data mongoDB
db.connect();

route(app);



app.listen(3001, function() {
    console.log('Server is running on port 3001')
})
