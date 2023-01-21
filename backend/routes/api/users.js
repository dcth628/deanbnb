const express = require('express')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];

// Sign up
router.post(
  '/',
  validateSignup,
  async (req, res) => {
    const {
      firstName,
      lastName,
      email,
      password,
      username
    } = req.body;
    const user = await User.signup({
      firstName, lastName, email, username, password
    });

    await setTokenCookie(res, user);

    return res.json({
      user
    });
  }
);

// Get all users
router.get(
  '/',
  async (req, res) => {
    const users = await User.findAll()
    res.json(users)
  })

  // Get a user by id
  router.get(
    '/:id',
    async (req, res) => {
      const user = await User.findByPk(req.params.id);
      if (!user) {
        res.status(404);
        return res.json({ Message: "User couldn't be found"})
      }
      res.json(user)
    }
  )

// Delete a user
router.delete(
  '/:id',
  async (req, res) => {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      res.status(404);
      return res.json({ Message: 'User not found' });
    }
    await user.destroy();
    return res.status(200).json({ Message: 'User successfully deleted' })
  })

module.exports = router;
