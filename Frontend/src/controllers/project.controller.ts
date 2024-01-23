import Project from "@/types/project.type";
import result from "@/types/result.type";
import UrlBuilder from "@/utils/url.builder";
import AuthService from "@/services/auth.service";
import { useUserStore } from "@/store/auth.module";

/**
 * - Get all Proejcts
 *   New Project
 */

class ProjectController {
  static async getProjects(): Promise<result<Project>> {
    const myHeaders = new Headers();
    const value = AuthService.getToken();

    if (value != null) {
      myHeaders.append("Authorization", value);
    }

    myHeaders.append("Content-Type", "application/json");

    const requestOptions: RequestInit = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    // "http://localhost:5000/projects"
    return fetch(UrlBuilder.getAllProjects(), requestOptions)
      .then((response) => response.json())
      .then((result) => result)
      .catch((error) => error);
  }

  static async addProject(data: Project): Promise<result<Project>> {
    const user = useUserStore();
    const myHeaders = new Headers();

    const value = AuthService.getToken();

    //FIXME: There mst be a more elegant way of checking user levels?
    if (user != null && user.data.user.user_level > 1) {
      data.author_id = user.data.user.user_id;
    }

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

    return fetch(UrlBuilder.addProject(), requestOptions)
      .then((response) => response.json())
      .then((result) => result)
      .catch((error) => error);
  }

  static async getProjectById(id: number): Promise<result<Project>> {
    const myHeaders = new Headers();

    const value = AuthService.getToken();

    if (value != null) {
      myHeaders.append("Authorization", value);
    }

    myHeaders.append("Content-Type", "application/json");

    const requestOptions: RequestInit = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    return fetch(UrlBuilder.getProjectById(id), requestOptions)
      .then((response) => response.json())
      .then((result) => result)
      .catch((error) => error);
  }

  static async deleteProject(id: number): Promise<result<Project>> {
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
      body: JSON.stringify({ project_id: id }),
    };

    return fetch(UrlBuilder.deleteProject(id), requestOptions)
      .then((response) => response.text())
      .then((result) => result)
      .catch((error) => error);
  }

  static async updateProject(data: Project): Promise<result<Project>> {
    const myHeaders = new Headers();
    const value = AuthService.getToken();

    console.log("data update...", data);
    let id = -1;
    if (data.project_id != null) {
      id = data.project_id;
    }
    if (value != null) {
      myHeaders.append("Authorization", value);
    }

    myHeaders.append("Content-Type", "application/json");

    const requestOptions: RequestInit = {
      method: "PUT",
      headers: myHeaders,
      redirect: "follow",
      body: JSON.stringify(data),
    };

    return fetch(UrlBuilder.updateProject(id), requestOptions)
      .then((response) => response.json())
      .then((result) => result)
      .catch((error) => error);
  }
}

export default ProjectController;
