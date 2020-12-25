import {Router} from 'express';
import {celebrate, Joi, Segments} from "celebrate";
import UsersController from "../controllers/UsersController";

const usersRoutes = Router();

const usersController = new UsersController();

usersRoutes.get('/', usersController.index);

usersRoutes.post(
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

export default usersRoutes;