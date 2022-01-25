import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Employee, EmployeeDocument } from './entities/employee.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class EmployeesService {

  constructor(@InjectModel(Employee.name) private employeeModel: Model<EmployeeDocument>) {}

  async create(createEmployeeDto: CreateEmployeeDto) {
    createEmployeeDto.password = await bcrypt.hash(createEmployeeDto.password, 12);
    const user = new this.employeeModel(createEmployeeDto);

    return user.save();
  }

  findAll() {
    return this.employeeModel.find().select("name wage role admission_date");
  }

  findOne(id: string) {
    return this.employeeModel.findById(id).select("name wage role admission_date email").then(function(user) {
      if (!user) {
        throw new HttpException("Nenhum funcionário encontrado!", HttpStatus.NOT_FOUND);
      }

      return user;
    }).catch(function(err) {
      throw new HttpException("Nenhum funcionário encontrado!", HttpStatus.NOT_FOUND);
    });
  }

  findByCredentials(email: string) {
    return this.employeeModel.findOne({
      email: email
    }).select("_id name email role password");
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
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
    )
    .catch(function(err) {
      throw new HttpException("Não foi possível editar o funcionário!", HttpStatus.BAD_REQUEST);
    });
  }

  remove(id: string) {
    return this.employeeModel
                  .deleteOne({
                    _id: id
                  })
                  .exec()
                  .catch(function(err) {
                    throw new HttpException("Não foi possível deletar o funcionário!", HttpStatus.BAD_REQUEST);
                  });
  }
}
