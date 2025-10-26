export interface ProtectedRouteProps {
  allowedRoles: string[];
}

export interface JwtPayload {
  exp: number;
}
