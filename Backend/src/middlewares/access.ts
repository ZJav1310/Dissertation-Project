import createError from 'http-errors'

const userAccess = async (req: any, res: any, next: any) => {
    next()

    // TODO: This will deal with what the user can see based on their level
    
    // if (user.user_level === null || user.user_level === '') {
    //     return next(createError.Unauthorized('User Access is undefined aka you are not meant to be here...'))
    // } 
    // else {
    //     next()
    // }
}

export default userAccess;
