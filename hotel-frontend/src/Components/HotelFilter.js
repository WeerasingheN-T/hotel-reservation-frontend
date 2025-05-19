import React from "react";
import { Box, Button, TextField, InputAdornment, MenuItem } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StarIcon from '@mui/icons-material/Star';
import HotelIcon from '@mui/icons-material/Hotel';

function HotelFilter({ filters, handleFilterChange, handleSearch }) {

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          bgcolor: 'white',
          borderRadius: 3,
          border: '3px solid #febe10',
          p: 2,
          m: 4,
          ml: -1,
          boxShadow: 2,
          width: '98%'
        }}
      >
        <TextField
          name="destination"
          value={filters.destination}
          onChange={handleFilterChange}
          placeholder="Destination"
          variant="standard"
          sx={{ border: '1px solid #febe10', p: 0.4, borderRadius: 3 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LocationOnIcon />
              </InputAdornment>
            ),
            disableUnderline: true,
          }}
          fullWidth
        />

        <TextField
          name="rating"
          value={filters.rating}
          onChange={handleFilterChange}
          variant="standard"
          select
          sx={{ border: '1px solid #febe10', p: 0.4, borderRadius: 3 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <StarIcon />
              </InputAdornment>
            ),
            disableUnderline: true,
          }}
          fullWidth
        >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="5">5 Stars</MenuItem>
            <MenuItem value="4">4 Stars</MenuItem>
            <MenuItem value="3">3 Stars</MenuItem>
            <MenuItem value="2">2 Stars</MenuItem>
            <MenuItem value="1">1 Star</MenuItem>
        </TextField>

        <TextField
          name="hotelName"
          value={filters.hotelName}
          onChange={handleFilterChange}
          placeholder="Hotel Name"
          variant="standard"
          sx={{ border: '1px solid #febe10', p: 0.4, borderRadius: 3 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <HotelIcon />
              </InputAdornment>
            ),
            disableUnderline: true,
          }}
          fullWidth
        />

        <Button
          variant="contained"
          onClick={handleSearch}
          sx={{
            height: '100%',
            bgcolor: '#0071c2',
            color: 'white',
            px: 4,
            borderRadius: 2,
            "&:hover": {
              bgcolor: '#005999',
            }
          }}
        >
          Search
        </Button>
      </Box>
    </>
  );
}

export default HotelFilter;
