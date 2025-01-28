import { Box, List, ListItem, Typography } from "@mui/material";
import { Diagnosis, Entry, HospitalEntry, OccupationalHealthcareEntry, HealthCheckEntry } from "../../types";

import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import WorkIcon from '@mui/icons-material/Work';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';

const PatientEntry = ({ entry, diagnoses }: { entry: Entry, diagnoses: Diagnosis[] }) => {
  const renderSickLeave = (entry: OccupationalHealthcareEntry) => {
    if (entry.sickLeave) {
      return (
        <Typography variant="body2" gutterBottom>
          sick leave from {entry.sickLeave.startDate} to {entry.sickLeave.endDate}
        </Typography>
      );
    } else {
      return null;
    }
  };
  
  const renderDiagnoses = (entry: Entry) => {
    if (entry.diagnosisCodes) {
      return (
        <List sx={{ listStyleType: 'disc', pl: 4, fontSize: 13 }}>
          {entry.diagnosisCodes.map(code => {
            const diagnosis = diagnoses.find(d => d.code === code) || { code, name: "(unknown diagnosis code)" };
            return (
              <ListItem sx={{ display: 'list-item' }} disablePadding key={code}>
                {code} {diagnosis.name}
              </ListItem>
            );
          })}
        </List>
      );
    } else {
      return null;
    }
  };
  
  const renderHealthCheckRatingIcon = (healthCheckRating: number) => {
    switch (healthCheckRating) {
      case 0:
        return <FavoriteIcon htmlColor="green" />;
      case 1:
        return <FavoriteIcon htmlColor="yellow" />;
      case 2:
        return <FavoriteIcon htmlColor="orange" />;
      case 3:
        return <FavoriteIcon htmlColor="red" />;
    }
  };
  
  const HospitalEntry = ({ entry }: {entry: HospitalEntry}) => {
    return (
      <Box>
        <Typography variant="body2" gutterBottom>
          {entry.date} <LocalHospitalIcon />
        </Typography>
        <Typography variant="body2" gutterBottom>
          <em>{entry.description}</em>
        </Typography>
        <Typography variant="body2" gutterBottom>
          Discharge on {entry.discharge.date}: {entry.discharge.criteria}
        </Typography>
        <Typography variant="body2" gutterBottom>
          diagnose by {entry.specialist}
        </Typography>
        {renderDiagnoses(entry)}
      </Box>
    );
  };
  
  const OccupationalHealthcareEntry = ({ entry }: { entry: OccupationalHealthcareEntry }) => {
    return (
      <Box>
        <Typography variant="body2" gutterBottom>
          {entry.date} <WorkIcon /> {entry.employerName}
        </Typography>
        <Typography variant="body2" gutterBottom>
          <em>{entry.description}</em>
        </Typography>
        {renderSickLeave(entry)}
        <Typography variant="body2" gutterBottom>
          diagnose by {entry.specialist}
        </Typography>
        {renderDiagnoses(entry)}
      </Box>
    );
  };
  
  const HealthCheckEntry = ({ entry }: { entry: HealthCheckEntry }) => {
    return (
      <Box>
        <Typography variant="body2" gutterBottom>
          {entry.date} <SearchIcon />
        </Typography>
        <Typography variant="body2" gutterBottom>
          <em>{entry.description}</em>
        </Typography>
        <Typography>
          {renderHealthCheckRatingIcon(entry.healthCheckRating)}
        </Typography>
        <Typography variant="body2" gutterBottom>
          diagnose by {entry.specialist}
        </Typography>
        {renderDiagnoses(entry)}
      </Box>
    );
  };
  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const assertNever = (_param: never) => {};
  
  const EntryDetails = ({ entry }: { entry: Entry }) => {
    switch (entry.type) {
      case "Hospital":
        return <HospitalEntry entry={entry as HospitalEntry} />;
      case "OccupationalHealthcare":
        return <OccupationalHealthcareEntry entry={entry as OccupationalHealthcareEntry} />;
      case "HealthCheck":
        return <HealthCheckEntry entry={entry as HealthCheckEntry} />;
      default:
        assertNever(entry);
    }
  };

  return (
    <Box sx={{ border: '1px solid black', borderRadius: '4px', my: 1, p: 0.4 }}>
      <EntryDetails entry={entry} />
    </Box>
  );
};

export default PatientEntry;