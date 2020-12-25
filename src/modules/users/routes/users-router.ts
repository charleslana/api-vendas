import {Router} from 'express';
import {celebrate, Joi, Segments} from "celebrate";
import UsersController from "../controllers/UsersController";
import Authenticated from "../../../shared/http/middlewares/Authenticated";

const usersRouter = Router();

const usersController = new UsersController();

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

export default usersRouter;