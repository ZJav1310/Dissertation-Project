import AuthController from "@/controllers/auth.controller";
import result from "@/types/result.type";
import User from "@/types/user.type";

class UserService {
  static async login(user: {
    email: string;
    password: string;
  }): Promise<result<User>> {
    const result = await AuthController.login(user);
    return result;
  }

  static async register(user: {
    email: string;
    password: string;
    name: string;
  }): Promise<result<User>> {
    const result = await AuthController.register(user);
    return result;
  }

  static async getUserById(id: number) {
    const result = await AuthController.getUserById(id);
    return result;
  }
}

export default UserService;
