import 'reflect-metadata';
import 'dotenv/config';
import express, {NextFunction, Request, Response} from 'express';
import 'express-async-errors';
import cors from 'cors';
import {errors} from 'celebrate';
import routes from './routes';
import AppError from "../errors/AppError";
import '../typeorm';
import uploadConfig from '../../config/upload';
import multer from "multer";
import {pagination} from 'typeorm-pagination';
import RateLimiter from "./middlewares/RateLimiter";

const app = express();

app.use(cors());

app.use(express.json());

app.use(RateLimiter);

app.use(pagination);

app.use('/files', express.static(uploadConfig.directory));

app.use(routes);

app.use(errors());

app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
        return response.status(error.statusCode).json({
            statusCode: error.statusCode,
            status: 'error',
            message: error.message
        });
    }

    if (error instanceof multer.MulterError) {
        return response.status(400).json({
            statusCode: 400,
            status: 'error',
            message: error.message
        });
    }

    return response.status(500).json({
        statusCode: 500,
        status: 'error',
        message: 'Internal server error'
    });
});

app.listen(3333, () => {
    console.log('Server started on port 3333.');
});