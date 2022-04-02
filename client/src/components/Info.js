import { React, useState, useEffect } from "react";
import {
	Paper,
	Typography,
	Card,
	Container,
	List,
	ListItem,
	Grid,
	Link,
} from "@mui/material";
import { DateTime } from "luxon";
import LunchShopperGuide from "./LunchShopperGuide";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { Box, styled } from "@mui/system";
const ListStyled = styled(List)({
	display: "flex",
	flexWrap: "wrap",
});

const ListItemStyled = styled(ListItem)({
	width: "150px",
	border: "1px solid #2196f3",
	margin: "5px 10px",
});


const Info = () => {
	const [eventInfo, setEventInfo] = useState([]);
	const [diet, setDiet] = useState([]);
	const shopperId = sessionStorage.getItem("userId");
	const getCohort = sessionStorage.getItem("cohortId");

	// this function uses the userId get event data for the user
	async function getEvent() {
		const eventData = await fetch(
			`/api/events/shopper?shopperId=${shopperId}`
		)
			.then((response) => response.json())
			.catch((error) => console.error(error));
		console.log("event", eventData[0].ingredients);
		console.log("eventdata", eventData);
		setEventInfo(eventData);
	}
	// gets dietary restrictions and lunch requirements for the particular cohort/class
	async function getDietary() {
		const dietData = await fetch(
			`/api/lunch/dietary?diets=${getCohort}}`
		)
			.then((response) => response.json())
			.catch((error) => console.error(error));
		setDiet(dietData.flat());
	}

	useEffect(() => {
		getEvent();
		getDietary();
	}, []);

	const timeSplitter = (element) => {
		return element.slice(0, 16).split("T");
	};

	return (
		<Grid display="flex" flexDirection="column" justifyItems="center">
			<Card
				sx={{
					boxShadow: 3,
					mx: "auto",
					mt: 4,
					mb: 2,
					py: 2,
					px: 4,
					width: "80%",
					display: "flex",
				}}
			>
				<ShoppingBasketIcon fontSize="large"></ShoppingBasketIcon>
				<Typography
					fontSize="20px"
					fontWeight="bold"
					alignSelf="flex-end"
					marginLeft="10px"
				>
					Lunch Shopper Guide
				</Typography>
			</Card>
			<LunchShopperGuide />
			{eventInfo.map((element) => {
				return (
					<Container disableGutters key={element.id} sx={{ mb: "15px", p: 0 }}>
						<Card sx={{ boxShadow: 3, mx: "auto", my: 3, p: 4, width: "80%" }}>
							<Typography padding="10px" variant="h6">
								<strong>Lunch Information:</strong>
							</Typography>
// TODO refactor to avoid hardcoded styles
							<Typography align="left" padding="10px">
								<strong>Meal Date:</strong>
								<Typography
									component="span"
									sx={{ color: "primary.main", m: "5px" }}
								>
									{DateTime.fromISO(
										timeSplitter(element.meeting_start)[0]
									).toFormat("DDDD")}
								</Typography>
							</Typography>
							<Typography padding="10px">
								<strong>Lunch maker:</strong>
								<Typography
									component="span"
									sx={{ color: "primary.main", m: "5px" }}
								>
									{element.user_name}
								</Typography>
							</Typography>
							<Typography padding="10px">
								<strong>Recipe:</strong>
								<Typography
									component="span"
									sx={{ color: "primary.main", m: "5px" }}
								>
									{element.recipe_name}
								</Typography>
							</Typography>
							<Typography padding="10px">
								<strong>Servings:</strong>
								<Typography
									component="span"
									sx={{ color: "primary.main", m: "5px" }}
								>
									{element.servings}
								</Typography>
							</Typography>
							<Typography marginLeft={"10px"} my={1}>
								<Typography>
									<strong>
										These are the ingredients you will need to buy:
									</strong>
								</Typography>
							</Typography>
							<Box width="80%">
								<ListStyled>
									{eventInfo[0].ingredients.map((element, index) => {
										return (
											<ListItemStyled key={index}>
												<Typography sx={{ color: "primary.main" }}>
													{element}
												</Typography>
											</ListItemStyled>
										);
									})}
								</ListStyled>
							</Box>
							<Box>
								<Typography padding="10px">
									<strong>
										For information on how to scale up ingredients:
									</strong>
									<Typography>
										<Link href="#" underline="hover">
											https://www.deliaonline.com/how-to-cook/and-the-rest/scaling-recipes-up-and-down
										</Link>
									</Typography>
								</Typography>
							</Box>
							<Box sx={{ mt: 2, p: 0 }}>
								<Typography marginLeft={"10px"}>
									<strong>Number of diners:</strong>
									<Typography
										component="span"
										sx={{ color: "primary.main", m: "5px" }}
									>
										{element.diners}
									</Typography>
									<br />
									<strong>Budget:</strong>
									<Typography
										component="span"
										sx={{ color: "primary.main", m: "5px" }}
									>
										£{element.diners * 5}
									</Typography>
								</Typography>
								<Typography marginLeft={"10px"}>
									<strong>Dietary restrictions:</strong>
								</Typography>
							</Box>
							<ListStyled padding="5px">
								{diet.map((element, index) => {
									return (
										<ListItemStyled key={index}>
											<Typography sx={{ color: "primary.main" }}>
												{element.allergy_name || element.requirement_name}
											</Typography>
										</ListItemStyled>
									);
								})}
							</ListStyled>
						</Card>
					</Container>
				);
			})}
			<Container disableGutters display="flex" alignSelf="center">
				<Card
					sx={{
						boxShadow: 3,
						mx: "auto",
						my: 3,
						p: 1,
						width: "85.5%",
						alignText: "center",
					}}
				>
					<Typography padding="10px">
						<strong>Here are some local shops:</strong>
					</Typography>
				</Card>
			</Container>
		</Grid>
	);
};

export default Info;
