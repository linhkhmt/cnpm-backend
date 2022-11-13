import { UserRole } from "../../share/user_role.enum";

export class UserPrincipal {
  username: string
  id: number;
  role: UserRole;
  employeeId: number
}
