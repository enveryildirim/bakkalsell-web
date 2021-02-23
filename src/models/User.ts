import { UserType } from "./UserType";

export interface User {
  id: number;
  name: string;
  username: string;
  password: string;
  userType: UserType;
}
