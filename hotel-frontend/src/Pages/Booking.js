import React from 'react';
import { useLocation } from "react-router-dom";
import { Box, Grid, TextField, Typography, CardMedia, FormControlLabel, Checkbox, Paper } from '@mui/material';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import ButtonLayout from '../Components/ButtonLayout';

const roomTypes = [
    { label: 'Single Room', value: 'single' },
    { label: 'Double Room', value: 'double' },
    { label: 'Triple Room', value: 'triple' }
  ];

function Booking() {

    const [selectedRooms, setSelectedRooms] = React.useState({});
    const location = useLocation();
    const details = location.state?.hotel;

    const handleCheckboxChange = (type) => (event) => {
       const checked = event.target.checked;
       setSelectedRooms((prev) => ({
           ...prev,
           [type]: checked ? 1 : undefined
        }));
    };

    const handleRoomCountChange = (type) => (event) => {
       const value = parseInt(event.target.value, 10);
       setSelectedRooms((prev) => ({
           ...prev,
           [type]: isNaN(value) ? 1 : value
        }));
    };


    return (
        <Box sx={{ padding: 4, maxWidth: '1200px', margin: 'auto' }}>
            <Typography variant='h5' fontWeight="bold" gutterBottom>Book Your Stay</Typography>

            <Grid container spacing={4}>
                <Grid item xs={12} md={6} sx={{ maxWidth: '600px' }}>
                    <Box display="flex" flexDirection="column" gap={2}>
                        <Typography variant='h6'>Your Information</Typography>
                        <TextField label="Full Name:" name="fullname"/>
                        <TextField label="Email:" name="email"/>
                        <TextField label="Contact Number:" name="phone"/>

                        <Typography variant="h6" mt={3}>Booking Details</Typography>
                        <TextField label="Check-in Date:" name="checkIn" type="date" InputLabelProps={{shrink: true}}/>
                        <TextField label="Check-out Date:" name="checkOut" type="date" InputLabelProps={{shrink: true}}/>
                        <Box mt={2}>
                            <Typography variant="h6" gutterBottom>Choose Room Types</Typography> 
                            <Grid container spacing={2}>
                                {roomTypes.map((room)=> (
                                    <Grid container item xs={12} sm={6} key={room.value} alignItems="center">
                                        <Grid item xs={6}>
                                            <FormControlLabel
                                              control={
                                                <Checkbox checked={selectedRooms[room.value] !== undefined}
                                                   onChange={handleCheckboxChange(room.value)}/>
                                              }
                                              label={room.label} />
                                        </Grid>
                                        <Grid item xs={6}>
                                            {selectedRooms[room.value] !== undefined && (
                                                <TextField label="No of Rooms:"
                                                   type="number"
                                                   size="small"
                                                   value={selectedRooms[room.value]}
                                                   onChange={handleRoomCountChange(room.value)}
                                                   inputProps={{ min: 1 }}
                                                />
                                            )}
                                        </Grid>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} style={{ padding: "24px" }}>
                        <CardMedia 
                            component="img"
                            height="450"
                            image={details.photoUrl || "/images/placeholder.jpg"}
                            alt={details.hotelName}
                            sx={{ width: "500px", borderRadius: 2 }} />
                        <Typography variant='h6' gutterBottom>Hotel Information</Typography>
                        <Typography variant='body1'>{details.hotelName}</Typography>
                        <Typography variant='body1'>{details.location}</Typography>
                    </Paper>
                </Grid>
            </Grid>
            <Box display="flex" justifyContent="center" mt={3}>
               <ButtonLayout icon={BookOnlineIcon} name="Book" onClick={""}/> 
            </Box>
        </Box>
    )
}

export default Booking;