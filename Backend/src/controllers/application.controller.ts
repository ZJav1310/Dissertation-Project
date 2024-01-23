import ApplicationService from "../services/application.services";
import createError from 'http-errors';
import logger from "../utils/Logger";

class ApplicationController {
    static apply = async (req: any, res: any, next: any) => {
        try {
            
            let toAdd = req.body;
            toAdd["date_applied"] = new Date(Date.now());

            const application = await ApplicationService.apply(toAdd);

            let state = application !== undefined ? true : false;

            res.status(200).json({
                status: state,
                message: state? 'Added Application' : 'Unable to add Application',
                data: application
            })

            logger.debug("Data sent to user client...", application);

        }
        catch (e: any) {
            next(createError(e.statusCode, e.message))
        }
    }
}

export default ApplicationController;