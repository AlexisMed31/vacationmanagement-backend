import { calendar } from './tables/database-table-calendar';
import { employee } from './tables/database-table-employee';
import { vacationdays } from './tables/database-table-vacationdays';

export const databaseSchema = {
  employee,
  vacationdays,
  calendar,
};
