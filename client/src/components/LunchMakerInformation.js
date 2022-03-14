import { Card, List, ListItem, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { Box } from "@mui/system";

const dietaryRestrictions = ["No Nuts", "No Carbs", "Vegan"];
const numberOfServings = 13;
const lunchShopper = "Tom - oh dear...";

const TypographyInner = styled(Typography)({
	variant: "h6",
	display: "inline",
	marginLeft: "10px",
	color: "text.primary",
	fontWeight: "bold",
});

const LunchMakerInformation = () => {
    return (
			<Box>
				<Typography variant="h5" textAlign={"center"}>This Weeks Lunch Information:</Typography>
				<Card sx={{ mt: 2 }}>
					<TypographyInner>{`Number of Servings Required: ${numberOfServings}`}</TypographyInner>
					<List>
						<TypographyInner>Dietary Restrictions:</TypographyInner>
						{dietaryRestrictions.map((restriction, index) => {
							return (
								<ListItem key={`restriction-${index}-key`}>
									<TypographyInner>{restriction}</TypographyInner>
								</ListItem>
							);
						})}
					</List>
					<TypographyInner>{`Your Lunch Shopper This Week Is: ${lunchShopper}`}</TypographyInner>
				</Card>
			</Box>
		);
};
export default LunchMakerInformation;