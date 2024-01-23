import AddProjectView from "@/views/project/AddProjectView.vue";
import ViewMyProjectsView from "@/views/project/ViewMyProjectsView.vue";
import ProjectView from "@/views/project/ProjectView.vue";
import AddProjectSteps from "@/views/project/AddProjectSteps.vue";

import { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/new-project",
    name: "Add Project",
    component: AddProjectView,
  },
  {
    path: "/new-project-new",
    name: "Add",
    component: AddProjectSteps,
  },
  {
    path: "/view-projects",
    name: "View my projects",
    component: ViewMyProjectsView,
  },
  {
    path: "/project/:id",
    name: "View project",
    component: ProjectView,
  },
];

export default routes;
