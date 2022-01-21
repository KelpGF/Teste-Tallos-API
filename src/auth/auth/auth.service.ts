import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EmployeesService } from 'src/employees/employees.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private employeeService: EmployeesService, private jwtService: JwtService) {}

  async login(email, password) {
    const user = await this.validateCredentials(email, password);

    const payload = {
      subject: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    };

    return this.jwtService.sign(payload);
  }

  async validateCredentials(email, password) {
    const user = await this.employeeService.findByCredentials(email);

    if (user && bcrypt.compare(password, user.password)) {
      return user;
    }

    throw new Error("Invalid Credentials");
  }
}
