import { UserInfo } from "./UserInfo";

export interface AuthState {
    token?: string | null;
    user?: UserInfo | null;
    error?: string | null;
  }
  