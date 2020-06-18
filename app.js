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

const cors = require('cors');

app.use(cors(
  {
    origin: config.FRONTEND_URL,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
));

const bodyParser = require('body-parser');

// dump json in body into req.body
app.use(bodyParser.json());


const usersRouter = require('./routes/userRouter');
const postsRouter = require('./routes/postRouter');

app.use('/users', usersRouter);
app.use('/posts', postsRouter);

app.listen(process.env.PORT || 3001, function () {
  console.log('listening on port 3001');
});