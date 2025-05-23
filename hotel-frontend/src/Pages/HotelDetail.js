import React from "react";
import { Box, Typography, Grid, CardMedia, Paper, Rating } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import WifiIcon from "@mui/icons-material/Wifi";
import PoolIcon from "@mui/icons-material/Pool"; 
import FreeBreakfastIcon from "@mui/icons-material/FreeBreakfast"; 
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import RateReviewIcon from '@mui/icons-material/RateReview';
import ButtonLayout from "../Components/ButtonLayout";
import Reviews from "../Components/Reviews";
import axios from "axios";

function HotelDetail() {

    const {id} = useParams();
    const [hotel,setHotel] = React.useState(null);

    const navigate = useNavigate();

    const facilities = [
        {
            facilityName: "Free Parking",
            icon: LocalParkingIcon
        },
        {
            facilityName: "Free WiFi",
            icon: WifiIcon
        },
        {
            facilityName: "Swimming Pool",
            icon: PoolIcon
        },
        {
            facilityName: "Breakfast",
            icon: FreeBreakfastIcon
        },
    ];

    React.useEffect(()=> {
        const fetchHotel = async ()=>{
            try{
                const res = await axios.get(`http://localhost:5007/api/Hotel/${id}`);
                setHotel(res.data);
            } catch(error){
                console.error("Faild to fetch hotel:",error);
            }
        };
        fetchHotel();
    }, [id]);

    if(!hotel){
        return <Typography textAlign="center">Loading....</Typography>
    }

    return (
        <>
        <Box sx={{
            width: "100%",
            height: "300px",
            backgroundColor: '#332925'
        }} />
        <Box sx={{ maxWidth: '1200px', mx: 'auto', p: 4, mt: -30 }}>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={4} mt={2}>
                        <Typography variant="h4" fontWeight="bold" color="#fff">{hotel.hotelName}</Typography>
                        <Typography variant="body2" color="#fff" mb={2}>
                            {hotel.location || "Address Not Available"}
                        </Typography>
                        <CardMedia
                            component="img"
                            height="450"
                            image={hotel.photoUrl || "/images/placeholder.jpg"}
                            alt={hotel.hotelName}
                            sx={{ width: "500px", borderRadius: 2 }} />
                    </Grid>

                    <Grid item xs={12} md={4} mt={12}>
                        <Paper elevation={2} sx={{ p: 2, mb: 2, maxWidth: "600px" }}>
                            <Typography variant="body1">
                                {hotel.description}
                            </Typography>
                        </Paper>

                        <Box>
                            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                                Facilities
                            </Typography>
                            <Grid container spacing={2}>
                                {facilities.map((facility) => {
                                    const IconComponent = facility.icon;
                                    return (
                                        <Grid item xs={6} sm={3}>
                                            <Box display="flex" alignItems="center" gap={1}>
                                                <IconComponent color="primary" />
                                                <Typography variant="body2">{facility.facilityName}</Typography>
                                            </Box>
                                        </Grid>
                                    );
                                })}
                            </Grid>
                        </Box>
                        <Box display='flex' alignItems="center" gap={1} mt={3}>
                            <Rating
                                value={hotel.ratings.length > 0
                                    ? hotel.ratings.reduce((sum, r) => sum + r.stars, 0) / hotel.ratings.length
                                    : 0}
                                precision={0.5}
                                readOnly />
                            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                                {hotel.ratings.length > 0
                                    ? (
                                        hotel.ratings.reduce((sum, r) => sum + r.stars, 0) /
                                        hotel.ratings.length
                                    ).toFixed(1)
                                    : "No ratings yet"}
                            </Typography>

                            <Rating value={hotel.Ratings || 0} precision={0.5} readOnly />
                            <Typography variant="body2" color="text.secondary">
                                Ratings: {hotel.Ratings || "Not Rated"}
                            </Typography>
                        </Box>
                        <Box display="flex" mt={5} gap={5} justifyContent="center">
                            <ButtonLayout icon={BookOnlineIcon}
                                name="Book Now"
                                onClick={() => navigate('/hotels/booking', { state: { hotel } })} />
                            <ButtonLayout icon={RateReviewIcon}
                                name="Rate & Review"
                                onClick={() => navigate('/hotels/review', { state: { hotel } })} />
                        </Box>

                    </Grid>
                </Grid>
                <Reviews hotelId={id} />
            </Box></>
    )
}

export default HotelDetail;