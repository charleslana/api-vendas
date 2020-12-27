import {Router} from 'express';
import productsRoutes from "../../../modules/products/routes/products-routes";
import usersRoutes from "../../../modules/users/routes/users-routes";
import sessionsRoutes from "../../../modules/users/routes/sessions-routes";
import passwordRoutes from "../../../modules/users/routes/password-routes";
import profileRoutes from "../../../modules/users/routes/profile-routes";
import customersRoutes from "../../../modules/customers/routes/customers-routes";

const routes = Router();

routes.use('/products', productsRoutes);

routes.use('/users', usersRoutes);

routes.use('/sessions', sessionsRoutes);

routes.use('/password', passwordRoutes);

routes.use('/profile', profileRoutes);

routes.use('/customers', customersRoutes);

export default routes;