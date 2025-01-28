import React, { SyntheticEvent, useState } from "react";
import { Stack, Box, Button, TextField, Typography, Grid, Input, FormControl } from "@mui/material";
import { Diagnosis, EntryType, HealthCheckRating, EntryFormValues } from "../../types";
import { HealthCheckFormAdditions, OccupationalHealthcareFormAdditions, HospitalEntryFormAdditions } from "./FormAdditions";

import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

interface Props {
  formType: EntryType;
  setVisibleFormType: React.Dispatch<React.SetStateAction<EntryType | undefined>>;
  diagnoses: Diagnosis[];
  onSubmit: (values: EntryFormValues) => void;
}

const AddEntryForm = ({ formType, setVisibleFormType, diagnoses, onSubmit } : Props) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = React.useState<string[]>([]);
  const [healthCheckRating, setHealthCheckRating] = React.useState<HealthCheckRating>(0);
  const [employerName, setEmployerName] = useState('');
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState('');
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState('');
  const [dischargeDate, setDischargeDate] = useState('');
  const [dischargeCriteria, setDischargeCriteria] = useState('');

  const handleDiagnosisCodesChange = (event: SelectChangeEvent<typeof diagnosisCodes>) => {
    const {
      target: { value },
    } = event;
    setDiagnosisCodes(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleHealthCheckRatingChange = (event: SelectChangeEvent<typeof healthCheckRating>) => {
    const {
      target: { value },
    } = event;
    setHealthCheckRating(Number(value));
  };

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    const checkedDiagnosisCodes = diagnosisCodes.length > 0 ? diagnosisCodes : undefined;
    const sickLeave = sickLeaveStartDate && sickLeaveEndDate ? {startDate: sickLeaveStartDate, endDate: sickLeaveEndDate} : undefined;
    const discharge = { date: dischargeDate, criteria: dischargeCriteria };
    switch (formType) {
      case "HealthCheck":
        onSubmit({
          description,
          date,
          specialist,
          diagnosisCodes: checkedDiagnosisCodes,
          type: formType,
          healthCheckRating
        });
        break;
      case "OccupationalHealthcare":
        onSubmit({
          description,
          date,
          specialist,
          diagnosisCodes: checkedDiagnosisCodes,
          type: formType,
          employerName,
          sickLeave
        });
        break;
      case "Hospital":
        onSubmit({
          description,
          date,
          specialist,
          diagnosisCodes: checkedDiagnosisCodes,
          type: formType,
          discharge
        });
    }
  };

  return (
    <Box component="form" onSubmit={addEntry} sx={{ border: '2px dotted black', my: 1, p: 0.4 }}>
      <Stack spacing={2} direction="column" useFlexGap sx={{ mt: 1 }}>
        <Typography sx={{ mt: 1 }}>
          New {formType} entry
        </Typography>
        <TextField
          InputLabelProps={{ shrink: true }}
          label="description"
          variant="standard"
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <FormControl sx={{ mt: 1, width: 150 }}>
          <InputLabel htmlFor="date-input" shrink>Date</InputLabel>
          <Input
            id="date-input"
            type="date"
            value={date}
            onChange={({target}) => setDate(target.value)}
          />
        </FormControl>
        <TextField
          InputLabelProps={{ shrink: true }}
          label="specialist"
          variant="standard"
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        {formType == "HealthCheck" && (
          <HealthCheckFormAdditions 
            healthCheckRating={healthCheckRating} 
            handleHealthCheckRatingChange={handleHealthCheckRatingChange}
          />
        )}
        {formType == "OccupationalHealthcare" && (
          <OccupationalHealthcareFormAdditions 
            employerName={employerName} 
            setEmployerName={setEmployerName} 
            sickLeaveStartDate={sickLeaveStartDate}
            setSickLeaveStartDate={setSickLeaveStartDate}
            sickLeaveEndDate={sickLeaveEndDate}
            setSickLeaveEndDate={setSickLeaveEndDate}
          />
        )}
        {formType == "Hospital" && (
          <HospitalEntryFormAdditions 
            dischargeDate={dischargeDate}
            setDischargeDate={setDischargeDate}
            dischargeCriteria={dischargeCriteria}
            setDischargeCriteria={setDischargeCriteria}
          />
        )}
        <FormControl>
          <InputLabel htmlFor="diagnosisCodes-input">Diagnosis codes</InputLabel>
          <Select
            id="diagnosisCodes-input"
            multiple
            value={diagnosisCodes}
            onChange={handleDiagnosisCodesChange}
            input={<OutlinedInput label="Diagnosis codes" />}
            renderValue={(selected) => selected.join(', ')}
          >
            {diagnoses.map((diagnosis) => (
              <MenuItem key={diagnosis.code} value={diagnosis.code}>
                <Checkbox checked={diagnosisCodes.includes(diagnosis.code)} />
                <ListItemText primary={diagnosis.code} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Grid container>
          <Grid item xs={6}>
            <Button variant="outlined" color="primary" onClick={() => setVisibleFormType(undefined)} style={{ float: "left" }}>
              Cancel
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button variant="outlined" color="primary" type="submit" style={{ float: "right" }}>
              Add
            </Button>
          </Grid>
        </Grid>
      </Stack>
    </Box>
  );
};

export default AddEntryForm;