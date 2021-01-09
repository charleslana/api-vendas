import {NextFunction, Request, Response} from "express";
import AppError from "../../errors/AppError";
import {verify} from "jsonwebtoken";
import authConfig from '../../../config/auth'

interface InterfaceTokenPayload {
    iat: number;
    exp: number;
    sub: string;
}

export default function Authenticated(request: Request, response: Response, next: NextFunction): void {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new AppError('JWT token is missing.');
    }

    const [, token] = authHeader.split(' ');

    try {
        const decodedToken = verify(token, String(authConfig.jwt.secret));

        const {sub} = decodedToken as InterfaceTokenPayload;

        request.user = {
            id: sub
        }

        return next();
    } catch {
        throw new AppError('Invalid JWT token.');
    }
}