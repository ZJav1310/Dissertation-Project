type ProjectFile = {
  project_id?: number;
  file_id?: number;
  file_name: string;
  file_format?: string;
  file_location: string;
  file_date_upload: Date;
};

export default ProjectFile;
