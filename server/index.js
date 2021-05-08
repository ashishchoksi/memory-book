const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config()

const postRouter = require('./routes/posts');

const app = express();

// parse application/x-www-form-urlencoded
// parse application/json
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use('/posts', postRouter);

const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => app.listen(PORT, () => console.log('running!')))
    .catch(err => console.log(err.message));

mongoose.set('useFindAndModify', false);


