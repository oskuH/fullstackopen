import express, { Request, Response, NextFunction } from "express";
import patientService from "../services/patientService";
import { NewPatientSchema, NewEntrySchema } from "../utils";
import z from 'zod';
import { NewEntry, Entry, NewPatient, Patient } from "../types";

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    NewPatientSchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const checkPatientExist = (req: Request, res: Response, next: NextFunction) => {
  const patient = patientService.findById(req.params.id);
  if (!patient) {
    res.status(404).send({ error: `Patient with id ${req.params.id} not found` });
  }
  next();
};

const newEntryParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    NewEntrySchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => { 
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getPatients());
});

router.get('/:id', (req, res) => {
  const patient = patientService.findById(req.params.id);

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
  const addedPatient = patientService.addPatient(req.body);
  res.json(addedPatient);
});

router.post('/:id/entries', checkPatientExist, newEntryParser, (req: Request<{id: string}, unknown, NewEntry>, res: Response<Entry>) => {
  const addedEntry = patientService.addEntry(req.params.id, req.body);
  res.json(addedEntry);
});

router.use(errorMiddleware);

export default router;