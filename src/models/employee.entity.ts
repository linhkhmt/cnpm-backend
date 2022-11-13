import { Column, Entity, PrimaryColumn } from "typeorm";
import { EmployeeType } from "../share/employee_type.enum";

@Entity()
export class Employee {
  @PrimaryColumn()
  id: number
  @Column()
  email: string
  @Column()
  firstName: string
  @Column()
  lastName: string
  @Column()
  displayName: string
  @Column()
  groupId: number
  @Column()
  departmentId: number
  @Column()
  lastLoginTime: Date
  @Column({
    type: "enum",
    enum: EmployeeType,
    default: EmployeeType.OFFICER,
  })
  employeeType: EmployeeType
}
