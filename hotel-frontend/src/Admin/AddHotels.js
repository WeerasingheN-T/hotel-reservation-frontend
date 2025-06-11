import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Grid, TextField, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import ButtonLayout from '../Components/ButtonLayout';
import AddHomeIcon from '@mui/icons-material/AddHome';
import AllBookings from './AllBookings';
import HotelsGrid from '../Components/HotelsGrid';
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddHotels() {

    const [hoteldata, setHotelData] = React.useState({
        hotelName: '',
        location: '',
        description: '',
        PhoneNumber: '',
        email: '',
        PricePerNight: '',
        NumberOfRooms: '',
        IsAvailable: '',
        Ratings: ''
    });

    const [photo, setPhoto] = React.useState(null);
    const navigate = useNavigate();
    const {action} = useParams();

    const handleChange =(e)=> {
        const {name, value} =e.target;
        setHotelData((prev)=>({
            ...prev,
            [name]: name === "IsAvailable" ? value === "true" : value,
        }));
    };

    const handlePhoto =(e)=> {
        const file = e.target.files[0];
        setPhoto(file);
    }

    const handleSubmit =async()=> {
        const formdata = new FormData();

        for (const key in hoteldata) {
            if (hoteldata[key] !== undefined && hoteldata[key] !== null) {
               formdata.append(key, hoteldata[key]);
            }
        }
        if (photo) {
           formdata.append("photo", photo);
        }

        for (let pair of formdata.entries()) {
        console.log(`${pair[0]}:`, pair[1]);
    }

        try{
            if(action === "edit"){
                const response = await axios.put(`http://localhost:5007/api/Hotel/${hotel.id}`, formdata, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            const hotel = response.data;
            alert("Hotel added successfully!");
            navigate(`/hotels/${hotel.id}`)
            }
            const response = await axios.post("http://localhost:5007/api/Hotel/save", formdata, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            const hotel = response.data;
            alert("Hotel added successfully!");
            navigate(`/hotels/${hotel.id}`)
        } catch (error){
            alert("Failed to add hotel.");
        }
    }

    return (
        <Box sx={{ padding: 4, maxWidth: '1200px', margin: 'auto' }}>
            <Grid container spacing={4}>
                <Grid item xs={12} md={6} sx={{ minWidth: '600px', maxWidth: '602px' }}>
                    <Typography variant='h5' fontWeight="bold" gutterBottom>{ action === "edit" ? "Edit Hotel Details": "Add Hotel Details"}</Typography>
                    <Box display="flex" flexDirection="column" gap={2}>
                        <TextField label="Name of the Hotel:" name="hotelName" value={hoteldata.hotelName} onChange={handleChange} />
                        <TextField label="Location:" name="location" value={hoteldata.location} onChange={handleChange} />
                        <input type='file' accept='image/*' name='photo' onChange={handlePhoto} />
                        <TextField label='Description' 
                           multiline 
                           minRows={4} 
                           name='description'
                           value={hoteldata.description}
                           onChange={handleChange}/>
                        <TextField label='Phone Number' name='PhoneNumber' value={hoteldata.PhoneNumber} onChange={handleChange} />
                        <TextField label='Hotel Email' name='email' value={hoteldata.email} onChange={handleChange} />
                        <TextField label='Price per Night' name='PricePerNight' 
                           value={hoteldata.PricePerNight} 
                           onChange={handleChange} />
                        <TextField label='Number of Rooms' name='NumberOfRooms' 
                           value={hoteldata.NumberOfRooms} 
                           onChange={handleChange} />
                        <FormControl fullWidth sx={{ mt: 2 }}>
                            <InputLabel id="is-available-label">Is Available</InputLabel>
                            <Select labelId="is-available-label"
                                label="Is Available"
                                name='IsAvailable'
                                value={hoteldata.IsAvailable}
                                onChange={handleChange}
                            >
                                <MenuItem value="true">Yes</MenuItem>
                                <MenuItem value="false">No</MenuItem>
                            </Select>    
                        </FormControl>
                    </Box>
                    <Box display='flex' justifyContent='center' mt={3}>
                        <ButtonLayout icon={AddHomeIcon} name="Submit Hotel" onClick={handleSubmit}/>
                    </Box>
                    <Box ml={-4}>
                       <HotelsGrid component="admin" itemsPerPage="4"/> 
                    </Box>                   
                </Grid>
                <Grid item xs={12} md={6}>
                    <AllBookings/>
                </Grid>
            </Grid>
        </Box>
    )
}

export default AddHotels;