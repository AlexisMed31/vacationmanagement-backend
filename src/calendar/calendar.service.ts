import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { databaseSchema } from 'src/database/database-schema';
import { DrizzleService } from 'src/database/drizzle.service';
import { UpdateCalendarDto } from './dto/update-calendar.dto';
import { CreateCalendarDto } from './dto/create-calendar.dto';

@Injectable()
export class CalendarService {
  constructor(private readonly drizzleService: DrizzleService) {}

  //_________________________________________________READ_________________________________________________
  async getAllCalendars() {
    try {
      const calendars = await this.drizzleService.db
        .select()
        .from(databaseSchema.calendar);
      if (!calendars) {
        throw new Error('Calendar not found');
      }
      return calendars;
    } catch (error) {
      console.log(error);
    }
  }

  async getCalendarById(id: number) {
    try {
      const calendar = await this.drizzleService.db
        .select()
        .from(databaseSchema.calendar)
        .where(eq(databaseSchema.calendar.calendarid, id));

      if (!calendar) {
        throw new Error('Calendar not found');
      }

      return calendar;
    } catch (error) {
      console.log(error);
    }
  }

  //_________________________________________________CREATE_________________________________________________
  async createCalendar(calendarData: CreateCalendarDto) {
    try {
      const calendar = await this.drizzleService.db
        .insert(databaseSchema.calendar)
        .values(calendarData)
        .returning();
      if (!calendar) {
        throw new Error('Calendar not found');
      }
      return calendar;
    } catch (error) {
      console.log(error);
    }
  }

  //_________________________________________________UPDATE_________________________________________________
  async updateCalendar(id: number, calendarData: UpdateCalendarDto) {
    try {
      const calendar = await this.drizzleService.db
        .update(databaseSchema.calendar)
        .set(calendarData)
        .where(eq(databaseSchema.calendar.calendarid, id))
        .returning();
      if (!calendar) {
        throw new Error('Calendar not found');
      }
      return calendar;
    } catch (error) {
      console.log(error);
    }
  }

  //_________________________________________________DELETE_________________________________________________
  async deleteCalendar(id: number) {
    try {
      const calendar = await this.drizzleService.db
        .delete(databaseSchema.calendar)
        .where(eq(databaseSchema.calendar.calendarid, id))
        .returning();
      if (!calendar) {
        throw new Error('Calendar not found');
      }
      return calendar;
    } catch (error) {
      console.log(error);
    }
  }
}
