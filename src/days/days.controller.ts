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
import { DaysService } from './days.service';
import { CreateVacationDayDto } from './dto/create-vacationday.dto';
import { UpdateVacationDayDto } from './dto/update-vacationday.dto';

@Controller('days')
export class DaysController {
  constructor(private readonly vacationDayService: DaysService) {}

  @Get()
  getAll() {
    return this.vacationDayService.getAll();
  }

  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.vacationDayService.getById(id);
  }

  @Post()
  create(@Body() vacationdays: CreateVacationDayDto) {
    return this.vacationDayService.create(vacationdays);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() vacationdays: UpdateVacationDayDto,
  ) {
    return this.vacationDayService.update(id, vacationdays);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.vacationDayService.delete(id);
  }
}
