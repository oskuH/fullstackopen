import { HealthCheckRating } from "../../types";
import { 
  SelectChangeEvent, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem,
  TextField,
  FormLabel,
  Input
 } from "@mui/material";

interface HealthCheckProps {
  healthCheckRating: HealthCheckRating,
  handleHealthCheckRatingChange: (event: SelectChangeEvent<number>) => void;
}

export const HealthCheckFormAdditions = ({ 
  healthCheckRating, handleHealthCheckRatingChange 
} : HealthCheckProps) => {
  return (
    <FormControl sx={{ width: 200 }}>
      <InputLabel>HealthCheckRating</InputLabel>
      <Select
        value={healthCheckRating}
        label="HealthCheckRating"
        onChange={handleHealthCheckRatingChange}
      >
        <MenuItem value={0}>Healthy</MenuItem>
        <MenuItem value={1}>LowRisk</MenuItem>
        <MenuItem value={2}>HighRisk</MenuItem>
        <MenuItem value={3}>CriticalRisk</MenuItem>
      </Select>
    </FormControl>
  );
};

interface OccupationalHealthcareProps {
  employerName: string,
  setEmployerName: React.Dispatch<React.SetStateAction<string>>,
  sickLeaveStartDate: string,
  setSickLeaveStartDate: React.Dispatch<React.SetStateAction<string>>,
  sickLeaveEndDate: string,
  setSickLeaveEndDate: React.Dispatch<React.SetStateAction<string>>
}

export const OccupationalHealthcareFormAdditions = ({ 
  employerName, 
  setEmployerName, 
  sickLeaveStartDate,
  setSickLeaveStartDate,
  sickLeaveEndDate,
  setSickLeaveEndDate
} : OccupationalHealthcareProps) => {
  return (
    <>
      <TextField
        InputLabelProps={{ shrink: true }}
        label="employer"
        variant="standard"
        value={employerName}
        onChange={({ target }) => setEmployerName(target.value)}
      />
      <FormControl>
        <FormLabel sx={{ mb: 2 }}>Sickleave</FormLabel>
        <FormControl>
          <InputLabel htmlFor="sickLeaveStartDate-input" shrink>start</InputLabel>
          <Input
            id="sickLeaveStartDate-input"
            type="date"
            value={sickLeaveStartDate}
            onChange={({target}) => setSickLeaveStartDate(target.value)}
            sx={{ mx: 1, mb: 2 }}
          />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="sickLeaveEndDate-input" shrink>end</InputLabel>
          <Input
            id="sickLeaveEndDate-input"
            type="date"
            value={sickLeaveEndDate}
            onChange={({target}) => setSickLeaveEndDate(target.value)}
            sx={{ mx: 1 }}
          />
        </FormControl>
      </FormControl>
    </>
  );
};

interface HospitalEntryProps {
  dischargeDate: string,
  setDischargeDate: React.Dispatch<React.SetStateAction<string>>,
  dischargeCriteria: string,
  setDischargeCriteria: React.Dispatch<React.SetStateAction<string>>,
}

export const HospitalEntryFormAdditions = ({
  dischargeDate,
  setDischargeDate,
  dischargeCriteria,
  setDischargeCriteria
} : HospitalEntryProps) => {
  return (
    <FormControl>
      <FormLabel sx={{ mb: 2 }}>Discharge</FormLabel>
      <FormControl>
        <InputLabel htmlFor="dischargeDate-input" shrink>start</InputLabel>
        <Input
          id="dischargeDate-input"
          type="date"
          value={dischargeDate}
          onChange={({target}) => setDischargeDate(target.value)}
          sx={{ mx: 1, mb: 2 }}
        />
      </FormControl>
      <TextField
        InputLabelProps={{ shrink: true }}
        label="criteria"
        variant="standard"
        value={dischargeCriteria}
        onChange={({ target }) => setDischargeCriteria(target.value)}
        sx={{ mx: 1 }}
      />
    </FormControl>
  );
};