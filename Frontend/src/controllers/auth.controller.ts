import result from "@/types/result.type";
import User from "@/types/user.type";
import UrlBuilder from "@/utils/url.builder";

class AuthController {
  static async login(data: { email: string; password: string }) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      email: data.email,
      password: data.password,
    });

    const requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    // "http://localhost:5000/auth/login"
    return fetch(UrlBuilder.login(), requestOptions)
      .then((response) => response.json())
      .then((result) => result)
      .catch((error) => error);
  }

  static async register(data: {
    email: string;
    password: string;
    name: string;
  }) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      email: data.email,
      password: data.password,
      name: data.name,
    });

    const requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    // "http://localhost:5000/auth/login"
    return fetch(UrlBuilder.register(), requestOptions)
      .then((response) => response.json())
      .then((result) => result)
      .catch((error) => error);
  }

  static getToken() {
    const parsed = JSON.parse(localStorage.getItem("userStore") || "");
    console.log(parsed);
    return parsed.data.user.accessToken;
  }

  static async getUserById(id: number): Promise<result<User>> {
    const myHeaders = new Headers();

    const value = this.getToken();

    if (value != null) {
      myHeaders.append("Authorization", value);
    }

    myHeaders.append("Content-Type", "application/json");

    const requestOptions: RequestInit = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    return fetch(UrlBuilder.getUserById(id), requestOptions)
      .then((response) => response.json())
      .then((result) => result)
      .catch((error) => error);
  }
}

export default AuthController;
