import { UserRole } from "../../share/user_role.enum";

export class JwtPayload {
  username: string;
  id: number;
  employeeId: number;
  role: UserRole;
}
