import React, { useRef } from "react";
import { Box, Button } from '@mui/material';
import VolumeUpIcon from "@mui/icons-material/VolumeUp";

function WelcomeVedio() {

    const videoRef = useRef(null);
    
    const handleUnmute = () => {
        if (videoRef.current) {
          videoRef.current.muted = false;
          videoRef.current.volume = 1.0;
          videoRef.current.play();
        }
    };

    return (
        <Box sx={{
                position: 'relative',
                width: '100%',
                height: '60vh', 
                overflow: 'hidden',
              }}
            >
              <video ref={videoRef}
                autoPlay
                muted
                loop
                playsInline
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover', 
                  zIndex: -1,
                }}
              >
                <source src="/videos/welcome.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>

            <Button
              onClick={handleUnmute}
              variant="contained"
              startIcon={<VolumeUpIcon />}
              sx={{
                position: "absolute",
                bottom: 30,
                left: 30,
                backgroundColor: "rgba(0,0,0,0.5)",
                color: "white",
                zIndex: 1,
                  "&:hover": {
                   backgroundColor: "rgba(0,0,0,0.7)",
                },
              }}
            >
              Sound
            </Button>
        </Box>
    )
};

export default WelcomeVedio;