import { z } from 'zod';
import { Gender, HealthCheckRating } from "./types";

const SickLeaveSchema = z.object({
  startDate: z.string().date(),
  endDate: z.string().date(),
});

const DischargeSchema = z.object({
  date: z.string().date(),
  criteria: z.string().min(1, { message: "'criteria' cannot be empty."}),
});

const BaseEntrySchema = z.object({
  id: z.string(),
  description: z.string().min(1, { message: "'description' cannot be empty."}),
  date: z.string().date(),
  specialist: z.string().min(1, { message: "'specialist' cannot be empty."}),
  diagnosisCodes: z.array(z.string()).optional(),
});

const HealthCheckEntrySchema = BaseEntrySchema.extend({
  type: z.literal("HealthCheck"),
  healthCheckRating: z.nativeEnum(HealthCheckRating),
});

const OccupationalHealthcareEntrySchema = BaseEntrySchema.extend({
  type: z.literal("OccupationalHealthcare"),
  employerName: z.string().min(1),
  sickLeave: SickLeaveSchema.optional(),
});

const HospitalEntrySchema = BaseEntrySchema.extend({
  type: z.literal("Hospital"),
  discharge: DischargeSchema,
});

const EntrySchema = z.union([
  HealthCheckEntrySchema,
  OccupationalHealthcareEntrySchema,
  HospitalEntrySchema,
]);

export const NewEntrySchema = z.union([
  HealthCheckEntrySchema.omit({ id: true }),
  OccupationalHealthcareEntrySchema.omit({ id: true }),
  HospitalEntrySchema.omit({ id: true })
]);

export const NewPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
  entries: z.array(EntrySchema),
});