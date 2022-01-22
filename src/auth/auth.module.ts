import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt'
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { JwtStrategyService } from './jwt-strategy/jwt-strategy.service';
import { EmployeesModule } from 'src/employees/employees.module';

@Module({
	imports: [
		JwtModule.register({
			secret: "cwoi7122iasdi2",
			signOptions: {
				expiresIn: '1h',
			}
		}),
		EmployeesModule
	],
	controllers: [AuthController],
	providers: [AuthService, JwtStrategyService]
})
export class AuthModule {}
