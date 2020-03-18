const express = require('express'),
    User = require('./model'),
    validate = require('../web/validate-middleware'),
    usersValidator = require('./validator');

const router = express.Router();

router.post('/users', validate(usersValidator.register), async (req, res, next) => {
  try {
    let errors = {};
    const { email } = req.body.user;

    if (email) {
      let res = await User.findOne({
        email: email.toLowerCase()
      }, ['_id']).lean();
      if (res) {
        errors.email = 'This email is already registered to an account'
      }
    }
    if (Object.keys(errors).length) {
      await res.json({
        errors
      })
    } else {
      let user = new User(req.body.user);
      await user.save();
      await res.json({message: 'user created!'})
    }
  } catch (err) {
    next(err)
  }
});

router.get('/users/:userId', async (req, res, next) => {
  let user = await User.findOne({ _id: req.params.userId });
  if (user) {
    await res.json({user})
  } else {
    await res.json({message: 'user not found'})
  }}
);

router.get('/users', async (req, res) => {
  let page = parseInt(req.query.page) || 1;
  let limit = parseInt(req.query.limit) || 2;
  let q = {};
  let sort = {};
  if (req.query.sortField && req.query.sortDirection) {
    sort[req.query.sortField] = req.query.sortDirection
  }

  let [users, count] = [
    await User.find(q)
        .sort(sort)
        .limit(limit)
        .skip((page - 1) * limit)
        .lean(),
    await User.countDocuments(q)
  ];
  await res.json({
    users,
    totalPages: limit ? Math.ceil(count / limit) : 1,
    currentPage: page || 1,
    count
  })
});

module.exports = router;
