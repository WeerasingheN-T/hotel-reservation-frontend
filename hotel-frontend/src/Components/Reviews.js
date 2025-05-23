import React, { useEffect } from 'react';
import { Box, Typography, TextField, Rating, Paper, Divider } from '@mui/material';
import axios from "axios";

function Reviews({hotelId}) {

    const [reviews,setReviews] = React.useState([]);

    useEffect(()=> {
        const getReviews = async() => {
            try{
                const response = await axios.get(`http://localhost:5007/api/Rating/${hotelId}`);
                setReviews(response.data);
            } catch (error){
                console.error("Failed to fetch reviews:",error);
            }
        };
        getReviews();
    }, [hotelId]);

    return (
        <>
          {reviews ? (
            <Box display="flex" justifyContent="left" mt={3}>
              <Paper elevation={3} sx={{ padding: 4, width: '90%', maxHeight: 'auto' }}>
                <Typography variant='h5' gutterBottom>
                  Ratings and Reviews
                </Typography>
      
                {reviews.map((review, index) => (
                  <Box key={index} mb={3}>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                      <Typography variant="body2" color="text.secondary">
                        By Annonymous participant
                      </Typography>
                      <Typography variant='body2' color='text.secondary'>
                        {new Date(review.createdAt).toLocaleString('en-GB', {
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit',
                          hour12: true
                        })}
                      </Typography>
                    </Box>
                    <Box display='flex' justifyContent='left'>
                      <Rating value={review.stars} precision={1} sx={{ mb: 1 }} readOnly />
                    </Box>
                    <TextField 
                      multiline 
                      minRows={3} 
                      fullWidth
                      value={review.comment}
                      inputProps={{ readOnly: true }}
                      sx={{ borderRadius: 2, backgroundColor: "#f9f9f9" }} 
                    />
                    {index < reviews.length - 1 && <Divider sx={{ mt: 3 }} />}
                  </Box>
                ))}
              </Paper>
            </Box>
          ) : (
            <Typography>No reviews</Typography>
          )}
        </>
      );
      
};

export default Reviews;