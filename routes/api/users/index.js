import { Router } from 'express';
import { uploadAvatar } from '../../../controllers/users';
import guard from '../../../midllewares/auth/guard';
import { upload } from '../../../midllewares/upload';

const router = new Router();

router.patch('/avatar', guard, upload.single('avatar'), uploadAvatar);

export default router;