import { Router } from 'express';
import { registration, login, logout, getCurrentUser } from '../../../controllers/auth';
import guard from '../../../midllewares/auth/guard';
import { validateAuth } from '../../../midllewares/validation/userValidation';

const router = new Router();

router.post('/signup', validateAuth, registration);
router.post('/login', validateAuth, login);
router.post('/logout', guard, logout);
router.get('/current', guard, getCurrentUser);

export default router;