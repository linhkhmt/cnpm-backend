import { SetMetadata } from "@nestjs/common";
import { HAS_ROLE } from "../../share/auth.constants";
import { UserRole } from "../../share/user_role.enum";

export const HasRole = (roles: UserRole[]) => SetMetadata(HAS_ROLE, roles);
