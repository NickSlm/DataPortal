import { useState, useEffect } from 'react';
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



export default function RealmsSelect(){

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchData = async () => {

            try {

                const response = await fetch('http://127.0.0.1:5201/connected_realms/get');

                if (!response.ok) {
                    throw new Error('Failed to fetch data')
                }
                const result = await response.json();

                const realms = result.flatMap(e =>
                    e.realms.map(r => ({
                        id: e.id,       
                        rId: r.id,       
                        name: r.name,
                        category: r.category
                    }))
                );

                setData(realms);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);





    return (
        <FormControl sx={glassSelectStyle.FormControl}>
            <Autocomplete
                options={data}
                disablePortal
                onChange={(event, value) => {
                    console.log(value.id);
                }}
                getOptionLabel={(option) => option.name}
                isOptionEqualToValue={(option, value) => option.rId === value.rId}
                renderInput={(params) => (
                    <TextField {...params} label="Server" />
                )}
                slotProps={glassSelectStyle.slotProps}
        />
        </FormControl>
    );
};

