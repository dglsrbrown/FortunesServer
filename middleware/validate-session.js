let jwt = require('jsonwebtoken');
const UserModel = require('../db').import('../models/user');

const validateSession = (req, res, next) => {
  const token = req.headers.authorization;
  //err and decoded are booleans and the process.env etc is that which creates the true of falsity of the params
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (!err && decoded) {
      UserModel.findOne(
        {
          where: { id: decoded.id }
        },
        console.log('decoded: ', decoded)
      )
        .then(user => {
          if (!user) throw err;

          req.user = user;
          console.log('req.user: ', req.user);

          return next();
        })
        .catch(err => next(err));
    } else {
      req.errors = err;
      return res.status(500).send('Not authorized.');
    }
  });
};

module.exports = validateSession;
