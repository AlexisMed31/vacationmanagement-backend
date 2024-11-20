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
import { CalendarService } from './calendar.service';
import { CreateCalendarDto } from './dto/create-calendar.dto';

@Controller('calendar')
export class CalendarController {
  constructor(private readonly calendarService: CalendarService) {}

  @Get()
  async getAllCalendars() {
    return this.calendarService.getAllCalendars();
  }

  @Get(':id')
  async getCalendarById(@Param('id', ParseIntPipe) id: number) {
    return this.calendarService.getCalendarById(id);
  }

  @Post()
  async createCalendar(@Body() calendarData: CreateCalendarDto) {
    return this.calendarService.createCalendar(calendarData);
  }

  @Patch(':id')
  async updateCalendar(
    @Param('id', ParseIntPipe) id: number,
    @Body() calendarData: CreateCalendarDto,
  ) {
    return this.calendarService.updateCalendar(id, calendarData);
  }

  @Delete()
  async deleteCalendar(@Param('id', ParseIntPipe) id: number) {
    return this.calendarService.deleteCalendar(id);
  }
}
