import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Employee, EmployeeDocument } from './entities/employee.entity';

@Injectable()
export class EmployeesService {

  constructor(@InjectModel(Employee.name) private employeeModel: Model<EmployeeDocument>) {}

  create(createEmployeeDto: CreateEmployeeDto) {
    const user = new this.employeeModel(createEmployeeDto);

    return user.save();
  }

  findAll() {
    return this.employeeModel.find().select("name wage role admission_date email");
  }

  findOne(id: string) {
    return this.employeeModel.findById(id).select("name wage role admission_date email");;
  }

  update(id: string, updateEmployeeDto: UpdateEmployeeDto) {

    return this.employeeModel.findByIdAndUpdate(
      {
        _id: id
      },
      {
        $set: updateEmployeeDto
      },
      {
        new: true
      }
    );
  }

  remove(id: string) {
    return this.employeeModel
                .deleteOne({
                  _id: id
                })
                .exec();
  }
}
