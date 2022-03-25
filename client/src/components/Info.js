import { React, useState, useEffect } from "react";
import { Paper, Typography, Card, Container, List, ListItem, Box } from "@mui/material";
import { DateTime } from "luxon";


const Info = () => {
    const [eventInfo, setEventInfo] = useState([]);
    const [diet, setDiet ] = useState([]);
    const shopperId = JSON.parse(sessionStorage.getItem("userId"));
    const getCohort = JSON.parse(sessionStorage.getItem("cohortId"));
    // this function uses the userId get event data for the user
    async function getEvent() {
    const eventData = await fetch(`http://localhost:3000/api/events/shopper?shopperId=${shopperId}`)
    .then((response) => response.json())
    .catch((error) => console.error(error));

    setEventInfo(eventData);
    }
	// gets dietary restrictions and lunch requirements for the particular cohort/class
    async function getDietary() {
        const dietData = await fetch(
			`http://localhost:3000/api/lunch/dietary?diets=${getCohort}}`)
			.then((response)=> response.json())
			.catch((error) => console.error(error));
    setDiet(dietData.flat());
    }


    useEffect(()=>{
        getEvent();
        getDietary();
    },[]);

const timeSplitter = (element) => {
	return element.slice(0, 16).split("T");
};

    return (
		<Container sx={{ mb: "15px" }}>
			<Paper
				sx={{
					mt: "15px",
					mb: "15px",
					fontSize: "24px",
					textAlign: "center",
					padding: "5px",
				}}
			>
				Lunch Shopper Guide
			</Paper>
        	{eventInfo.map((element, index)=> {
    			return (
					<Box key ={index} >
						<Card>
							<Typography align="left" padding="10px">
								You have been assigned the role of Lunch Shopper for the{" "}
								<b>
									{element.region} {element.class_number}
								</b>{" "}
								meeting on{" "}
								<b>
									{DateTime.fromISO(
										timeSplitter(element.meeting_start)[0]
									).toFormat("DDDD")}
								</b>
								<br />
							</Typography>
							<Typography padding="10px">
								<b>{element.user_name}</b> has been assigned the role of
								lunch maker and has chosen this recipe.
								<List dense>
									<ListItem>These</ListItem>
									<ListItem>Are</ListItem>
									<ListItem>The</ListItem>
									<ListItem>Recipe</ListItem>
									<ListItem>Ingredients</ListItem>
								</List>
							</Typography>
							<Typography padding="10px">
								{element.diners} students will be having lunch and your
								budget is £{element.diners * 5}
								<br />
							</Typography>
							<Typography padding="10px">
								The dietary restrictions and requirements for this meal are
							</Typography>
							<Box padding="5px">
								{diet.map((element, index) => {
									return (
										<Typography key={index}display="inline-block" padding="5px" fontWeight="bold">
											{element.allergy_name || element.requirement_name}
										</Typography>
									);
								})}
							</Box>
						</Card>

						<Paper
							sx={{
								mt: "15px",
								mb: "15px",
								textAlign: "center",
							}}
						>
							<Typography padding="10px">
								Here are some local shops
							</Typography>
						</Paper>
					</Box>
			);
})}
		</Container>
     );
};

export default Info;