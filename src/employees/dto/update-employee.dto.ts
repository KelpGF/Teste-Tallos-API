
import { PartialType } from '@nestjs/mapped-types';
import { CreateEmployeeDto } from './create-employee.dto';
import { ApiProperty } from '@nestjs/swagger';
import { EmployeeRoles } from './employeeRoles';

export class UpdateEmployeeDto extends PartialType(CreateEmployeeDto) {
  @ApiProperty()
  name: string;
  
  @ApiProperty()
  wage: number;
  
  @ApiProperty({ enum: ['Admin', 'Moderator', 'User']})
  role: EmployeeRoles;
  
  @ApiProperty()
  admission_date: Date;
  
  @ApiProperty()
  email: string;
  
  @ApiProperty()
  password: string;
}
