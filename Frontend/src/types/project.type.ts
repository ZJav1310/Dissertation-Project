import ProjectApplication from "./project.application.type";
import ProjectFile from "./project.file.type";
export type TContent = {
  description: string;
  references: string;
  index_terms: string[];
  degree_courses: string[];
  student_requirements: string;
  categories?: string[];
};

export type TOptional = {
  [key: string]: string;
};

type Project = {
  project_id?: number;
  project_title: string;
  project_content: TContent;
  max_capacity?: number;
  date_created?: Date;
  updated_at?: Date;
  application_deadline?: Date;
  author_id: number;
  applications?: ProjectApplication[];
  project_files?: ProjectFile[];
  categories?: string[];
  optional?: TOptional[];
};

export default Project;
