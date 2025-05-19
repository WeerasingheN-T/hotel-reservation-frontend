import React, { useEffect, useState } from 'react';
import {
    Avatar, Box, Typography, Button, Grid, Paper,
    IconButton, Dialog, DialogTitle, DialogActions
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Recommandations from '../Components/Recommandations';
import { useSelector } from 'react-redux';
import axios from 'axios';

function Profile () {

    const [activeBookings, setActiveBookings] = useState([]);
    const [pastBookings, setPastBookings] = useState([]);
    const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
    const [bookingToCancel, setBookingToCancel] = useState(null);
    const [hotelDetails, setHotelDetails] = useState([]);

    const user = useSelector(state => state.auth.user);
    console.log(user)

    useEffect(()=> {
        const fetchData = async()=> {
            try{
                const bookingRes = await axios.get(`http://localhost:5007/api/Booking/user/${user.email}`);
                const bookings = [bookingRes.data];

                const uniqueHotelIds = [...new Set([...activeBookings, ...pastBookings].map(b => b.hotelId))];
                const responses = await Promise.all(uniqueHotelIds.map(id =>
                  axios.get(`http://localhost:5007/api/Hotel/${id}`)
                ));
                setHotelDetails(responses.map(r => r.data));

                const now = new Date();
                const active = bookings.filter(b=> new Date(b.checkOut) >= now);
                const past = bookings.filter(b=> new Date(b.checkOut) < now);
                setActiveBookings(active);
                setPastBookings(past);
            } catch (error) {
                console.error("Failed to load user or bookings:", error);
            }
        };
        fetchData();
    }, [user.email, activeBookings, pastBookings]);

    const getHotel = (hotelId) => hotelDetails.find(h => h.id === hotelId);

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if(!file) return;

        const formData = new FormData();
        formData.append("image",file);

        try{
            const response = await axios.put(`http://localhost:5007/api/User/profile-upload/${user.email}`, 
                formData,
                { headers: { 'Content-Type': 'multipart/form-data' } }
            );
            if(response.status === 200){
                alert("Uploaded!");
            }
        } catch(err) {
            console.error("Upload failed", err);
        }
    };

    const cancelBooking = async() => {
        try{
            await axios.delete(`http://localhost:5007/api/Booking/${bookingToCancel}`);
            setActiveBookings(prev => prev.filter(b=> b.id !== bookingToCancel))
        } catch (error) {
            console.error("Failed to cancel booking:", error);
        } finally {
            setCancelDialogOpen(false);
            setBookingToCancel(null);
        }
    };

    if(!user) return <Typography>Loading...</Typography>;

    const bookcard = (booking, isActive) => {
        const hotel = getHotel(booking.hotelId);

        return (
        <Paper key={booking.id} sx={{ padding: 3, mb: 2, position: 'relative', minWidth: '500px', textAlign: 'left'}}>
            <Typography variant="body1" fontWeight="bold">Hotel: {hotel ? hotel.hotelName : "Hotel not found"}</Typography>
            <Typography variant='body2'>
                Check In: {booking.checkIn}
            </Typography>
            <Typography variant='body2'>
                Check Out: {booking.checkOut}
            </Typography>
            {isActive && (
                <IconButton 
                   sx={{ position: 'absolute', right: 10, top: 10, color: 'red' }}
                   onClick={()=> {
                    setBookingToCancel(booking.id);
                    setCancelDialogOpen(true);
                   }}
                >
                    <DeleteIcon/>
                </IconButton>
            )}
        </Paper>
        )
        
    };

    return (
        <Box sx={{ p: 10 }}>
            <Box>
                
            </Box>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6} sx={{ minWidth: '800px' }}>
                   <Paper elevation={3} sx={{ p: 2, mb: 4 }}>
                       <Box display="flex" alignItems="center">
                            <Box position="relative" display="inline-block" sx={{ ml: 4 }}>
                                <Avatar src={user.profileImageUrl || ""} sx={{ width: 130, height: 130, ml: 4, mt: 2 }}/>
                                <IconButton sx={{
                                    position: 'absolute',
                                    bottom: 0,
                                    right: 0,
                                    backgroundColor: 'white',
                                    borderRadius: '50%'
                                }}
                                component="label">
                                    <input type="file" accept='image/*' hidden onChange={handleFileUpload}/>
                                    <EditIcon />
                                </IconButton>
                            </Box>
                            
                            <Box flexGrow={1}>
                               <Typography variant='h3' sx={{ fontFamily: "'Playwrite DK Loopet', cursive", 
                                  color: '#2F1B12', mb: 2 }}>
                                   Hello...
                                </Typography>
                               <Typography variant='h5'>{user.email}, your bookings are below!</Typography>
                            </Box>
                       </Box>
                       <Button variant="outlined" color='secondary' sx={{ backgroundColor: '#eab200' }} startIcon={<EditIcon />}>Edit</Button>
                   </Paper>
                   <Typography variant='h5' mt={3} mb={4} gutterBottom>Bookings</Typography>
                   <Grid container spacing={3}>
                    <Grid item xs={12} md={6} sx={{ width: '500px' }}>
                        <Typography variant='subtitle1' fontWeight="bold">Active Bookings</Typography>
                           {activeBookings.length > 0 ? activeBookings.map(b=> bookcard(b,true))
                             : pastBookings.length === 0 ?
                            <Typography>No Booking Yet</Typography> :
                            <Typography>No Active Bookings</Typography>
                            }
                    </Grid>
                    <Grid item xs={12} md={6}>
                       <Typography variant="subtitle1" fontWeight="bold">Past Bookings</Typography>
                           { pastBookings.length > 0 ? pastBookings.map(b=>bookcard(b,false))
                           : activeBookings.length === 0 ? 
                           <Typography>No Booking Yet</Typography>:
                           <Typography fontWeight="bold">No Past Bookings</Typography>
                        } 
                    </Grid>
                   </Grid>
                    <Box mt={4}>
                        <Button color='inherit' sx={{ backgroundColor: '#d9381e' }}>Delete Account</Button>
                    </Box>  
                </Grid>
                <Grid item xs={12} md={6} sx={{ maxWidth: '300px', maxHeight:'600px' }}>
                    <Recommandations />
                </Grid>
            </Grid>
            <Dialog open={cancelDialogOpen} onClose={()=>setCancelDialogOpen(false)}>
                <DialogTitle>Are you sure you want to cancel this booking?</DialogTitle>
                <DialogActions>
                    <Button onClick={()=>setCancelDialogOpen(false)}>No</Button>
                    <Button onClick={cancelBooking} color='error'>Yes</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
};

export default Profile;