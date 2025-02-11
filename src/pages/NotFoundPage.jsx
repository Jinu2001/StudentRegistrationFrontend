import { Link } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";

const NotFoundPage = () => {
  return (
    <Box sx={{ textAlign: "center", mt: 10 }}>
      <Typography variant="h4" color="error">404 - Page Not Found</Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>Oops! The page you're looking for doesn't exist.</Typography>
      <Button variant="contained" sx={{ mt: 3 }} component={Link} to="/">Go Home</Button>
    </Box>
  );
};

export default NotFoundPage;
