import ApplicationController from "@/controllers/application.controller";
import ProjectApplication from "@/types/project.application.type";

class ApplicationService {
  static async apply(application: ProjectApplication) {
    const result = await ApplicationController.apply(application);
    return result;
  }

  static async isFull(project_id: number) {
    const result = await ApplicationController.isFull(project_id);
    return result;
  }

  static async isApplied(user_id: number, project_id: number) {
    const result = await ApplicationController.isApplied(user_id, project_id);
    return result;
  }
}

export default ApplicationService;
