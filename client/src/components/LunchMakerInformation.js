import { Card, List, ListItem, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";

const TypographyInner = styled(Typography)({
	variant: "h6",
	display: "inline",
	marginLeft: "10px",
	color: "text.primary",
	fontWeight: "bold",
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
		fetch("http://localhost:3000/api/lunchMakerInfo", options)
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

				const lunchShop = data.lunchShopper.user_name;
				setLunchShopper(lunchShop);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []); //removing the dependency array here will cause infinite requests to be made
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