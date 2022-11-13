import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigModule, ConfigType } from "@nestjs/config";
import jwtConfig from "../config/jwt.config";
import { PassportModule } from "@nestjs/passport";
import { JwtModule, JwtModuleOptions } from "@nestjs/jwt";
import { UserModule } from "../user/user.module";
import { LocalStrategy } from "./strategy/local.strategy";
import { JwtStrategy } from "./strategy/jwt.strategy";

@Module({
  imports: [
    ConfigModule.forFeature(jwtConfig),
    PassportModule.register({defaultStrategy: "jwt"}),
    JwtModule.registerAsync({
      imports: [
        ConfigModule.forFeature(jwtConfig)
      ],
      useFactory: (config: ConfigType<typeof jwtConfig>) => {
        return {
          secret: config.secretKey,
          signOptions: {
            expiresIn: config.expiresIn
          }
        } as JwtModuleOptions;
      },
      inject: [
        jwtConfig.KEY
      ]
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {
}
