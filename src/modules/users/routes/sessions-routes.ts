import {Router} from 'express';
import {celebrate, Joi, Segments} from "celebrate";
import SessionsController from "../controllers/SessionsController";

const sessionsRoutes = Router();

const sessionsController = new SessionsController();

sessionsRoutes.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            email: Joi.string().email().required(),
            password: Joi.string().required()
        }
    },{abortEarly: false}),
    sessionsController.create
);

export default sessionsRoutes;