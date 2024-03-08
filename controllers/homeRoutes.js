const router = require('express').Router();
const { Recipe, Ingredient, Date } = require('../models');
const withAuth = require('../utils/auth')

router.get('/', withAuth, async (req, res) => {
  try {
    const dateData = await Date.findAll();

    const date = dateData.map((post) => post.get({ plain: true }));

    res.render('homepage', {
      date,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/newUser', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('newUser');
})

router.get('/apiRecipe', withAuth, (req, res) => {
  try {
      res.render('apiRecipe', {logged_in: req.session.logged_in});
  } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
  }
});

module.exports = router;