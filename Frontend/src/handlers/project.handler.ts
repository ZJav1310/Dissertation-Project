import ProjectApplication from "@/types/project.application.type";
import ProjectFile from "@/types/project.file.type";
import Project, { TContent, TOptional } from "@/types/project.type";

class ProjectHandler {
  private id = -1;
  private title = "";
  private content: TContent = {
    description: "",
    references: "",
    index_terms: [],
    degree_courses: [],
    student_requirements: "",
    categories: [],
  };
  private maxCapacity = 1;
  private dateCreated = new Date();
  private updatedAt = new Date();
  private applicationDeadline?: Date = undefined;
  private authorId?: number;
  private applications?: ProjectApplication[];
  private projectFiles?: ProjectFile[];
  private optional?: TOptional[];

  constructor(project?: Project) {
    if (project) {
      this.id = project.project_id || -1;
      this.title = project.project_title;
      this.content = project.project_content;
      this.maxCapacity = project.max_capacity || 1;
      this.dateCreated = project.date_created || new Date();
      this.updatedAt = project.updated_at || new Date();
      this.applicationDeadline = project.application_deadline || undefined;
      this.authorId = project.author_id || undefined;
      this.applications = project.applications || undefined;
      this.projectFiles = project.project_files || undefined;
      this.content.categories = project.categories || undefined;
      this.optional = project.optional || undefined;
    }
  }

  public getId(): number {
    return this.id;
  }

  public setId(id: number): void {
    this.id = id;
  }

  public getTitle(): string {
    return this.title;
  }

  public setTitle(title: string): void {
    this.title = title;
  }

  public getContent(): TContent {
    return this.content;
  }

  public setContent(content: TContent): void {
    this.content = content;
  }

  public getMaxCapacity(): number {
    return this.maxCapacity;
  }

  public setMaxCapacity(maxCapacity: number): void {
    this.maxCapacity = maxCapacity;
  }

  public getDateCreated(): Date {
    return this.dateCreated;
  }

  public setDateCreated(dateCreated: Date): void {
    this.dateCreated = dateCreated;
  }

  public getUpdatedAt(): Date {
    return this.updatedAt;
  }

  public setUpdatedAt(updatedAt: Date): void {
    this.updatedAt = updatedAt;
  }

  public getApplicationDeadline(): Date | undefined {
    return this.applicationDeadline;
  }

  public setApplicationDeadline(applicationDeadline: Date | undefined): void {
    this.applicationDeadline = applicationDeadline;
  }

  public getAuthorId(): number | undefined {
    return this.authorId;
  }

  public setAuthorId(authorId: number | undefined): void {
    this.authorId = authorId;
  }

  public getApplications(): ProjectApplication[] | undefined {
    return this.applications;
  }

  public setApplications(applications: ProjectApplication[] | undefined): void {
    this.applications = applications;
  }

  public getProjectFiles(): ProjectFile[] | undefined {
    return this.projectFiles;
  }

  public setProjectFiles(projectFiles: ProjectFile[] | undefined): void {
    this.projectFiles = projectFiles;
  }

  public getOptional(): TOptional[] | undefined {
    return this.optional;
  }

  public setOptional(optional: TOptional[] | undefined): void {
    this.optional = optional;
  }

  public addIndexTerm(indexTerm: string): void {
    if (!this.content.index_terms) {
      this.content.index_terms = [];
    }
    this.content.index_terms.push(indexTerm);
  }

  public addDegreeCourses(degreeCourses: string): void {
    if (!this.content.degree_courses) {
      this.content.degree_courses = [];
    }
    this.content.degree_courses.push(degreeCourses);
  }

  public addProjectFile(projectFile: ProjectFile): void {
    if (!this.projectFiles) {
      this.projectFiles = [];
    }
    this.projectFiles.push(projectFile);
  }

  public addCategory(category: string): void {
    if (!this.content.categories) {
      this.content.categories = [];
    }
    this.content.categories.push(category);
  }

  public addOptional(key: string, optional: string): void {
    if (!this.optional) {
      this.optional = [];
    }
    this.optional.push({ [key]: optional });
  }

  public getProject(): Partial<Project> {
    return {
      project_id: this.id,
      project_title: this.title,
      project_content: this.content,
      max_capacity: this.maxCapacity,
      date_created: this.dateCreated,
      updated_at: this.updatedAt,
      application_deadline: this.applicationDeadline,
      author_id: this.authorId,
      applications: this.applications,
      project_files: this.projectFiles,
      optional: this.optional,
    };
  }

  public setTemplate(project: any): void {
    this.id = project.project_id || -1;
    this.title = project.project_title;
    this.content = project.project_content;
    this.maxCapacity = project.max_capacity || 1;
    this.dateCreated = project.date_created || new Date();
    this.updatedAt = project.updated_at || new Date();
    this.applicationDeadline = project.application_deadline || undefined;
    this.authorId = undefined;
    this.applications = project.applications || undefined;
    this.projectFiles = project.project_files || undefined;
    this.optional = project.optional || undefined;
  }

  public clear(): void {
    this.id = -1;
    this.title = "";
    this.content = {
      description: "",
      references: "",
      index_terms: [],
      degree_courses: [],
      student_requirements: "",
    };
    this.maxCapacity = 1;
    this.dateCreated = new Date();
    this.updatedAt = new Date();
    this.applicationDeadline = undefined;
    this.authorId = undefined;
    this.applications = undefined;
    this.projectFiles = undefined;
    this.optional = undefined;
  }

  public forDatabase() {
    return {
      project_title: this.title,
      project_content: this.content,
      max_capacity: this.maxCapacity,
      date_created: this.dateCreated,
      updated_at: this.updatedAt,
      application_deadline: this.applicationDeadline,
      author_id: this.authorId,
      project_optional_details: this.optional,
    };
  }

  public readFromDatabase(project: any) {
    this.id = project.project_id;
    this.title = project.project_title;
    this.content = project.project_content;
    this.maxCapacity = parseInt(project.max_capacity);
    this.dateCreated = new Date(project.date_created);
    this.updatedAt = new Date(project.updated_at);
    this.applicationDeadline = new Date(project.application_deadline);
    this.authorId = project.author_id;
    this.optional = project.project_optional_details;
  }
}

export default ProjectHandler;
