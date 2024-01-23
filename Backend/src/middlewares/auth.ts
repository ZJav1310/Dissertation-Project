import JwtClass from '../utils/jwt'
import createError from 'http-errors'

const auth = async (req: any, res: any, next: any) => {

    if (req.headers.authorization === null || req.headers.authorization === '') {
        return next(createError.Unauthorized('Access token is required'))
    } else {

        const token = req.headers.authorization;

        await JwtClass.getInstance().verifyAccessToken(token).then((user: any) => {
            req.user = user
            next()
        }).catch((e: { message: string | undefined }) => {
            next(createError.Unauthorized(e.message))
        })
    }
}

export default auth;
