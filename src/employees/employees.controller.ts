import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpCode } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { JwtGuard } from 'src/auth/auth/jwt.guard';
import { Role } from 'src/auth/role.decorator';
import { RoleGuard } from 'src/auth/role.guard';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiNotFoundResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Employee } from './entities/employee.entity';

@ApiTags('Employee')
@UseGuards(JwtGuard, RoleGuard)
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Role(['admin', 'manager'])
  @HttpCode(200)
  @ApiTags('Employee')
  @ApiBearerAuth('JWT-auth')
  @ApiUnauthorizedResponse({ description: 'Token inválido.'})
  @ApiOkResponse({
    description: 'Dados do usuário cadastrado.',
    type: Employee
  })
  @ApiBody({ type: CreateEmployeeDto })
  @Post()
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeesService.create(createEmployeeDto);
  }

  @HttpCode(200)
  @ApiTags('Employee')
  @ApiBearerAuth('JWT-auth')
  @ApiUnauthorizedResponse({ description: 'Token inválido.'})
  @ApiOkResponse({
    description: 'Array dos usuários registrados.',
    schema: {
      type: 'array',
      items: {
        type: 'Object',
        example: `
          {
            "_id": "61ef0f1068385152569bc444",
            "admission_date": "2022-01-11T00:00:00.000Z",
            "role": "manager",
            "wage": 3000,
            "name": "User Example"
          }
        `
      }
    }
  })
  @Get()
  findAll() {
    return this.employeesService.findAll();
  }

  @HttpCode(200)
  @ApiTags('Employee')
  @ApiBearerAuth('JWT-auth')
  @ApiUnauthorizedResponse({ description: 'Token inválido.'})
  @ApiOkResponse({
    description: 'Dados do usuário consultado.',
    type: Employee
  })
  @ApiNotFoundResponse({
    description: 'Nenhum usuário com o id informado',
    schema: {
      type: 'Object',
      example: `
        {
          "statusCode": 404,
          "message": "Nenhum funcionário encontrado!"
        }
      `
    }
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeesService.findOne(id);
  }

  @Role(['admin', 'manager'])
  @HttpCode(200)
  @ApiTags('Employee')
  @ApiBearerAuth('JWT-auth')
  @ApiUnauthorizedResponse({ description: 'Token inválido.'})
  @ApiOkResponse({
    description: 'Dados do usuário editado.',
    type: Employee
  })
  @ApiBadRequestResponse({
    description: 'Problema ao editar o funcionário. Id ou dados inválidos',
    schema: {
      type: 'Object',
      example: `
        {
          "statusCode": 400,
          "message": "Não foi possível editar o funcionário!"
        }
      `
    }
  })
  @ApiBody({ type: UpdateEmployeeDto })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmployeeDto: UpdateEmployeeDto) {
    return this.employeesService.update(id, updateEmployeeDto);
  }

  @Role(['admin'])
  @HttpCode(200)
  @ApiTags('Employee')
  @ApiBearerAuth('JWT-auth')
  @ApiUnauthorizedResponse({ description: 'Token inválido.'})
  @ApiOkResponse({
    description: 'Quantidade de registros deletados.',
    schema: {
      type: 'Object',
      example: '{ "deletedCount": 1 }'
    }
  })
  @ApiBadRequestResponse({
    description: 'Problema ao editar o funcionário. Id inválido',
    schema: {
      type: 'Object',
      example: `
        {
          "statusCode": 400,
          "message": "Não foi possível deletar o funcionário!"
        }
      `
    }
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeesService.remove(id);
  }
}
