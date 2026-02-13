export interface User {}

export interface AdminUser {
  id: string;
  email: string;
  password: string;
  displayName: string;
  profilePicture: string | null;
}