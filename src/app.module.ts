import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from './user/user.module';
import { User } from "./models/user.entity";
import { EmployeeModule } from './employee/employee.module';
import { VehicleModule } from './vehicle/vehicle.module';
import { RouteModule } from './route/route.module';
import { RepositoriesModule } from './repositories/repositories.module';
import { TaskModule } from './task/task.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User],
      synchronize: true,
    }),
    UserModule,
    EmployeeModule,
    VehicleModule,
    RouteModule,
    RepositoriesModule,
    TaskModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
