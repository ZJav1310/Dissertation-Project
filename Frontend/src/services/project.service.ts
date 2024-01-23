import ProjectController from "@/controllers/project.controller";
import Project from "@/types/project.type";
import result from "@/types/result.type";

class ProjectService {
  static async addProject(project: Project): Promise<result<Project>> {
    const result = await ProjectController.addProject(project);
    return result;
  }

  static async removeProject(id: number): Promise<result<Project>> {
    const result = await ProjectController.deleteProject(id);
    return result;
  }

  static async getProjectById(id: number): Promise<result<Project>> {
    const result = await ProjectController.getProjectById(id);
    return result;
  }

  static async updateProject(project: Project): Promise<result<Project>> {
    const result = await ProjectController.updateProject(project);
    return result;
  }

  static async getAll(): Promise<result<Project>> {
    const result = await ProjectController.getProjects();
    return result;
  }
}

export default ProjectService;
