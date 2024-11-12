import {
  boolean,
  date,
  foreignKey,
  integer,
  pgTable,
  serial,
  varchar,
} from 'drizzle-orm/pg-core';
import { vacationdays } from './database-table-vacationdays';

export const employee = pgTable(
  'employee',
  {
    employeeid: serial('employeeid').primaryKey().notNull(),
    name: varchar('name', { length: 100 }).notNull(),
    startdate: date('startdate').notNull(),
    enddate: date('enddate'),
    isactive: boolean('isactive'),
    daysid: integer('daysid').references(() => vacationdays.daysid),
  },
  (table) => ({
    fk: foreignKey({
      name: 'fk_days',
      columns: [table.daysid],
      foreignColumns: [vacationdays.daysid],
    })
      .onDelete('cascade')
      .onUpdate('cascade'),
  }),
);
