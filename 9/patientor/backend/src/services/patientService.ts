import { v1 as uuid } from 'uuid';
import patients from "../../data/patients";

import { NonSensitivePatient, NewPatient, Patient, NewEntry, Entry } from "../types";

const getPatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries
  }));
};

const findById = (id: string): Patient | undefined => {
  const patient = patients.find(p => p.id === id);
  return patient;
};

const addPatient = ( entry: NewPatient ): Patient => {
  const id: string = uuid();
  const newPatient = {
    id,
    ...entry
  };

  patients.push(newPatient);
  return newPatient;
};

const addEntry = ( patient_id: string, entry: NewEntry ): Entry => {
  const patient = findById(patient_id);
  const id: string = uuid();
  const newEntry = {
    id,
    ...entry
  };
  patient?.entries.push(newEntry);
  return newEntry;
}; 

export default {
  getPatients,
  findById,
  addPatient,
  addEntry
};