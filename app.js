const express = require('express');
const app = express();

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const config = require('./config/config');

mongoose.connect(config.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('connected to DB'))
  .catch(err => console.log('there was an error ' + err))

const bodyParser = require('body-parser');

// dump json in body into req.body
app.use(bodyParser.json());


const userRouter = require('./routes/userRouter');

app.use('/users', userRouter);

app.listen(process.env.PORT || 3001, function () {
  console.log('listening on port 3001');
});