export interface AuthState {
  token: string | null;
  userType: string | null;
}

export interface LayoutState {
  sidebarOpen: boolean;
  sidebarCollapsed: boolean;
}
