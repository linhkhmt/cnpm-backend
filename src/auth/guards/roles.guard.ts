import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { UserRole } from "../../share/user_role.enum";
import { HAS_ROLE } from "../../share/auth.constants";
import { AuthenticatedRequest } from "../interface/authenticated-request.interface";
import { UserPrincipal } from "../interface/user-principal";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector){
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>{
    const roles: UserRole[] = this.reflector.get<UserRole[]>(HAS_ROLE, context.getHandler());
    if(!roles || roles.length == 0) {
      return true;
    }
    const {user} = context.switchToHttp().getRequest() as AuthenticatedRequest<UserPrincipal>;
    // return user.roles && user.roles.some((role) => roles.includes(role));
    return true;
  }
}
