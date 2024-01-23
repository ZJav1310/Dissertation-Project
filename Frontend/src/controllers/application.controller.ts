import AuthService from "@/services/auth.service";
import ProjectService from "@/services/project.service";
import ProjectApplication from "@/types/project.application.type";
import result from "@/types/result.type";
import UrlBuilder from "@/utils/url.builder";

class ApplicationController {
  static async apply(
    data: ProjectApplication
  ): Promise<result<ProjectApplication>> {
    const myHeaders = new Headers();

    const value = AuthService.getToken();

    if (value != null) {
      myHeaders.append("Authorization", value);
    }

    myHeaders.append("Content-Type", "application/json");

    const requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
      body: JSON.stringify(data),
    };

    return fetch(UrlBuilder.applyToProject(data.project_id), requestOptions)
      .then((response) => response.json())
      .then((result) => result)
      .catch((error) => error);
  }

  static async isFull(project_id: number) {
    const project = await ProjectService.getProjectById(project_id);
    const result = project.data;
    if (result !== undefined && !(result instanceof Array)) {
      const applicants =
        result.applications?.length !== undefined
          ? result.applications.length
          : 0;
      const max_capacity =
        result.max_capacity !== undefined ? result.max_capacity : -1;

      if (max_capacity === -1 || max_capacity > applicants) {
        return false;
      } else {
        return true;
      }
    }
  }

  static async isApplied(user_id: number, project_id: number) {
    const project = await ProjectService.getProjectById(project_id);
    const result = project.data;
    if (result !== undefined && !(result instanceof Array)) {
      const applicants =
        result.applications?.length !== undefined
          ? result.applications.length
          : 0;
      if (applicants > 0) {
        return (
          result.applications?.find((a) => a.user_id === user_id) !== undefined
        );
      }
    }
  }
}

export default ApplicationController;
