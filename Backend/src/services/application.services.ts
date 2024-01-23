import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

import createError from "http-errors";
import jwtClass from "../utils/jwt";

const prisma = new PrismaClient();

dotenv.config();

class ApplicationService {
//   static async delete(data: any) {
//     let application = undefined;

//     try {
//       application = await prisma.projectApplications.delete({
//         where: {
//           user_id_project_id: {
//             user_id: data.user_id,
//             project_id: data.project_id,
//           },
//         },
//       });
//     } catch (e) {
//       // project = { project_id: -1 }
//     }
//     return application;
//   }

//   static async update(data: any) {
//     let application = undefined;
//     try {
//       application = await prisma.projectApplications.update({
//         where: {
//           user_id_project_id: {
//             user_id: data.user_id,
//             project_id: data.project_id,
//           },
//         },
//         data,
//       });
//     } catch (e) {
//       // data = { project_id: -1 }
//     }
//     return application;
//   }

  static async apply(data: any) {
    let application = undefined;
    try {
      application = await prisma.projectApplications.create({
        data,
      });
    } catch (e) {
      // project = { project_id: -1 }
    }
    return application;
  }

  static async all() {
    const allApplications = await prisma.projectApplications.findMany({
      include: {
        user: true
      },
    });
    return allApplications;
  }
}

export default ApplicationService;
