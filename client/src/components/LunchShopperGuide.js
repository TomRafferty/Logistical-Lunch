import { Typography, Box, Container } from "@mui/material";
import EngineeringIcon from "@mui/icons-material/Engineering";

const LunchShopperGuide = () => {
	return (
		<Box sx={{ boxShadow: 3, mx: "auto", my:6, p: 4, width: "80%" }}>
			<Container
				sx={{ display: "flex", alignItems: "center", marginLeft: "0" }}
			>
				<EngineeringIcon fontSize="large"></EngineeringIcon>
				<Typography marginLeft="20px" fontSize="20px" fontWeight="bold">
					How does it work?
				</Typography>
			</Container>
			<Typography marginTop={2} align="justify">
				You have been nominated to be this week’s lunch shopper. 
                This means you will have to shop for recipe ingredients so that the lunch-maker can prepare a meal for the rest of the class. 
                Students will have to select whether they want a meal and also their dietary requirements before Thursday each week. 
                The dietary requirements, restrictions and number of diners will be available for you to view below.
                As the week progresses the number of diners may change so bear this is in mind when you are deciding on the quantities of ingredients.
                The name of the lunch maker will be given to you so you can communicate directly with them in order to discuss the upcoming meal. 
                As soon as a recipe is selected, you will receive a list of ingredients.
			</Typography>
		</Box>
	);
};

export default LunchShopperGuide;
