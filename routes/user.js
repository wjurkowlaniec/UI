import express from 'express';
import user from '../controllers/users';

const router = express.Router();

router.post('/signup', user.signup);
router.post('/signin', user.login);

export default router;
