import { Router } from 'express';
import { uploadAvatar, verifyUser, repeatEmailForVerifyUser } from '../../../controllers/users';
import guard from '../../../midllewares/auth/guard';
import { upload } from '../../../midllewares/upload';

const router = new Router();

router.patch('/avatar', guard, upload.single('avatar'), uploadAvatar);
router.get('/verify/:token', verifyUser);
router.post('/verify', repeatEmailForVerifyUser);

export default router;