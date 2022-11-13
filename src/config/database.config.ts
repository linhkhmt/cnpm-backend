import { registerAs } from "@nestjs/config";
import { User } from "../models/user.entity";

export default registerAs("database", () => {
  return {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [User],
    synchronize: true,
  }
})
