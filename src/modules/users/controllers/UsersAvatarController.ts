import {Request, Response} from "express";
import UpdateUserAvatarService from "../services/UpdateUserAvatarService";

export default class UsersAvatarController {

    public async update(request: Request, response: Response): Promise<Response> {
        const updateAvatar = new UpdateUserAvatarService();

        const user = await updateAvatar.execute({
            userId: request.user.id,
            avatarFilename: request.file.filename
        });

        return response.json(user);
    }
}