import { integer, pgTable, serial, timestamp } from 'drizzle-orm/pg-core';

export const vacationdays = pgTable('vacationdays', {
  daysid: serial('daysid').primaryKey().notNull(),
  totaldays: integer('totaldays').notNull(),
  daystaken: integer('daystaken'),
  daysremaining: integer('daysremaining'),
  lastupdated: timestamp('lastupdated').defaultNow(),
});
