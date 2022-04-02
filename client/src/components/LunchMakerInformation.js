import { Container, List, ListItem, Typography, Grid } from "@mui/material";
import { Box, styled } from "@mui/system";
import { useEffect, useState } from "react";
import LunchDiningRoundedIcon from "@mui/icons-material/LunchDiningRounded";

const ListStyled = styled(List)({
	display: "flex",
	flexWrap: "wrap",
});

const makeArrayUnique = (arr) => {
	// reusable array formatter for ensuring every element only appears once.
	let newArr = [];
	arr.forEach((element) => {
		if (!newArr.includes(element)) {
			newArr.push(element);
		}
	});
	return newArr;
};
const ListItemStyled = styled(ListItem)({
	width: "150px",
	border: "1px solid #2196f3",
	margin: "5px 10px",
});

const LunchMakerInformation = () => {
	const [dietaryRestrictions, setDietaryRestrictions] = useState([]);
	const [numberOfServings, setNumberOfServings] = useState(0);
	const [lunchShopper, setLunchShopper] = useState("");
	const thisUserCohort = sessionStorage.getItem("cohortId");

	useEffect(() => {
		const options = {
			method: "post",
			headers: {
				Accept: "application/json, text/plain, */*",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ "cohort_id":thisUserCohort }),
		};
		fetch("/api/lunchMakerInfo", options)
			.then((response) => {
				if (response.ok) {
					return response.json();
				}
				throw `${response.status} ${response.statusText}`;
			})
			.then((data) => {
				const dietRes = makeArrayUnique(data.allergies.flat());
				setDietaryRestrictions(dietRes);

				const numServ = Object.values(data.numDiners)[0];
				setNumberOfServings(numServ);

// 			const lunchShop = data.lunchShopper.user_name;
// 			setLunchShopper(lunchShop);

//      TODO make sure this is correct.
				const lunchShop = data.lunchShopper;
				setLunchShopper(lunchShop.user_name);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []); //removing the dependency array here will cause infinite requests to be made
    return (
			<Grid>
				<Container
					sx={{ display: "flex", alignItems: "center", marginLeft: "0" }}
				>
					<LunchDiningRoundedIcon fontSize="large"></LunchDiningRoundedIcon>
					<Typography marginLeft="20px" fontSize="20px" fontWeight="bold">
						Lunch Information
					</Typography>
				</Container>
				<Box sx={{ mt: 2, p: 0 }}>
					<Typography>
						<strong>Number of servings required:</strong>
						<Typography
							component="span"
							sx={{ color: "primary.main", m: "5px" }}
						>
							{numberOfServings}
						</Typography>
					</Typography>

					<Typography>
						<strong>Dietary restrictions:</strong>
					</Typography>
					<ListStyled>
						{dietaryRestrictions.map((restriction, index) => {
							return (
								<ListItemStyled key={`restriction-${index}-key`}>
									<Typography sx={{ color: "primary.main" }}>
										{restriction}
									</Typography>
								</ListItemStyled>
							);
						})}
					</ListStyled>
					<Typography>
						<strong>The lunch shopper this week is:</strong>
						<Typography component="span" sx={{ color: "primary.main" }}>
							{" "}
							{lunchShopper}
						</Typography>
					</Typography>
				</Box>
			</Grid>
		);
};
export default LunchMakerInformation;