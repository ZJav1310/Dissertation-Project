import TemplateService from "../services/template.service";

import createError from "http-errors";
import logger from "../utils/Logger";

//TODO: Use the template model instead of project
class TemplateController {
  static getById = async (req: any, res: any, next: any) => {
    try {
      let param = req.params;
      let id = parseInt(param.id);

      const project = await TemplateService.getById(id);

      let state: boolean = !(
        project.project_id === -1 || project.project_id !== id
      );

      res.status(200).json({
        status: state,
        message: state ? "Project found" : "No project found",
        data: project,
      });
    } catch (e: any) {
      next(createError(e.statusCode, e.message));
    }
  };


}

export default TemplateController;
