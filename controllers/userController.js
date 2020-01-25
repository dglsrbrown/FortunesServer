const router = require('express').Router();
let UserModel = require('../db').import('../models/user');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/***** USER SIGN UP *****/

router.post('/signup', (req, res) => {
  UserModel.create({
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 11)
  }).then(user => {
    let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: 60 * 60 * 48
    });
    res.json({
      user: user,
      message: 'created',
      sessionToken: token
    });
  }),
    err => res.send(500, err.message);
});
/***** USER LOGIN *****/
router.post('/login', (req, res) => {
  UserModel.findOne({ where: { username: req.body.username } }).then(user => {
    // user? res.json(user): res.status(500).send({error: "user not found"})
    if (user) {
      bcrypt.compare(req.body.password, user.password, function(err, matches) {
        if (matches) {
          console.log('The Value matches:', matches);
          let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: 60 * 60 * 48
          });
          res.json({
            user: user,
            message: 'succsssfully authenticated user',
            sessionToken: token
          });
          // res.status(200).send({ success: 'Passwords match' });
        } else {
          res.status(502).send({ error: 'passwords do not match' });
        }
      });
    } else {
      res.status(500).send({ error: 'user not found' });
    }
  });
});

module.exports = router;
