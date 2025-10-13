export interface LoginResponse {
  token: string;
  userType: "Admin" | "User";
}

export interface LoginData {
  userName: string;
  password: string;
}
