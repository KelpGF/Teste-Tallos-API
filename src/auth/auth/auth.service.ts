import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EmployeesService } from 'src/employees/employees.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private employeeService: EmployeesService, private jwtService: JwtService) {}

  async login(email, password) {
    const user = await this.validateCredentials(email, password);

    const payload = {
      subject: user._id  ,
      name   : user.name ,
      email  : user.email,
      role   : user.role
    };

    const token = this.jwtService.sign(payload);

    return { token, user: payload };
  }

  async validateCredentials(email, password) {
    const user = await this.employeeService.findByCredentials(email);

    if (user) {
      const isMatch = bcrypt.compareSync(password, user.password);
  
        if (isMatch) {
          return user;
        }
      }

    throw new HttpException("Credenciais Inválidas!", HttpStatus.FORBIDDEN);
  }

  async getDataUser(id) {
    const user = await this.employeeService.findOne(id)

    return {
      name: user.name,
      role: user.role,
      email: user.email,
      exp: 0,
      iat: 0
    }
  }
}
