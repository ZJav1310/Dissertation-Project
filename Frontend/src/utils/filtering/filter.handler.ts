import Project from "@/types/project.type";

type TFilter = {
  name: string;
  execute: (projects: Project[]) => Project[];
};

class HandleFilters {
  public filterList(projects: Project[], filters: TFilter[]) {
    if (!filters) return projects;

    let f_projects = projects;
    filters.forEach((filter) => {
      if (filter.name === "sort") return;
      f_projects = filter.execute(f_projects) ?? [];
    });

    return f_projects;
  }

  /**
   * Compare the given field, which is an array, to the toCompare array.
   */
  public compareToArray(given: string[], toCompare: string[]) {
    return given.some((item) => toCompare.includes(item));
  }
  /**
   * Compare the given field, which is a string, to the toCompare array.
   */
  public compareToString(given: string, toCompare: string[]) {
    return toCompare.includes(given);
  }
}

export default HandleFilters;
