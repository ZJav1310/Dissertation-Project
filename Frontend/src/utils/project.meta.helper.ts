import Project from "@/types/project.type";
import User from "@/types/user.type";
import IconHelper, { IconMeta } from "./project.icon.helper";

class MetaHelper {
  static isProjectOwner(project: Project, user: User) {
    return project.author_id === user.user_id;
  }

  static isPastDue(project: Project) {
    const now = new Date();
    return project.application_deadline
      ? project.application_deadline.getUTCMilliseconds() <
          now.getUTCMilliseconds()
      : false;
  }

  static isFull(project: Project) {
    return project.applications?.length && project.max_capacity
      ? project.applications.length >= project.max_capacity
      : false;
  }

  static spacesRemaining(project: Project) {
    if (!project.max_capacity) return 100;
    return project.applications && project.max_capacity !== undefined
      ? project.max_capacity - project.applications.length
      : undefined;
  }

  static applicantCount(project: Project) {
    return project.applications?.length ?? 0;
  }

  static getIcons(project: Project): IconMeta {
    const applicant_count = this.applicantCount(project);
    const max_capacity = project.max_capacity;

    if (!max_capacity) return IconHelper.empty();

    const percentage = this.getPercentage(applicant_count, max_capacity);

    if (percentage >= 100) {
      return IconHelper.empty();
    }
    if (percentage > 50) {
      return IconHelper.halfway();
    }
    if (percentage > 10) {
      return IconHelper.lastFew();
    }
    if (percentage <= 0) {
      return IconHelper.full();
    }
    return IconHelper.empty();
  }

  static convertDate(date: Date | undefined, message: string) {
    return date ? new Date(date).toUTCString() : message;
  }

  static getPercentage(min: number, max: number) {
    // console.log("Percentage", (min / max) * 100);
    return Math.ceil(100 - (min / max) * 100);
  }
  static projectUrl(project: Project) {
    return "/project/" + project.project_id;
  }
}

export default MetaHelper;
