export interface UserInfo {
    id: string;
    firstname: string;
    email: string;
    role: 'ADMIN' | 'USER'; // or just string if dynamic
    createdAt: string; // or Date if parsed
    updatedAt: string;
  }