import { Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { EmployeeRoles } from './employeeRoles';
export class CreateEmployeeDto {
    @ApiProperty()
    @Prop({ required: true })
    name: string;
    
    @ApiProperty()
    @Prop({ required: true })
    wage: number;
    
    @ApiProperty({ enum: ['Admin', 'Moderator', 'User']})
    @Prop({ required: true })
    role: EmployeeRoles;
    
    @ApiProperty()
    @Prop({ required: true })
    admission_date: Date;
    
    @ApiProperty()
    @Prop({ required: true, unique: true })
    email: string;
    
    @ApiProperty()
    @Prop({ required: true })
    password: string;
}
