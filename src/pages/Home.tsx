import { Box, Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const Home = () => {
  const mfes = [1, 2, 3];
  return (
    <Box className="flex items-center justify-center min-h-[calc(100vh-174px)]">
      {/* <Box className="text-center p-8">ehje ehejhej ehejehj</Box> */}
      <Grid container spacing={4}>
        {mfes.map((mfe) => (
          <Grid
            size={{ xs: 12, md: 6, lg: 4 }}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Card
              sx={{
                maxWidth: {
                  xs: 515,
                  md: "100%",
                },
              }}
            >
              <CardMedia
                sx={{ height: 140 }}
                image="/static/images/cards/contemplative-reptile.jpg"
                title="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Lizard
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Home;
