import {Router} from 'express';
import productsRouter from "../../../modules/products/routes/productsRouter";
import usersRoutes from "../../../modules/users/routes/usersRoutes";

const routes = Router();

routes.use('/products', productsRouter);

routes.use('/users', usersRoutes);

export default routes;