import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { UserRole } from "../share/user_role.enum";

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number
  @Column()
  passwordEncrypt: string
  @Column()
  username: string
  @Column()
  employeeId: number
  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.EMPLOYEE,
  })
  roles: UserRole
}
