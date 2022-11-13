import { map, Observable } from "rxjs";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { AuthService } from "./auth.service";
import { Controller, Post, Req, Res, UseGuards } from "@nestjs/common";
import { Response } from "express";

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService){
  }

  @UseGuards(LocalAuthGuard)
  @Post("/login")
  login(@Req() req: any, @Res() res: Response): Observable<Response>{
    return this.authService.login(req.user).pipe(
      map((r) => {
        return res
          .header("Authorization", "Bearer " + r.accessToken)
          .json(r)
          .send();
      })
    );
  }

  // @UseGuards(LocalAuthGuard)
  // @Post("/refresh-token")
  // refreshToken(@Req() req: any, @Res() res: Response): Observable<Response> {
  //   return this.authService.login(req.user).pipe(
  //     map((r) => {
  //       return res
  //         .header("Authorization", "Bearer " + r.accessToken)
  //         .json(r)
  //         .send();
  //     })
  //   );
  // }

}
