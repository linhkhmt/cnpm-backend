import { Controller, Get, HttpStatus, Req, Res, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { RolesGuard } from "../auth/guards/roles.guard";
import { UserRole } from "../share/user_role.enum";
import { HasRole } from "../auth/guards/has-role.decorator";
import { AuthenticatedRequest } from "../auth/interface/authenticated-request.interface";
import { UserPrincipal } from "../auth/interface/user-principal";
import { EmployeeService } from "./employee.service";
import { Response } from "express";

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService){

  }

  @Get('/profile')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HasRole([UserRole.EMPLOYEE, UserRole.OFFICER, UserRole.ADMIN])
  profile(@Req() req: AuthenticatedRequest<UserPrincipal>, @Res() res: Response): Response{
    return res
      .status(HttpStatus.OK)
      .send({});

  }
}
