export interface User {
  id: string;
}

export interface AdminUser {
  id: string;
  email: string;
  password: string;
  displayName: string;
}