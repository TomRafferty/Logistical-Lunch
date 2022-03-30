import { Typography, Box, Container } from "@mui/material";
import EngineeringIcon from "@mui/icons-material/Engineering";


const LunchMakerGuide = () => {
 return (
    <Box sx={{ boxShadow: 3, mx: "auto", my: 6, p: 4, width: "80%" }}>
        <Container sx={{ display: "flex", alignItems: "center", marginLeft: "0" }}>
            <EngineeringIcon fontSize="large"></EngineeringIcon>
            <Typography marginLeft="20px" fontSize="20px" fontWeight="bold">
                How does it work?
            </Typography>
        </Container>
        <Typography marginTop={2} align="justify">
            You have been nominated to be this week’s lunch maker. This means you will
            have to prepare the meals for the rest of the class. Students will have to
            select their requirements before Thursday each week. The requirements
            provided by them are all available to you. Please note the following:
            numbers of meals, dietary restrictions and dietary requirements. You will
            need to keep this in mind when you are choosing the recipe you would like to
            prepare. The name of the lunch shopper is given to you so you can
            communicate directly with them in order to prepare the meals for the event.
            As soon as you select a recipe, a shopping list will be sent automatically
            to the lunch shopper so they will be able to provide you the necessary
            ingredients.
        </Typography>
    </Box>
 );
};


 export default LunchMakerGuide;

