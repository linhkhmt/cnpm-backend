import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { AuthGuard } from "@nestjs/passport";
import { Reflector } from "@nestjs/core";
import { UserRole } from "../../share/user_role.enum";
import { METADATA } from "../../share/api-metadata";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt-employee") {
  constructor(private reflector: Reflector){
    super();
  }

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean>{
    const isPublic = this.reflector.getAllAndOverride(METADATA.PUBLIC, [context.getHandler, context.getClass]);
    if(isPublic) return true;
    return super.canActivate(context);
  }

  handleRequest(err, user){
    if(!user || err || user.role != UserRole.EMPLOYEE) {
      throw new UnauthorizedException();
    }
    return user;
  }
}

@Injectable()
export class JwtEnterpriseAuthGuard extends AuthGuard("jwt-officer") {
  constructor(private reflector: Reflector){
    super();
  }

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean>{
    const isPublic: boolean = this.reflector.getAllAndOverride(METADATA.PUBLIC, [context.getHandler(), context.getClass()]);
    if(isPublic) return true;
    return super.canActivate(context);
  }

  handleRequest(err, user){
    if(!user || err || user.role != UserRole.OFFICER) {
      throw new UnauthorizedException();
    }
    return user;
  }
}

@Injectable()
export class JwtAdminAuthGuard extends AuthGuard("jwt-admin") {
  constructor(private reflector: Reflector){
    super();
  }

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean>{
    const isPublic: boolean = this.reflector.getAllAndOverride(METADATA.PUBLIC, [context.getHandler(), context.getClass()]);
    if(isPublic) return true;
    return super.canActivate(context);
  }

  handleRequest(err, user){
    if(!user || err || user.role != UserRole.ADMIN) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
