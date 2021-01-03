import {Router} from "express";
import {celebrate, Joi, Segments} from 'celebrate';
import CustomersController from "../controllers/CustomersController";
import Authenticated from "../../../shared/http/middlewares/Authenticated";

const customersRoutes = Router();

const customersController = new CustomersController();

customersRoutes.use(Authenticated);

customersRoutes.get('/', customersController.index);

customersRoutes.get(
    '/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required()
        }
    }),
    customersController.show
);

customersRoutes.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string()
                .pattern(new RegExp('^[a-zA-Z0-9 _]*$'))
                .trim().required().min(2).max(50),
            email: Joi.string().email().required().max(50)
        }
    },{abortEarly: false}),
    customersController.create
);

customersRoutes.put(
    '/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required()
        },
        [Segments.BODY]: {
            name: Joi.string()
                .pattern(new RegExp('^[a-zA-Z0-9 _]*$'))
                .trim().required().min(2).max(50),
            email: Joi.string().email().required().max(50)
        }
    },{abortEarly: false}),
    customersController.update
);

customersRoutes.delete(
    '/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required()
        }
    }),
    customersController.delete
);

export default customersRoutes;