import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';


const columns = [
    {
        field: 'id', headerName: "ID", width: 90
    },
    {
        field: 'datePulled', headerName: "Snapshot Date", width: 150,
        valueGetter: (value) => {
            return new Date(value).toLocaleDateString();
        }
    }
]



export default function SnapshotDataGrid() {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() =>
    {
        const fetchData = async () => {

            try {
                const response = await fetch('http://127.0.0.1:5201/api/leaderboard');
                if (!response.ok) {
                    throw new Error('Failed to fetch data')
                }
                const result = await response.json();
                setData(result);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }

        }
        fetchData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;


    return (

        <Box>
            <DataGrid
                rows={data}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 6,
                        },
                    },
                }}
                pageSizeOptions={[6]}
                disableRowSelectionOnClick
                autoHeight
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