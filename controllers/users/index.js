import { HttpCode } from "../../lib/constants";
import {
    UploadFileService,
    // eslint-disable-next-line no-unused-vars
    LocalFileStorage,
    CloudFileStorage
} from '../../service/file-storage';

const uploadAvatar = async (req, res, next) => {
    const UploadService = new UploadFileService(
        CloudFileStorage,
        req.file,
        req.user);
    
    const avatarUrl = await UploadService.updateAvatar();

    res
        .status(HttpCode.OK)
        .json({ status: 'success', code: HttpCode.OK, data: { avatarUrl } });
};

export { uploadAvatar };