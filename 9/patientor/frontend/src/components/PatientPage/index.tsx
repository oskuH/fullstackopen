import { useParams } from "react-router-dom";
import axios from "axios";
import patientService from "../../services/patients";
import { Box, Typography, Button, Alert } from "@mui/material";
import { useState, useEffect } from "react";
import { Diagnosis, Patient } from "../../types";

import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import TransgenderIcon from '@mui/icons-material/Transgender';

import { EntryType, EntryFormValues } from "../../types";
import AddEntryForm from "./AddEntryForm";
import PatientEntry from "./PatientEntry";

interface ZodErrorIssue {
  message: string
}

const PatientPage = ({ diagnoses }: { diagnoses: Diagnosis[] }) => {
  const id = useParams().id;
  const [patient, setPatient] = useState<Patient | undefined>();
  const [gender, setGender] = useState<string>();
  const [visibleFormType, setVisibleFormType] = useState<EntryType>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const patient = await patientService.findById(id);
        setPatient(patient);
        setGender(patient?.gender);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error?.response?.data && typeof error?.response?.data === "string") {
            const message = error.response.data.replace('Something went wrong. Error: ', '');
            console.error(message);
            setError(message);
          } else {
            console.error("Unrecognized axios error");
            setError("Unrecognized axios error");
          }
        } else {
          console.error("Unknown error", error);
          setError("Unknown error");
        }
      }
    };

    fetchPatient();
  }, [id, diagnoses]);

  if (!patient) {
    return <div>Loading...</div>;
  }

  const genderIcon = () => {
    switch (gender) {
      case "female":
        return <FemaleIcon />;
      case "male":
        return <MaleIcon />;
      case "other":
        return <TransgenderIcon />;
        // sorry Others, MUI only had this in addition to male and female
    }
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const entry = await patientService.createEntry(id, values);
      patient.entries = [...patient.entries, entry];
      setVisibleFormType(undefined);
      setError('');
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data) {
          if (typeof e.response.data === "string") {
            const message = e.response.data.replace('Something went wrong. Error: ', '');
            console.error(message);
            setError(message);
          } else if (e.response.data.error && Array.isArray(e.response.data.error)) {
            const zodErrors = e.response.data.error.map((issue: ZodErrorIssue) => issue.message).join(', ');
            console.error(zodErrors);
            setError(zodErrors);
          } else {
            setError("Unrecognized axios error");
          }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }}
    }
  };

  return (
    <Box sx={{
      mt: 2.5
    }}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
        {patient.name} {genderIcon()}
      </Typography>
      <Typography variant="body2">
        ssn: {patient.ssn}
      </Typography>
      <Typography variant="body2" gutterBottom>
        occupation: {patient.occupation}
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}

      {!visibleFormType && (
        <>
          <Button variant="outlined" color="primary" onClick={() => setVisibleFormType("HealthCheck")}>
            Add new HealthCheck entry
          </Button>
          <Button variant="outlined" color="primary" onClick={() => setVisibleFormType("OccupationalHealthcare")}>
            Add new OccupationalHealthcare entry
          </Button>
          <Button variant="outlined" color="primary" onClick={() => setVisibleFormType("Hospital")}>
            Add new Hospital entry
          </Button>
        </>
      )}

      {visibleFormType && (
        <>
          <AddEntryForm formType={visibleFormType} setVisibleFormType={setVisibleFormType} diagnoses={diagnoses} onSubmit={submitNewEntry} />
        </>
      )}

      <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', pt: 3 }}>
        entries
      </Typography>
      {patient.entries.map(entry => <PatientEntry key={entry.id} entry={entry} diagnoses={diagnoses} />)}
    </Box>
  );
};

export default PatientPage;