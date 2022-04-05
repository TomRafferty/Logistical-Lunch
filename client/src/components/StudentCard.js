import React from "react";
import { Typography, Container, Box, Grid } from "@mui/material";
import { useState, useEffect } from "react";
import styled from "@emotion/styled";
// import { DateTime } from "luxon";
import DateRangeIcon from "@mui/icons-material/DateRange";
import meetingImage from "../../images/meeting-image.jpg";

const StudentCard = () => {
	const [cardData, setCardData] = useState([]);
	const cohort = JSON.parse(sessionStorage.getItem("cohortId"));

	// time trimming to turn this : 12:00:11 into this : 12:00
	const timeTrimmer = (timeString) => {
		const stringSplit = timeString.split(":");
		console.log(stringSplit);
		return stringSplit.slice(0,2).join(":");
	};
	// date trimmer to turn this : 2099-04-10T23:00:00.000Z into this : 2099-04-10
	const dateTrimmer = (dateString) => {
		const stringSplit = dateString.split("T");
		return stringSplit[0];
	};

	// hook to fetch the event information and display it within the card
	useEffect(() => {
		fetch(`/api/events/next?cohId=${cohort}`)
			.then(function (response) {
				if (response.ok) {
					return response.json();
				}
				throw `${response.status} ${response.statusText}`;
			})
			.then(function (data) {
				setCardData(data);
				console.log(`data values = ${Object.values(data[0])}`);
			})
			.catch(function (error) {
				console.log("An error occurred:", error);
			});
	}, []);

	// function to convert timestamp string into an array of time an date
	const timeSplitter = (element) => {
		return element.slice(0, 16).split("T");
	};
	// typography styling
	const TypographyInner = styled(Typography)({
		display: "inline",
		margin: "10px",
	});

	// getting region and class to display in heading

// 	return (
// 		<Box
  return (
		<Grid
			sx={{
				boxShadow: 3,
				display: "flex",
				flexWrap: "wrap",
				justifyContent: "space-around",
				my: 6,
				p: 4,
			}}
		>
			<Box disableGutters sx={{ width:"400px" }}>
				<Container
					sx={{ display: "flex", alignItems: "center", marginLeft: "0" }}
				>
					<DateRangeIcon fontSize="large"></DateRangeIcon>
					<Typography marginLeft="20px" fontSize="20px" fontWeight="bold">
						{/* optional heading, this can be changed */}
						{cardData.length === 0
							? "You have no Meetings"
							: cardData.length === 1
							? "You have 1 Meeting"
							: `You have ${cardData.length} Meetings`}
					</Typography>
				</Container>

				{cardData.map((element) => {
					console.log(JSON.parse(JSON.stringify(element)));
					return (
						<Box key={element.id} sx={{ mt: 2, p: 0 }}>
							<Container disableGutters>
								<Typography sx={{ mb: "5px" }}>
									<strong>Location:</strong>
									<TypographyInner sx={{ color: "primary.main" }}>
										{element.meeting_location}
									</TypographyInner>
								</Typography>
								<Typography sx={{ mb: "5px" }}>
									<strong>Date:</strong>
									<TypographyInner sx={{ color: "primary.main" }}>
										{/* {DateTime.fromISO(
											timeSplitter(element.meeting_start)[0]
										).toFormat("DDDD")} */}
										{dateTrimmer(element.meeting_date)}
									</TypographyInner>
								</Typography>
								<Typography sx={{ mb: "5px" }}>
									<strong>Meeting starts:</strong>
									<TypographyInner sx={{ color: "primary.main" }}>
										{/* {DateTime.fromISO(
											timeSplitter(element.meeting_start)[1]
										).toFormat("HH:mm a")} */}
										{timeTrimmer(element.meeting_start)}
									</TypographyInner>
								</Typography>

								<Typography sx={{ mb: "5px" }}>
									<strong>Meeting ends:</strong>
									<TypographyInner sx={{ color: "primary.main" }}>
										{/* {DateTime.fromISO(
											timeSplitter(element.meeting_end)[1]
										).toFormat("HH:mm a")} */}
										{timeTrimmer(element.meeting_end)}
									</TypographyInner>
								</Typography>

								<Typography sx={{ mb: "5px" }}>
									<strong>Address:</strong>
									<TypographyInner sx={{ color: "primary.main" }}>
										{element.meeting_address}
									</TypographyInner>
								</Typography>

								<Typography sx={{ mb: "5px" }}>
									<strong>Postcode:</strong>
									<TypographyInner sx={{ color: "primary.main" }}>
										{element.meeting_postcode}
									</TypographyInner>
								</Typography>

								<Typography>
									<strong>City:</strong>
									<TypographyInner sx={{ color: "primary.main" }}>
										{element.meeting_city}
									</TypographyInner>
								</Typography>
							</Container>
						</Box>
					);
				})}
// 			</Container>
// 			<img src={meetingImage} alt="meeting people" width="500px" />
// 		</Box>
			</Box>
			<img src={meetingImage} alt="meeting people" width="400px" />
		</Grid>
	);
};

export default StudentCard;