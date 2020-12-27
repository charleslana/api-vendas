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
            name: Joi.string().trim().required(),
            email: Joi.string().email().required()
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
            name: Joi.string().trim().required(),
            email: Joi.string().email().required()
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