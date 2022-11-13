import { Inject, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigType } from "@nestjs/config";
import { UserPrincipal } from "../interface/user-principal";
import { JwtPayload } from "../interface/jwt-payload.interface";
import jwtConfig from "../../config/jwt.config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt-user") {
  constructor(@Inject(jwtConfig.KEY) config: ConfigType<typeof jwtConfig>){
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: config.secretKey
    });
  }

  validate(payload: JwtPayload): UserPrincipal{
    return {
      ...payload
    } as UserPrincipal;
  }
}
