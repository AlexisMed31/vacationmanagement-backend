import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { LoginEmployeeDto } from './dto/login-employee.dto';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get()
  async getAllEmployees() {
    return this.employeeService.getAllEmployees();
  }

  @Get(':id')
  async getEmployeeById(@Param('id', ParseIntPipe) id: number) {
    return this.employeeService.getEmployeeById(id);
  }

  @Post()
  async createEmployee(@Body() employeeData: CreateEmployeeDto) {
    return this.employeeService.createEmployee(employeeData);
  }

  @Patch(':id')
  async updateEmployee(
    @Param('id', ParseIntPipe) id: number,
    @Body() employeeData: UpdateEmployeeDto,
  ) {
    return this.employeeService.updateEmployee(id, employeeData);
  }

  @Delete(':id')
  async deleteEmployee(@Param('id', ParseIntPipe) id: number) {
    return this.employeeService.deleteEmployee(id);
  }

  @Post('login')
  async loginEmployee(@Body() employeeData: LoginEmployeeDto) {
    return this.employeeService.verifyUserCredentials(employeeData);
  }
}
