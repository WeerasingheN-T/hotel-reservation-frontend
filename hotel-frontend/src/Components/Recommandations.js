import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Divider, Card, Grid, CardMedia, CardContent, Container, Pagination } from '@mui/material';
import usePagination from "../Pagination/usePagination";
import axios from "axios";

function Recommandations() {

  const [hotels, setHotels] = React.useState([]);
  const hotelPerpage = 2;

  const navigate = useNavigate();

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

  const starsHotels = hotels.filter(hotel=> {
    if(!hotel.ratings || hotel.ratings.length === 0) return false;
    const avgRatings = hotel.ratings.reduce((sum,r)=>sum + r.stars, 0)/hotel.ratings.length;

    return avgRatings >= 4.00;
  })

  const { currentData, currentPage, maxPage, jump } = usePagination (
    starsHotels,
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
               <Grid container spacing={2} m={1.5}>
                              {currentData().map((hotel) => (
                                  <Grid item xs={12} sm={6} md={4} key={hotel.id}>
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
                                              {hotel.ratings.length > 0 ? (
                                                <>
                                                  <Typography variant="body2" color="text.secondary">
                                                    {"⭐".repeat(Math.round(hotel.ratings.reduce((acc, r) => acc + r.stars, 0) / hotel.ratings.length))} :
                                                    {(hotel.ratings.reduce((acc, r) => acc + r.stars, 0) / hotel.ratings.length).toFixed(1)}
                                                  </Typography>
                                                </>
                                                ) : (
                                                  <Typography variant="body2" color="text.secondary">
                                                      No ratings yet
                                                  </Typography>
                                              )}
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

export default Recommandations;