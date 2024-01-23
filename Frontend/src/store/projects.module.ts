import ProjectService from "@/services/project.service";
import Project from "@/types/project.type";
import { defineStore } from "pinia";

export type RootState = {
  data: {
    projects: Project[];
  };
  loading: boolean;
};

export const useProjectStore = defineStore({
  id: "projectStore",
  state: (): RootState => ({
    data: {
      projects: [],
    },
    loading: false,
  }),
  persist: {
    storage: sessionStorage,
    paths: ["data"],
  },
  getters: {
    returnProjects: (state) => state.data.projects,
  },
  actions: {
    createNewProject(project: Project) {
      if (!project) return false;

      this.data.projects.push(project);
      return true;
    },
    updateProject(id: number, payload: Project) {
      if (!id || !payload) return false;

      const project = this.findProjectIndex(id);

      if (project !== -1) {
        this.data.projects[project] = payload;
        return true;
      }
    },
    deleteProject(id: number) {
      const project = this.findProjectIndex(id);

      if (project === -1) return false;

      this.data.projects.splice(project, 1);
      return true;
    },
    findProjectIndex(id: number) {
      return this.data.projects.findIndex(
        (project) => project.project_id === id
      );
    },
    getProjectById(id: number) {
      return this.returnProjects[this.findProjectIndex(id)];
    },
    logProjects() {
      console.log(this.data.projects);
    },
    fetchProjects() {
      ProjectService.getAll().then((projects) => {
        if (Array.isArray(projects.data)) {
          this.data.projects = projects.data;
        }
        // console.log("Projects in state", projects.data);
      });
    },
  },
});
