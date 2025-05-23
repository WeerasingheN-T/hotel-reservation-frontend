import React, { useRef } from "react";
import { Box, Button, Grid, Typography } from '@mui/material';
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import HotelsGrid from "../Components/HotelsGrid";
import HotelMap from "../Components/HotelMap";

function Home() {
  const videoRef = useRef(null);

  const handleUnmute = () => {
    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.volume = 1.0;
      videoRef.current.play();
    }
  };

  return (
    <>
    <Box 
       sx={{ width: '100%',
        height: '400px',
        backgroundImage: `url('/images/welcomeImg.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: "white",
        position: 'relative',
        display: 'flex',
        alignItems: 'flex-end'
        }}
      >
        <Box sx={{ padding: '100px 60px', textAlign: 'left'}}>
          <Typography variant="h2" sx={{ fontWeight: 'bold'}}>Recharge</Typography>
          <Typography variant="h2" sx={{ fontWeight: 'bold' }}>in a vacation home</Typography>
          <Typography variant="h5">Discover Beautiful Hotels in Sri Lanka</Typography>
        </Box>
          
      </Box>
      <Box mt={-3}>
        <HotelsGrid />
      </Box>
      
    </>
  );
}

export default Home;