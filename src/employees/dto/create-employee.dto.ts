import { Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEmail, IsEnum, IsNumber, IsString, MinLength } from 'class-validator';
import { EmployeeRoles } from './employeeRoles';
export class CreateEmployeeDto {
    @ApiProperty()
    @IsString({ message: 'Informe um nome válido!' })
    @MinLength(5, { message: 'O nome deve possuir pelo menos 5 caracteres!' })
    @Prop({ required: true })
    name: string;

    @ApiProperty()
    @IsNumber({}, { message: 'Informe um salário válido!' })
    @Prop({ required: true })
    wage: number;

    @ApiProperty({ enum: ['Admin', 'Moderator', 'User']})
    @IsEnum([ 'admin', 'manager', 'user' ], { message: 'Cargo inexistente!' })
    @Prop({ required: true })
    role: EmployeeRoles;
    
    @ApiProperty()
    @IsDateString({}, { message: 'Informe uma data válida!' })
    @Prop({ required: true })
    admission_date: Date;
    
    @ApiProperty()
    @IsEmail({}, { message: 'Informe um email válido!' })
    @Prop({  required: true, unique: true })
    email: string;
    
    @ApiProperty()
    @MinLength(3, { message: 'A senha deve possuir pelo menos 3 caracteres!' })
    @IsString({ message: 'Informe uma senha válida!' })
    @Prop({ required: true })
    password: string;
}
