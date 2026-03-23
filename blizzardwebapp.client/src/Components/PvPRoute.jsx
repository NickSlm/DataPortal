import { useState, useEffect } from 'react';
import { Container, Typography, Box, Grid, Card, CardContent, CardActionArea } from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
export default function PvPRoute(){

    return (

        <Container maxWidth="lg" sx={{ py: 8 }}>
            <Box sx={{ textAlign: 'center', mb: 8 }}>
                <Typography
                    variant="h2"
                    gutterBottom
                    sx={{
                        background: 'linear-gradient(135deg, #00ff88 0%, #ff6b9d 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}
                >
                    Arena Leaderboards
                </Typography>
                <Typography variant="h6" color="text.secondary">
                    Select Bracket and Season
                </Typography>
            </Box>

            <Box >
                <Grid container spacing={2}>
                    <Grid size={{xs:6, md:4} }>
                        <FormControl sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id="demo-simple-select-label">Bracket</InputLabel>

                            <Select
                                labelId="select-label"
                                label="asdf"
                                id="simple-select">
                                <MenuItem value={10}>2v2</MenuItem>
                                <MenuItem value={20}>3v3</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid size={{ xs: 6, md: 4 }}>
                        <FormControl sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id="demo-simple-select-label">Season</InputLabel>
                            <Select
                                labelId="select-label"
                                id="simple-select">
                                <MenuItem value={22}>22</MenuItem>
                                <MenuItem value={23}>23</MenuItem>
                                <MenuItem value={24}>24</MenuItem>
                                <MenuItem value={25}>25</MenuItem>
                            </Select>
                    </FormControl>
                    </Grid>
                    <Grid size={{ xs: 2, md: 4 }}>
                        <Button>
                            Search
                        </Button>
                    </Grid>
                </Grid>

            </Box>




        </Container>
    );

}