import { HttpCode } from "../../lib/constants";
import {
    UploadFileService,
    // eslint-disable-next-line no-unused-vars
    LocalFileStorage,
    CloudFileStorage,
} from '../../service/file-storage';
import repositoryUsers from '../../repository/users';
import {
    EmailService,
    SenderNodemailer,
} from "../../service/email";


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

const verifyUser = async (req, res, next) => {
    const verifyToken = req.params.token;
    const userFromToken = await repositoryUsers.findByVerifyToken(verifyToken);
    if (userFromToken) {
        await repositoryUsers.updateVerify(userFromToken.id, true);
        return res
            .status(HttpCode.OK)
            .json({
                status: 'success',
                code: HttpCode.OK,
                data: { message: 'Verification successful' },
            });
    }; 
    
    res
        .status(HttpCode.BAD_REQUEST)
        .json({
            status: 'success',
            code: HttpCode.BAD_REQUEST,
            data: { message: 'Invalid token' },
        });
};

const repeatEmailForVerifyUser = async (req, res, next) => {
   
    const { email } = req.body;
    const user = await repositoryUsers.findByEmail(email);
    if (user) {
        const { email, name, verifyTokenEmail } = user;
        const emailService = new EmailService(
           process.env.NODE_ENV,
           new SenderNodemailer(),
       );

        const isSend = await emailService.sendVerifyEmail(
            email,
            name,
            verifyTokenEmail,
        );
        
        if (isSend) {
            return res.status(HttpCode.OK).json({
                status: 'success',
                code: HttpCode.OK,
                data: { message: 'Success' },
            });  
        };
        
        return res.status(HttpCode.UE).json({
            status: 'error',
            code: HttpCode.UE,
            data: { message: 'Unprocessable Entity' },
        });
    };
    

    res
        .status(HttpCode.NOT_FOUND)
        .json({
            status: 'error',
            code: HttpCode.NOT_FOUND,
            data: { message: 'User not found' },
        });
};

export { uploadAvatar, verifyUser, repeatEmailForVerifyUser };