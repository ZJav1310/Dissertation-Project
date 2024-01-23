import AuthService from '../services/auth.services';
import auth from '../services/auth.services';
import createError from 'http-errors';
import logger from '../utils/Logger';

/**
 * Controller deals with the requests and response
 */

class authController {

    //FIXME: At some point in register, the returned accessToken is 'function()' unless using sign in, why?

    static register = async (req: any, res: any, next: any) => {
        try {
            const user = await auth.register(req.body);

            if (user.user_id != -1) {
                res.status(200).json({
                    status: true,
                    message: 'User created successfully',
                    data: user
                })
                logger.debug(`Data sent to user client... ${user}`);
            } else {
                next(createError(400, "Can not create user."))
            }

        }
        catch (e: any) {
            next(createError(e.statusCode, e.message))
        }
    }

    static login = async (req: any, res: any, next: any) => {
        try {
            const data = await auth.login(req.body)
            
            res.status(200).json({
                status: true,
                message: "Account login successful",
                data
            })

        } catch (e: any) {
            next(createError(e.statusCode, e.message))
        }
    }

    static all = async (req: any, res: any, next: any) => {
        try {
            const users = await auth.all();
            res.status(200).json({
                status: true,
                message: 'All users',
                data: users
            })
        }
        catch (e: any) {
            next(createError(e.statusCode, e.message))
        }
    }

    static getById = async (req: any, res: any, next: any) => {
        try {

            let param = req.params;
            let id = parseInt(param.id);

            const user = await AuthService.getById(id);

            let state: boolean = !(user.user_id === -1 || user.user_id !== id);

            res.status(200).json({
                status: state,
                message: state ? 'User found' : 'No User found',
                data: user
            })
        }
        catch (e: any) {
            next(createError(e.statusCode, e.message))
        }
    }
}
export default authController;