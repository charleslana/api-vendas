import {Request, Response} from "express";
import UpdateUserAvatarService from "../services/UpdateUserAvatarService";
import AppError from "../../../shared/errors/AppError";

export default class UsersAvatarController {

    public async update(request: Request, response: Response): Promise<Response> {
        if(!request.file) {
            throw new AppError('Invalid field, required avatar.');
        }
        
        const updateAvatar = new UpdateUserAvatarService();

        const user = await updateAvatar.execute({
            userId: request.user.id,
            avatarFilename: request.file.filename
        });

        return response.json(user);
    }
}