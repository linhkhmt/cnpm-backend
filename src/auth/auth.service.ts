import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from "../user/user.service";
import { JwtService } from "@nestjs/jwt";
import { from, map, mergeMap, Observable } from "rxjs";
import { UserPrincipal } from "./interface/user-principal";
import { JwtPayload } from "./interface/jwt-payload.interface";

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ){
  }

  validateUser(username: string, password: string): Observable<UserPrincipal>{
    return this.userService.findByUsername(username).pipe(
      mergeMap(user => {
        if(!user) {
          throw new UnauthorizedException("Username not match");
        } else {
          return this.userService.comparePassword(user, password).pipe(
            map(m => {
              if(m) {
                return {
                  username: user.username,
                  id: user.id,
                  role: user.roles,
                  employeeId: user.employeeId,
                } as UserPrincipal;
              } else {
                throw new UnauthorizedException("Password not match");
              }
            })
          );
        }
      })
    );
  }

  login(user: UserPrincipal): Observable<any>{
    const payload: JwtPayload = {...user};
    return from(this.jwtService.signAsync(payload)).pipe(
      map((access_token) => {
        return {accessToken: access_token, user: user};
      })
    );
  }
}
