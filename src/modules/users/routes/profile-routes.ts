import {Router} from 'express';
import {celebrate, Joi, Segments} from "celebrate";
import Authenticated from "../../../shared/http/middlewares/Authenticated";
import ProfileController from "../controllers/ProfileController";

const profileRoutes = Router();

const profileController = new ProfileController();

profileRoutes.use(Authenticated);

profileRoutes.get('/', profileController.show);

profileRoutes.put(
    '/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().trim().required().min(2).max(50),
            email: Joi.string().email().required().max(50),
            oldPassword: Joi.string().max(50),
            password: Joi.string().optional().min(6).max(50),
            passwordConfirmation: Joi.string().valid(Joi.ref('password')).when('password', {
                is: Joi.exist(),
                then: Joi.required()
            })
        }
    },{abortEarly: false}),
    profileController.update
);

export default profileRoutes;