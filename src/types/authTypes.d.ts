export interface LoginResponse {
  authentication: string;
  userType: "Admin" | "User";
}

export interface LoginData {
  userName: string;
  password: string;
}
