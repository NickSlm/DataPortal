import SnapshotDataGrid from "./SnapshotDataGrid";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';





export default function Leaderboard() {

    //const [selectedDate, SetSelectedDate] = useState('');

    //const handleSelectedDate = (dateFromChild) => {
    //    SetSelectedDate(dateFromChild);
    //}


    return (
        <box sx={{flexGrod:1}}>
            <h1>
                Leaderboard
            </h1>

            {/*<SelectLeaderboard onDateSelect={handleSelectedDate} />*/}
            <SnapshotDataGrid/>
        </box>
    );
}