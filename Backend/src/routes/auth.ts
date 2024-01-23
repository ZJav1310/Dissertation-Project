const router = require('express').Router();

import user from '../controllers/auth.controller';
import auth from '../middlewares/auth';

// register
router.post('/', user.register);
// login
router.post('/login', user.login);
// all users
router.get('/', auth, user.all);
// get user by ID
router.get('/:id', auth, user.getById);

export default router;