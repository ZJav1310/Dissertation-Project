enum endpoint {
  register = "/auth",
  login = "/auth/login",
  logout = "/auth/logout",

  getUserById = "/auth/{user_id}", // GET
  getAllUsers = "/auth", // GET

  getAllProjects = "/projects", // GET
  getProjectById = "/projects/{project_id}/", // GET
  addProject = "/projects",
  deleteProject = "/projects/{project_id}",
  updateProject = "/projects/{project_id}",

  uploadFile = "/projects/{project_id}/file",
  getFileList = "/projects/{project_id}/file", // GET
}

export default endpoint;
