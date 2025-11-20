export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AdminData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role?: 'admin' | 'superadmin';
}
