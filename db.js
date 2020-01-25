const Sequelize = require('sequelize'); //import

//new instance of Sequelize
const sequelize = new Sequelize('Fortunes', 'postgres', process.env.PASS, {
  host: 'localhost',
  dialect: 'postgres'
});

sequelize.authenticate().then(
  function() {
    console.log('Connected to the Fortunes postgres DB');
  },
  function(err) {
    console.log(err);
  }
);

module.exports = sequelize;
