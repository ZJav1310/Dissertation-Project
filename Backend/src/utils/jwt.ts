import jwt, { GetPublicKeyOrSecret, Secret } from 'jsonwebtoken';
import createError from 'http-errors';
import dotenv from 'dotenv';

dotenv.config()

class JwtClass {

    private accessTokenSecret;
    private static instance: JwtClass;

    constructor() {
        this.accessTokenSecret = 'ADASFJHFSF3453n'; //FIXME: For whatever reason, the token is not being read from .env, this needs to be fixed.
    }

    public static getInstance(): JwtClass {
        if (!JwtClass.instance) {
            JwtClass.instance = new JwtClass();
        }
        return JwtClass.instance;
    }

    public signAccessToken(payload: any) {

        if (this.accessTokenSecret !== undefined || this.accessTokenSecret !== null || this.accessTokenSecret !== '') {

            return new Promise((resolve, reject) => {

                // console.log("token check", this.accessTokenSecret)

                jwt.sign({ payload }, this.accessTokenSecret, {
                }, (err: any, token: unknown) => {
                    if (err) {
                        reject(createError.InternalServerError())
                    }
                    resolve(token)
                })
            })

        } else {
            createError.InternalServerError();
        }
    }
    static getToken(): any {
        throw new Error('Method not implemented.');
    }

    public verifyAccessToken(token: string) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, this.accessTokenSecret, (err, payload) => {
                if (err) {
                    const message = err.name == 'JsonWebTokenError' ? 'Unauthorized' : err.message
                    return reject(createError.Unauthorized(message))
                }
                return resolve(payload)
            })
        })
    }
}

export default JwtClass;
