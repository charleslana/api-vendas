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
            email: Joi.string().email().required()
        }
    }),
    forgotPasswordController.create
);

passwordRoutes.post(
    '/reset',
    celebrate({
        [Segments.BODY]: {
            token: Joi.string().uuid().required(),
            password: Joi.string().required(),
            password_confirmation: Joi.string().required().valid(Joi.ref('password'))
        }
    },{abortEarly: false}),
    resetPasswordController.create
);

export default passwordRoutes;