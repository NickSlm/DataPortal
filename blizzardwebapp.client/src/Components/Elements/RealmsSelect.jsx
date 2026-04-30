import { glassSelectStyle } from '../../Styles/componentStyles';
import {
    Container,
    Box,
    Select,
    MenuItem,
    Typography,
    FormControl,
    InputLabel,
    Button,
    Paper,
    Tabs,
    Tab,
} from '@mui/material';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';




export default function RealmsSelect({ realms, value, onChange, loading }) {

    return (
        <FormControl sx={glassSelectStyle.FormControl}>
            <Autocomplete
                options={realms}
                value={value}
                loading={loading}
                disablePortal
                onChange={(event, newValue) => onChange(newValue)}
                getOptionLabel={(option) => option.name}
                isOptionEqualToValue={(option, value) => option.rId === value.rId}
                renderInput={(params) => (
                    <TextField {...params} label="Server" />
                )}
                slotProps={glassSelectStyle.slotProps}
            />
        </FormControl>
    );
}