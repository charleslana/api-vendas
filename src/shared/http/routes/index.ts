import {Router} from 'express';
import productsRouter from "../../../modules/products/routes/products-router";
import usersRouter from "../../../modules/users/routes/users-router";
import sessionsRouter from "../../../modules/users/routes/sessions-router";

const routes = Router();

routes.use('/products', productsRouter);

routes.use('/users', usersRouter);

routes.use('/sessions', sessionsRouter);

export default routes;