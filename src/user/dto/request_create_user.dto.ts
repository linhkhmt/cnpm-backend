import { IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from "class-validator";
import { User } from "../../models/user.entity";

export class RequestCreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly username: string

  @MinLength(8, {message: " The min length of password is 8 "})
  @MaxLength(20, {message: " The password can't accept more than 20 characters "})
  readonly password: string

  @IsNumber()
  @IsNotEmpty()
  readonly employeeId: number

  toUser(): User{
    const user = new User()
    user.username = this.username
    user.employeeId = this.employeeId
    return user;
  }
}
