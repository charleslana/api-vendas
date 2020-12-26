import {Router} from 'express';
import {celebrate, Joi, Segments} from "celebrate";
import UsersController from "../controllers/UsersController";
import Authenticated from "../../../shared/http/middlewares/Authenticated";
import multer from "multer";
import uploadConfig from '../../../config/upload';
import UsersAvatarController from "../controllers/UsersAvatarController";

const usersRoutes = Router();

const usersController = new UsersController();

const usersAvatarController = new UsersAvatarController();

const upload = multer(uploadConfig);

usersRoutes.get('/', Authenticated, usersController.index);

usersRoutes.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().trim().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required()
        }
    },{abortEarly: false}),
    usersController.create
);

usersRoutes.patch(
    '/avatar',
    Authenticated,
    upload.single('avatar'),
    usersAvatarController.update
);

export default usersRoutes;