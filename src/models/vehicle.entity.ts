import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { VehicleType } from "../share/vehicle_type.enum";

@Entity()
export class VehicleEntity {
  @PrimaryGeneratedColumn()
  id: number
  @Column()
  licenceId: string
  @Column({
    type: "enum",
    enum: VehicleType,
    default: VehicleType.TRUCK,
  })
  typeVehicle: VehicleType
}
