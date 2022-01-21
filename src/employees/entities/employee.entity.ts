import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EmployeeDocument = Employee & Document;

@Schema()
export class Employee {
    
    @Prop()
    name: string;
    
    @Prop()
    wage: number;
    
    @Prop()
    role: string;
    
    @Prop()
    admission_date: Date;
    
    @Prop()
    email: string;
    
    @Prop()
    password: string;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
