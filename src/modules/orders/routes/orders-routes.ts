import {Router} from "express";
import {celebrate, Joi, Segments} from 'celebrate';
import OrdersController from "../controllers/OrdersController";
import Authenticated from "../../../shared/http/middlewares/Authenticated";

const ordersRoutes = Router();

const ordersController = new OrdersController();

ordersRoutes.use(Authenticated);

ordersRoutes.get(
    '/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required()
        }
    }),
    ordersController.show
);

ordersRoutes.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            customerId: Joi.string().uuid().required(),
            products: Joi.array().items(Joi.object({
                id: Joi.string().uuid().required(),
                quantity: Joi.number().required().min(1).max(10000)
            })).required()
        }
    },{abortEarly: false}),
    ordersController.create
);

export default ordersRoutes;