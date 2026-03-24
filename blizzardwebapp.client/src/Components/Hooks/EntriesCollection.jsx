import Box from '@mui/material/Box';
import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';





const columns = [
    {
        field: 'id', headerName: 'ID'
    },
    { field: 'characterName', headerName: 'Name', width: 90 },
    {
        field: 'rank',
        headerName: 'Rank',
        width: 150,
        editable: false,
    },
    {
        field: 'rating',
        headerName: 'Rating',
        width: 150,
        editable: false,
    },
    {
        field: 'played',
        headerName: 'Total Games',
        width: 150,
        editable: false,
    },
    {
        field: 'won',
        headerName: 'Won',
        width: 150,
        editable: false,
    },
    {
        field: 'lost',
        headerName: 'Lost',
        width: 150,
        editable: false,
    }
];


export default function EntriesCollection({ date }) {

    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchData = async () => {

            try {
                const formattedDate = new Date(date).toISOString().split('T')[0];

                console.log('Original date:', date);
                console.log('Formatted date:', formattedDate);

                const response = await fetch(
                    `http://127.0.0.1:5201/Snapshot/Date/${formattedDate}`
                );
                if (!response.ok) {
                    throw new Error('Failed to fetch data')
                }

                const result = await response.json();

                setData(result);
            } catch (err) {
                setError(err);
            }finally{
                setLoading(false);

            }


        }

        if (date) {
            fetchData();
        }


    }, [date]);


    if (loading) return <div>Select Date</div>;
    if (error) return <div>Error: {error}</div>;




    return (
        <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={data}
                autoHeight
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 10,
                        },
                    },
                }}
                pageSizeOptions={[10]}
                disableRowSelectionOnClick
                sx={{
                    '& .MuiDataGrid-virtualScroller': {
                        scrollSnapType: 'y mandatory',
                    },
                    width: 'fit-content',
                    midWidth: '100%',
                    '& .MuiDataGrid-row': {
                        scrollSnapAlign: 'start',
                    },
                }}
            />
        </Box>
    );


}