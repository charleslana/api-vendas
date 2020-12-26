import {Router} from 'express';
import {celebrate, Joi, Segments} from "celebrate";
import UsersController from "../controllers/UsersController";
import Authenticated from "../../../shared/http/middlewares/Authenticated";
import multer from "multer";
import uploadConfig from '../../../config/upload';
import UsersAvatarController from "../controllers/UsersAvatarController";

const usersRouter = Router();

const usersController = new UsersController();

const usersAvatarController = new UsersAvatarController();

const upload = multer(uploadConfig);

usersRouter.get('/', Authenticated, usersController.index);

usersRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required()
        }
    },{abortEarly: false}),
    usersController.create
);

usersRouter.patch(
    '/avatar',
    Authenticated,
    upload.single('avatar'),
    usersAvatarController.update
);

export default usersRouter;