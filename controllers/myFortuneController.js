const router = require('express').Router();
const FortuneModel = require('../db').import('../models/fortune');
const validateSession = require('../middleware/validate-session');

/****** SAVE A FORTUNE ******/

router.post('/', validateSession, (req, res) => {
  const fortuneFromRequest = {
    fortune: req.body.fortune,
    luckNumber: req.body.luckNumber,
    class: req.body.class,
    notes: req.body.notes,
    owner: req.user.id
  };
  FortuneModel.create(fortuneFromRequest)
    .then(fortuneData => res.status(200).json(fortuneData))
    .catch(err => res.json({ error: err }));
});

/****** GET ALL USER SPECIFIC FORTUNES ******/

router.get('/all', validateSession, (req, res) => {
  let mine = req.user.id;
  console.log(req.user.id);
  FortuneModel.findAll({ where: { owner: `${mine}` } })
    .then(fortunes => res.status(200).json(fortunes))
    .catch(err => res.status(500).json({ error: err }));
});

/****** UPDATE A USER FORTUNE ******/

router.put('/:id', validateSession, (req, res) => {
  FortuneModel.update(req.body, { where: { id: req.params.id } })
    .then(fortune => res.status(200).json(fortune))
    .catch(err => res.status(500).json({ error: err }));
});

/****** DELETE A FORTUNE ******/

router.delete('/:id', validateSession, (req, res) => {
  FortuneModel.destroy({ where: { id: req.params.id } })
    .then(fortune => res.status(200).json(fortune))
    .catch(err => res.json({ error: err }));
});

/****** GET USER FORTUNES BY CLASS ******/

router.get('/:class', validateSession, (req, res) => {
  let mine = req.user.id;
  console.log(req.user.id);
  FortuneModel.findAll({ where: { owner: `${mine}`, class: req.params.class } })
    .then(fortunes => res.status(200).json(fortunes))
    .catch(err => res.status(500).json({ error: err }));
});

module.exports = router;
