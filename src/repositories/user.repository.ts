import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { User } from "../models/user.entity";

@Injectable()
export class UserRepository extends Repository<User> {

  constructor(private datasource: DataSource){
    super(User, datasource.createEntityManager());
  }

  async findByUserName(username: string): Promise<User | undefined>{
    return await this.firstWhere("username", username)
  }

  async firstWhere(column: string, value: string | number, operator = '='): Promise<User | undefined>{
    return await this.createQueryBuilder()
      .where(`user.${column} ${operator} :value`, {value: value})
      .getOne();
  }
}
