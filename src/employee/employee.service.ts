import { Injectable } from '@nestjs/common';
import { databaseSchema } from 'src/database/database-schema';
import { DrizzleService } from '../database/drizzle.service';
import { eq } from 'drizzle-orm';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { LoginEmployeeDto } from './dto/login-employee.dto';

@Injectable()
export class EmployeeService {
  constructor(private readonly drizzleService: DrizzleService) {}

  //_________________________________________________READ_________________________________________________
  async getAllEmployees() {
    try {
      const employees = await this.drizzleService.db
        .select()
        .from(databaseSchema.employee);
      return employees;
    } catch (error) {
      console.log(error);
    }
  }

  async getEmployeeById(id: number) {
    try {
      const employee = await this.drizzleService.db
        .select()
        .from(databaseSchema.employee)
        .where(eq(databaseSchema.employee.employeeid, id));

      if (!employee) {
        throw new Error('Employee not found');
      }
      return employee;
    } catch (error) {
      console.log(error);
    }
  }

  async verifyUserCredentials(employeeData: LoginEmployeeDto): Promise<boolean> {
    try {
      const employee = await this.drizzleService.db
        .select()
        .from(databaseSchema.employee)
        .where(eq(databaseSchema.employee.username, employeeData.username))
        .limit(1); 

      if (employee.length === 0) {
        return false;
      }

      const storedPassword = employee[0].password; 
      if (storedPassword === employeeData.password) {
        return true; 
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false; 
    }
  }

  //_________________________________________________CREATE_________________________________________________

  async createEmployee(employeeData: CreateEmployeeDto) {
    try {
      const employee = await this.drizzleService.db
        .insert(databaseSchema.employee)
        .values(employeeData)
        .returning();

      if (!employee) {
        throw new Error('Employee not found');
      }
      return employee;
    } catch (error) {
      console.log(error);
    }
  }

  //_________________________________________________UPDATE_________________________________________________
  async updateEmployee(id: number, employeeData: UpdateEmployeeDto) {
    try {
      const employee = await this.drizzleService.db
        .update(databaseSchema.employee)
        .set(employeeData)
        .where(eq(databaseSchema.employee.employeeid, id))
        .returning();

      if (!employee) {
        throw new Error('Employee not found');
      }
      return employee;
    } catch (error) {
      console.log(error);
    }
  }

  //_________________________________________________DELETE_________________________________________________
  async deleteEmployee(id: number) {
    try {
      const employee = await this.drizzleService.db
        .delete(databaseSchema.employee)
        .where(eq(databaseSchema.employee.employeeid, id))
        .returning();

      if (!employee) {
        throw new Error('Employee not found');
      }
      return employee;
    } catch (error) {
      console.log(error);
    }
  }
}
