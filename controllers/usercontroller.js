const router = require('express').Router();
const User = require('../db').import('../models/user');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/signup', (req, res) => {
    User.create({
        userName: req.body.userName,
        email: req.body.email,
        password: bcryptjs.hashSync(req.body.password, 10)
    })
        .then(
            createSuccess = (user) => {
                let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24})

                res.json({
                    user: user,
                    message: 'user created, happy snackin!',
                    sessionToken: token
                })
            },
            createError = err => res.send(500, err)
        )
})

router.post('/signin', (req, res) => {
    User.findOne({ where: { userName: req.body.userName }})
      .then(
        user => {
          if (user) {
            bcryptjs.compare(req.body.password, user.password, (err, matches) => {
              if (matches) {
                let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 })
                res.json({
                  user: user,
                  message: 'successfully authenticated',
                  sessionToken: token 
                })
              } else {
                res.status(502).send({ error: 'bad gateway' })
              }
            })
          } else {
            res.status(500).send({ error: 'failed to authenticate' })
          }
        },
        err => res.status(501).send({ error: 'failed to process'})
      )
  });

  module.exports = router

  //snackmaster, admin
  //rasclaat, bloodclaat 