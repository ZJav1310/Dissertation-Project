import AuthController from "@/controllers/auth.controller";

class AuthService {
  static getToken() {
    return AuthController.getToken();
  }
}

export default AuthService;
