const express = require('express');
const app = express();


app.listen(process.env.PORT || 3001, function () {
  console.log('listening on port 3001');
});