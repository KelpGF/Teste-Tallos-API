import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { EmployeeRoles } from '../dto/employeeRoles';

export type EmployeeDocument = Employee & Document;

@Schema()
export class Employee {
  @ApiProperty()
	@Prop()
	name: string;
	
  @ApiProperty()
	@Prop()
	wage: number;
	
  @ApiProperty({ enum: ['Admin', 'Moderator', 'User']})
	@Prop()
	role: EmployeeRoles;
	
  @ApiProperty()
	@Prop()
	admission_date: Date;
	
  @ApiProperty()
	@Prop()
	email: string;
	
  @ApiProperty()
	@Prop()
	password: string;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
