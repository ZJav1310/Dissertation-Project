import ProjectApplication from "./project.application.type";
import Project from "./project.type";

type User = {
  user_id: number;
  user_email: string;
  //   user_password?: string;
  user_name: string;
  user_level: number;
  accessToken?: string;
  applied?: ProjectApplication[];
  projects?: Project[];
};

export default User;
