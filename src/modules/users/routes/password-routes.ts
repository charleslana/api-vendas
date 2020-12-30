import {Router} from 'express';
import {celebrate, Joi, Segments} from "celebrate";
import ForgotPasswordController from "../controllers/ForgotPasswordController";
import ResetPasswordController from "../controllers/ResetPasswordController";

const passwordRoutes = Router();

const forgotPasswordController = new ForgotPasswordController();

const resetPasswordController = new ResetPasswordController();

passwordRoutes.post(
    '/forgot',
    celebrate({
        [Segments.BODY]: {
            email: Joi.string().email().required().max(50)
        }
    }),
    forgotPasswordController.create
);

passwordRoutes.post(
    '/reset',
    celebrate({
        [Segments.BODY]: {
            token: Joi.string().uuid().required(),
            password: Joi.string().required().min(6).max(50),
            passwordConfirmation: Joi.string().required().valid(Joi.ref('password'))
        }
    },{abortEarly: false}),
    resetPasswordController.create
);

export default passwordRoutes;