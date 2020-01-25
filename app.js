require('dotenv').config();

const express = require('express');
const app = express();
let user = require('./controllers/userController');
let fortune = require('./controllers/myFortuneController');

const sequelize = require('./db');

sequelize.sync(); //pass {force: true} to reset

app.use(express.json()); // allows middleware like req.body - must be above any routes
app.use(require('./middleware/headers')); //comes before routes

/******** user routes **********/

app.use('/fortunes', fortune);
app.use('/fortunes', user);

/******************************/
app.listen(process.env.PORT, function() {
  console.log('We are The Borg - Resistance is Futile!!!.');
});
