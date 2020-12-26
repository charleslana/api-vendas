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
            name: Joi.string().trim().required(),
            email: Joi.string().email().required(),
            oldPassword: Joi.string(),
            password: Joi.string().optional(),
            passwordConfirmation: Joi.string().valid(Joi.ref('password')).when('password', {
                is: Joi.exist(),
                then: Joi.required()
            })
        }
    },{abortEarly: false}),
    profileController.update
);

export default profileRoutes;