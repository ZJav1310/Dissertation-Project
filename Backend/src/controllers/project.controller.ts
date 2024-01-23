import ProjectServices from '../services/project.services';
import createError from 'http-errors';
import logger from '../utils/Logger';

class ProjectController {

    static all = async (req: any, res: any, next: any) => {
        try {
            const projects = await ProjectServices.all();

            res.status(200).json({
                status: true,
                message: 'All projects',
                data: projects
            })

            logger.debug(`Data sent to user client... ${projects.length} projects`);
        }
        catch (e: any) {
            next(createError(e.statusCode, e.message))
        }
    }

    static getById = async (req: any, res: any, next: any) => {
        try {

            let param = req.params;
            let id = parseInt(param.id);
            
            const project = await ProjectServices.getById(id);
     
            let state : boolean = !(project.project_id === -1 || project.project_id !== id);

            res.status(200).json({
                status: state,
                message: state? 'Project found' : 'No project found',
                data: project
            })
        }
        catch (e: any) {
            next(createError(e.statusCode, e.message))
        }
    }

    static add = async (req: any, res: any, next: any) => {
        try {
            
            let toAdd = req.body;

            const project = await ProjectServices.add(toAdd);
            let state = project !== undefined ? true : false;

            res.status(200).json({
                status: state,
                message: state? 'Added Project' : 'Unable to Add Project',
                data: project
            })

            logger.debug(`Data sent to user client... ${project}`);

        }
        catch (e: any) {
            next(createError(e.statusCode, e.message))
        }
    }

    static update = async (req: any, res: any, next: any) => {
        try {
            
            let toUpdate= req.body;

            const project = await ProjectServices.update(toUpdate);
            let state = project !== undefined ? true : false;

            res.status(200).json({
                status: state,
                message: state? 'Updated Project' : 'Unable to Update Project',
                data: project
            })

            logger.debug(`Data sent to user client... ${project}`);

        }
        catch (e: any) {
            next(createError(e.statusCode, e.message))
        }
    }

    static async delete(req: any, res: any, next: any) {
        try {
            
            let toDelete= req.body;

            const project = await ProjectServices.delete(toDelete);
            
            let state = project !== undefined ? true : false;

            res.status(200).json({
                status: state,
                message: state? 'Deleted Project' : 'Unable to Delete Project',
                data: project
            })

            logger.debug(`Data sent to user client... ${project}`);

        }
        catch (e: any) {
            next(createError(e.statusCode, e.message))
        }
    }

    static async uploadFile(req: any, res: any, next: any){
        return next(createError.MethodNotAllowed('Cannot upload file yet.'));
    }
}

export default ProjectController;