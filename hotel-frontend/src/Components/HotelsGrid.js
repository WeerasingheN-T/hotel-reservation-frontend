import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Divider, Card, Grid, CardMedia, CardContent, Container, Pagination } from '@mui/material';
import usePagination from "../Pagination/usePagination";
import HotelFilter from "./HotelFilter";
import axios from "axios";

function HotelsGrid() {

  const [hotels, setHotels] = React.useState([]);
  const [filteredHotels, setFilteredHotels] = React.useState([]);
  const hotelPerpage = 10;

  const navigate = useNavigate();

  const [filters, setFilters] = React.useState({
    destination: "",
    rating: "",
    hotelName: "",
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearch = () => {
    const filtered = hotels.filter((hotel)=> {
      const destinationMatch = filters.destination ? 
      hotel.location?.toLowerCase().includes(filters.destination.toLowerCase()) : true;

      const ratingMatch = filters.rating ?
      hotel.Ratings?.toString() === filters.rating.toString() : true;

      const hotelNameMatch = filters.hotelName? 
      hotel.hotelName?.toLowerCase().includes(filters.hotelName.toLowerCase()) : true;

      return destinationMatch && ratingMatch && hotelNameMatch;
    });
    setFilteredHotels(filtered);
  };

  React.useEffect(() => {
    const getHotels = async () => {
      try {
        const response = await axios.get("http://localhost:5007/api/Hotel");
        setHotels(response.data);
      } catch (error) {
        console.error("Error fetching hotels:", error);
      }
    };

    getHotels();
  }, []);

  const { currentData, currentPage, maxPage, jump } = usePagination (
    hotels,
    hotelPerpage
  );

  const handlePageChange = (event, value) => {
    jump(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Container sx={{ margin: '10px', maxWidth: "1480px !important"}}>
        <Box textAlign="left">
        <Typography fontWeight="bold" variant="h6">
          Recommended Places
        </Typography>
        <Divider />
      </Box>

      <Box>
        {hotels.length === 0 ? (
          <Typography variant="body1" textAlign="center">
            No hotels available.
          </Typography>
        ) : (
            <>
              <HotelFilter filters={filters} handleFilterChange={handleFilterChange} handleSearch={handleSearch} />
               <Grid container spacing={2} m={1.5}>
                              {(filteredHotels.length > 0 ? filteredHotels : currentData()).map((hotel) => (
                                  <Grid item xs={12} sm={6} md={4} key={hotel.id} mt={2}>
                                      <Card
                                          onClick={()=>navigate(`/hotels/${hotel.id}`)}
                                          sx={{
                                              height: 300,
                                              width: 268,
                                              display: 'flex',
                                              flexDirection: 'column',
                                              justifyContent: 'space-between',
                                              transition: "0.3s",
                                              "&:hover": {
                                                  boxShadow: 6,
                                              },
                                          }}
                                      >
                                          <CardMedia
                                              component="img"
                                              height="180"
                                              image={hotel.photoUrl || "/images/placeholder.jpg"}
                                              alt={hotel.hotelName}
                                              sx={{ objectFit: "cover", width: '340px' }} />
                                          <CardContent>
                                              <Typography variant="h6" gutterBottom>
                                                  {hotel.hotelName}
                                              </Typography>
                                              <Typography variant="body2" color="text.secondary">
                                                  Ratings: {hotel.ratings}
                                              </Typography>
                                          </CardContent>
                                      </Card>
                                  </Grid>
                              ))}
                          </Grid>
                          <Box mt={4} display="flex" justifyContent="center">
                                <Pagination
                                  count={maxPage}
                                  page={currentPage}
                                  onChange={handlePageChange}
                                  color="primary"
                                />
                        </Box>
            </>
        )}
      </Box>
      
    </Container>
  );
}

export default HotelsGrid;