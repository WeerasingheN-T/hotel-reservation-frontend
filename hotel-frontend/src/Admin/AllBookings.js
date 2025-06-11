import React, { useEffect, useState } from 'react';
import { Box, Typography, IconButton, Paper, Pagination } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import usePagination from '../Pagination/usePagination';
import axios from "axios";

function AllBookings () {

    const [bookings, setBookings] = useState([]);
      const bookingPerpage = 5;

    useEffect(()=> {
        const fetchBookings = async()=> {
            try{
                const allBooking = await axios.get("http://localhost:5007/api/Booking");
                setBookings(allBooking.data);
            } catch(error){
                alert("Failed to load bookings.."+ error);
            }
        };
        fetchBookings();
    }, []);

    const { currentData, currentPage, maxPage, jump } = usePagination (
        bookings,
        bookingPerpage
      );
    
    const handlePageChange = (event, value) => {
        jump(value);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    if(!bookings){
        return <Typography textAlign="center">Loading....</Typography>
    }

    return (
        <Box>
            <Typography variant='h5' fontWeight='bold'>All Bookings</Typography>
            { bookings.map((booking)=>(
                <Paper key={booking.id} sx={{ padding: 3, mb: 2, position: 'relative', minWidth: '500px', textAlign: 'left' }}>
                    <Typography variant='h6' fontWeight="bold">Client Details</Typography>
                    <Typography variant='body1'>Client Name: {booking.userName}</Typography>
                    <Typography variant='body1'>Client Email: {booking.email}</Typography>
                    <Typography variant='body1'>Client Contact: {booking.contactNo}</Typography>

                    <Typography variant='h6' fontWeight="bold">Hotel Details</Typography>
                    <Typography variant='body1'>Hotel: {booking.hotelId}</Typography>

                    <Typography variant='body2'>
                        Check In: {booking.checkIn} Check Out: {booking.checkOut}
                    </Typography>
                    <Typography variant='body2'>
                        Reserved At: {new Date(booking.createdAt).toLocaleString('en-GB', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: true
                        })}
                    </Typography>
                    <IconButton
                        sx={{ position: 'absolute', right: 10, top: 10, color: 'red' }}
                    >
                        <DeleteIcon />
                    </IconButton>
                   </Paper>
            ))}
            <Box mt={4} display="flex" justifyContent="center">
                <Pagination
                    count={maxPage}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary" />
            </Box>
            
        </Box>
    )
}

export default AllBookings;