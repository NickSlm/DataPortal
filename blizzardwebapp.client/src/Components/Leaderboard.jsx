import LeaderboardSelect from "./LeaderboardSelect";
import EntriesCollection from "./EntriesCollection";
import { useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';





export default function Leaderboard() {

    const [selectedDate, SetSelectedDate] = useState('');


    const handleSelectedDate = (dateFromChild) => {
        SetSelectedDate(dateFromChild);
    }


    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid>
                <Grid>
                    <LeaderboardSelect selectDate={handleSelectedDate} />
                </Grid>
                <Grid>
                    <EntriesCollection date={selectedDate} />
                </Grid>

            </Grid>

        </Box>
    );
}