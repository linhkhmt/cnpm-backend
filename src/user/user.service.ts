import { Injectable } from '@nestjs/common';
import { User } from "../models/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from "../repositories/user.repository";
import { RequestCreateUserDto } from "./dto/request_create_user.dto";
import * as bcrypt from 'bcrypt';
import { from, Observable } from "rxjs";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: UserRepository
  ){
  }

  findByUsername(username: string): Observable<User | undefined>{
    return from(this.usersRepository.findByUserName(username))
  }

  findAll(): Promise<User[]>{
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User>{
    return this.usersRepository.findOneBy({id});
  }

  async remove(id: string): Promise<void>{
    await this.usersRepository.delete(id);
  }

  async create(userDto: RequestCreateUserDto): Promise<User>{
    const user = userDto.toUser()
    user.passwordEncrypt = await bcrypt.hash(userDto.password, process.env.SALT_OR_ROUNDS);
    return this.usersRepository.save(user);
  }

  comparePassword(user: User, password): Observable<boolean>{
    return from(bcrypt.compare(password, user.passwordEncrypt));
  }
}
