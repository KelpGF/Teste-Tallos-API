import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployeesModule } from './employees/employees.module';
import { AuthModule } from './auth/auth.module';
import { WebsocketService } from './websocket/websocket.service';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://root:123@mongokelvin.5kpqp.mongodb.net/test'
    ),
    EmployeesModule,
    AuthModule
  ],
  controllers: [],
  providers  : [WebsocketService],
})
export class AppModule {}
