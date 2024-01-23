import config from "../config.json";

class UrlBuilder {
  static register = () => config.BASE_URL + "/auth";
  static login = () => config.BASE_URL + "/auth/login";
  static logout = () => config.BASE_URL + "/auth/logout";

  static getUserById = (user_id: number) =>
    `${config.BASE_URL}/auth/${user_id}`; // GET
  static getAllUsers = () => config.BASE_URL + "/auth"; // GET

  static getAllProjects = () => config.BASE_URL + "/projects"; // GET
  static getProjectById = (project_id: number) =>
    `${config.BASE_URL}/projects/${project_id}`; // GET
  static addProject = () => config.BASE_URL + "/projects";
  static deleteProject = (project_id: number) =>
    `${config.BASE_URL}/projects/${project_id}`;
  static updateProject = (project_id: number) =>
    `${config.BASE_URL}/projects/${project_id}`;

  static uploadFile = (project_id: number) =>
    `${config.BASE_URL}/projects/${project_id}/file`;
  static getFileList = (project_id: number) =>
    `${config.BASE_URL}/projects/${project_id}/file`; // GET

  static applyToProject = (project_id: number) =>
    `${config.BASE_URL}/projects/${project_id}/apply`;
}

export default UrlBuilder;
