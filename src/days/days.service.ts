import { Injectable, NotFoundException } from '@nestjs/common';
import { DrizzleService } from '../database/drizzle.service';
import { databaseSchema } from '../database/database-schema';
import { eq } from 'drizzle-orm';
import { CreateVacationDayDto } from './dto/create-vacationday.dto';
import { UpdateVacationDayDto } from './dto/update-vacationday.dto';

@Injectable()
export class DaysService {
  constructor(private readonly drizzleService: DrizzleService) {}

  getAll() {
    return this.drizzleService.db.select().from(databaseSchema.vacationdays);
  }

  async getById(id: number) {
    const vacationdays = await this.drizzleService.db
      .select()
      .from(databaseSchema.vacationdays)
      .where(eq(databaseSchema.vacationdays.daysid, id));
    const vacationDays = vacationdays.pop();
    if (!vacationDays) {
      throw new NotFoundException();
    }

    return vacationDays;
  }

  async create(vacationdays: CreateVacationDayDto) {
    const CreateVacationDay = await this.drizzleService.db
      .insert(databaseSchema.vacationdays)
      .values({
        ...vacationdays,
        lastupdated: new Date(),
      } as any)
      .returning();

    return CreateVacationDay.pop();
  }

  async update(id: number, vacationdays: UpdateVacationDayDto) {
    const updateCreateVacationDay = await this.drizzleService.db
      .update(databaseSchema.vacationdays)
      .set(vacationdays)
      .where(eq(databaseSchema.vacationdays.daysid, id))
      .returning();

    if (updateCreateVacationDay.length === 0) {
      throw new NotFoundException();
    }

    return updateCreateVacationDay.pop();
  }

  async delete(id: number) {
    const deleteVacationDay = await this.drizzleService.db
      .delete(databaseSchema.vacationdays)
      .where(eq(databaseSchema.vacationdays.daysid, id))
      .returning();

    if (deleteVacationDay.length === 0) {
      throw new NotFoundException();
    }
  }
}
