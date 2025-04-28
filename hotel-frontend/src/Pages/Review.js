import React, { useState } from 'react';
import { useLocation } from "react-router-dom";
import { Box, Typography, TextField, Rating, Paper } from '@mui/material';
import RateReviewIcon from '@mui/icons-material/RateReview';
import ButtonLayout from '../Components/ButtonLayout';

function Review() {

    const [rating, setRating] = useState(0);
    const [review, setReview] = useState("");
    const location = useLocation();
    const details = location.state?.hotel;

    const handleSubmit =()=> {

    };

    return (
        <Box display="flex" justifyContent="center" mt={5}>
            <Paper elevation={3} sx={{ padding: 4, width: '70%' }}>
                <Typography variant='h5' gutterBottom>
                    Rate and Review
                </Typography>
                <Box mb={2}>
                    <Typography variant='subtitle1'>Your Rating</Typography>
                    <Rating
                       name='hotel-rating'
                       value={rating}
                       onChange={(event, newValue) => setRating(newValue)}
                       size='large'
                    />
                </Box>
                <Box mb={4}>
                    <Typography variant='subtitle1'>Your Review</Typography>
                    <Box display="flex" flexDirection='row' gap={4} mt={2} mb={2}>
                        <TextField fullWidth label="Hotel Name" value={details.hotelName} InputLabelProps={{shrink: true}} />
                        <TextField fullWidth label="Hotel Location" value={details.location} InputLabelProps={{shrink: true}} />
                    </Box>
                    <TextField 
                       multiline
                       fullWidth
                       minRows={4}
                       placeholder='Write your experience....'
                       value={review}
                       onChange={(e) => setReview(e.target.value)}
                       variant='outlined'
                    />
                </Box>
                <Box display="flex" justifyContent="center">
                    <ButtonLayout icon={RateReviewIcon} name="Submit" onClick={handleSubmit} />
                </Box>
                
            </Paper>
        </Box>
    );
};

export default Review;