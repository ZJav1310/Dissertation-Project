import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

import createError from "http-errors";
import jwtClass from "../utils/jwt";
import { File } from "buffer";

const prisma = new PrismaClient();

dotenv.config();

class ProjectService {
  static async delete(data: any) {
    let project = undefined;

    try {
      project = await prisma.project.delete({
        where: {
          project_id: data.project_id,
        },
      });
    } catch (e) {
      // project = { project_id: -1 }
    }
    return project;
  }

  static async update(data: any) {
    let project = undefined;
    try {
      project = await prisma.project.update({
        where: {
          project_id: data.project_id,
        },
        data,
      });
    } catch (e) {
      // data = { project_id: -1 }
    }
    return project;
  }

  static async getById(id: number) {
    try {
      let project = await prisma.project.findFirstOrThrow({
        where: {
          project_id: id,
        },
        include: {
          applications: true,
        },
      });
      return project;
    } catch (err) {
      return { project_id: -1 };
    }
  }

  static async add(data: any) {
    let project = undefined;
    try {
      project = await prisma.project.create({
        data,
      });
    } catch (e) {
      // project = { project_id: -1 }
    }
    return project;
  }

  static async all() {
    const allProjects = await prisma.project.findMany({
      include: {
        applications: true,
      },
    });
    return allProjects;
  }

  // static async uploadFile(project_id: number, data: File) {
  //   const fileUpload = await prisma.projectFile.create({
  //     data: {
  //       project_id: project_id,
  //       file_name: data.name,
  //       file_format: data.type,
  //       // file_location: data.path,
  //       file_date_upload: new Date(),
  //     },
  //   });
  //   return fileUpload;
  // }
}

export default ProjectService;
