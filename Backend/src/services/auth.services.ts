import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import createError from "http-errors";

import { AccessEnum } from "../utils/access.enum";
import jwtClass from "../utils/jwt";
import logger from "../utils/Logger";

const prisma = new PrismaClient();

dotenv.config();

class AuthService {
  static async register(data: any) {
    const { email, name } = data;

    data.password = bcrypt.hashSync(data.password, 8);
    
    let user = async () =>
      await prisma.user.create({
        data: {
          user_email: data.email,
          user_password: data.password,
          user_name: data.name,
          user_level: AccessEnum.Unauthorized,
        },
      });

    data.accessToken = async () =>
      await jwtClass.getInstance().signAccessToken(user);

    return user().then(
      (user) => {
        return user;
      },
      (err) => {
        return { user_id: -1 };
      }
    );
  }

  //FIXME: Change email to user_email to make everything standard?
  static async login(data: { email: string; password: string }) {
    // console.log(data);
    const user = await prisma.user.findUnique({
      where: {
        user_email: data.email,
      },
    });

    logger.debug(`User data for login... ${user}`);

    if (!user) {
      throw createError.NotFound("User not registered");
    }

    const checkPassword = bcrypt.compareSync(data.password, user.user_password);

    if (!checkPassword) {
      throw createError.Unauthorized("Email address or password not valid");
    }

    // delete user.user_password

    const accessToken = await jwtClass.getInstance().signAccessToken(user);

    return { ...user, accessToken };
  }

  static async all() {
    const allUsers = await prisma.user.findMany({
      include: {
        applied: true,
        projects: true,
      },
    });
    return allUsers;
  }

  static async getById(id: number) {
    let user = { user_id: -1 };

    try {
      user = await prisma.user.findFirstOrThrow({
        where: {
          user_id: id,
        },
        include: {
          applied: true,
          projects: true,
        },
      });
    } catch (err) {
      // console.log("Project not found.")
      user = { user_id: -1 };
    }

    return user;
  }
}

export default AuthService;
