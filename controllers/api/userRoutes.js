const router = require("express").Router();
const { User } = require('../../models');

// Placeholder route for creating a new user
router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json({userData: userData, logged_in: req.session.logged_in});
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// for logging in
router.post('/login', async (req, res) => {
  try {
    console.log('login route hit')
    console.log(req.body)
    const userData = await User.findOne({ where: { username: req.body.username } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);
    console.log(validPassword)
    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!', logged_in: req.session.logged_in });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

// // Placeholder route for updating a user
// router.put("/:id", (req, res) => {
//   const userId = req.params.id;
//   // Assuming you'll send updated user data in the request body
//   const updatedUserData = req.body;
//   res.send(`Update user with ID: ${userId}`);
// });

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    console.log('test')
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    console.log('else hit')
    res.status(404).end();
  }
});

module.exports = router;