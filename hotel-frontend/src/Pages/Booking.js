import React from 'react';
import { useLocation } from "react-router-dom";
import { Box, Grid, TextField, Typography, CardMedia, FormControlLabel, Checkbox, Paper } from '@mui/material';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import ButtonLayout from '../Components/ButtonLayout';
import axios from "axios";

const roomTypes = [
    { label: 'Single Room', value: 'single' },
    { label: 'Double Room', value: 'double' },
    { label: 'Triple Room', value: 'triple' }
  ];

function Booking() {

    const location = useLocation();
    const details = location.state?.hotel;

    const [data, setData] = React.useState({
        email: "",
        userName: "",
        contactNo: "",
        checkIn: "",
        checkOut: "",
        rooms: {}
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setData({...data, [name]:value});
    };

    const handleRoomCount = (roomType)=> (e)=> {
        const count = parseInt(e.target.value);
        setData((prev)=> ({
            ...prev,
            rooms: {...prev.rooms, [roomType] : count},
        }));
    };

    const handleSubmit = async()=> {
        const bookingPayload = {
            email: data.email,
            userName: data.userName,
            contactNo: data.contactNo,
            checkIn: data.checkIn,
            checkOut: data.checkOut,
            rooms: Object.entries(data.rooms).map(([roomType, roomCount]) => ({
                roomType,
                roomCount
            })),
            HotelId: details.id
        };

        try{
            const res = await axios.post("http://localhost:5007/api/Booking", bookingPayload);
            alert(res.data.message);
        } catch(error){
            alert("Booking Failed");
        }
    };

    const handleCheckboxChange = (roomType) => (e) => {
       if(e.target.checked){
        setData((prev)=>({
            ...prev,
            rooms: {...prev.rooms, [roomType]:1}
        }));
       } else{
        const updated = {...data.rooms};
        delete updated[roomType];
        setData((prev)=> ({...prev, rooms: updated}));
       }
    };

    return (
        <Box sx={{ padding: 4, maxWidth: '1200px', margin: 'auto' }}>
            <Typography variant='h5' fontWeight="bold" gutterBottom>Book Your Stay</Typography>

            <Grid container spacing={4}>
                <Grid item xs={12} md={6} sx={{ maxWidth: '600px' }}>
                    <Box display="flex" flexDirection="column" gap={2}>
                        <Typography variant='h6'>Your Information</Typography>
                        <TextField label="Full Name:" name="userName" value={data.userName} onChange={handleChange} />
                        <TextField label="Email:" name="email" value={data.email} onChange={handleChange}/>
                        <TextField label="Contact Number:" name="contactNo" value={data.contactNo} onChange={handleChange}/>

                        <Typography variant="h6" mt={3}>Booking Details</Typography>
                        <TextField label="Check-in Date:" name="checkIn" type="date" 
                            InputLabelProps={{shrink: true}} value={data.checkIn} onChange={handleChange}/>
                        <TextField label="Check-out Date:" name="checkOut" type="date" 
                            InputLabelProps={{shrink: true}} value={data.checkOut} onChange={handleChange}/>

                        <Box mt={2}>
                            <Typography variant="h6" gutterBottom>Choose Room Types</Typography> 
                            <Grid container spacing={2}>
                                {roomTypes.map((room)=> (
                                    <Grid container item xs={12} sm={6} key={room.value} alignItems="center">
                                        <Grid item xs={6}>
                                            <FormControlLabel
                                              control={
                                                <Checkbox checked={data.rooms[room.value] !== undefined}
                                                   onChange={handleCheckboxChange(room.value)}/>
                                              }
                                              label={room.label} />
                                        </Grid>
                                        <Grid item xs={6}>
                                            {data.rooms[room.value] !== undefined && (
                                                <TextField label="No of Rooms:"
                                                   type="number"
                                                   size="small"
                                                   value={data.rooms[room.value]}
                                                   onChange={handleRoomCount(room.value)}
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
               <ButtonLayout icon={BookOnlineIcon} name="Book" onClick={handleSubmit}/> 
            </Box>
        </Box>
    )
}

export default Booking;