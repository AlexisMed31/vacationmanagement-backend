//calendar table
import {
  date,
  foreignKey,
  integer,
  pgTable,
  serial,
  varchar,
} from 'drizzle-orm/pg-core';
import { employee } from './database-table-employee';

export const calendar = pgTable(
  'calendar',
  {
    calendarid: serial('calendarid').primaryKey().notNull(),
    employeeid: integer('employeeid').references(() => employee.employeeid),
    date: date('date'),
    status: varchar('status', { length: 20 }),
  },
  (table) => ({
    fk: foreignKey({
      name: 'fk_employee',
      columns: [table.employeeid],
      foreignColumns: [employee.employeeid],
    })
      .onDelete('cascade')
      .onUpdate('cascade'),
  }),
);
