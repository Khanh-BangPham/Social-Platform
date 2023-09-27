import { api } from "../constants/api";
export interface LoginInput {
  email: string;
  password: string;
}

export interface LoginReponse {
  accessToken: string;
  refreshToken: string;
}

export const authService = {
  login: (data: LoginInput) => {
    return api.post<LoginReponse>("/auth/login", data);
  },
};
