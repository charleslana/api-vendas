import {Router} from "express";
import ProductsController from "../controllers/ProductsController";
import {celebrate, Joi, Segments} from 'celebrate';

const productsRoutes = Router();

const productsController = new ProductsController();

productsRoutes.get('/', productsController.index);

productsRoutes.get(
    '/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required()
        }
    }),
    productsController.show
);

productsRoutes.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().trim().required(),
            price: Joi.number().precision(2).required(),
            quantity: Joi.number().required()
        }
    },{abortEarly: false}),
    productsController.create
);

productsRoutes.put(
    '/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required()
        },
        [Segments.BODY]: {
            name: Joi.string().trim().required(),
            price: Joi.number().precision(2).required(),
            quantity: Joi.number().required()
        }
    },{abortEarly: false}),
    productsController.update
);

productsRoutes.delete(
    '/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required()
        }
    }),
    productsController.delete
);

export default productsRoutes;