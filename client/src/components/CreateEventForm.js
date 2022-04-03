/* eslint-disable no-inner-declarations */
import styled from "@emotion/styled";
import { Box, Button, Container, FormControl, Grid, TextField, Typography } from "@mui/material";
import DateAdapter from "@mui/lab/AdapterLuxon";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { useEffect, useState } from "react";
import { DateTimePicker } from "@mui/lab";
import { DateTime } from "luxon";
import EventAvailableRoundedIcon from "@mui/icons-material/EventAvailableRounded";

// styles:
// const Header = styled(Typography)({
// 	align: "center",
// 	variant: "h3",
// });
const FormContainer = styled(Grid)({
	display: "flex",
	spacing: "0",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "center",
	padding: "20px",
	background: "#fafafa",
	marginBottom: "2rem",
});
const StyledInput = styled(FormControl)({
	margin: "1rem",
	width: "80%",
});
const CreateEventForm = () => {
	// submit state
	const emptyEvent = {
		location: "",
		postcode: "",
		address: "",
		city: "",
		meeting_start: "",
		meeting_end: "",
		currentCohort: sessionStorage.getItem("cohortId"),
	};
	const subObj = emptyEvent;
	const [submitState, setSubmitState] = useState(emptyEvent);

	// dates to display and use to update the subObj:
	const [displayedStartDate, setDisplayedStartDate] = useState(new Date());
	const [displayedEndDate, setDisplayedEndDate] = useState(new Date());
	// change date useEffect will refresh the date value in subObj
	useEffect(() => {
		subObj.meeting_start = DateTime.local(displayedStartDate).toSQL();
	});
	useEffect(() => {
		subObj.meeting_end = DateTime.local(displayedEndDate).toSQL();
	});

	// async function which will recall the useEffect for submission when called
	const submitReq = async () => {
		const shouldPass = submitState.location !== "" ? true : false;
		if (shouldPass) {
			console.log(submitState);
			const options = {
				method: "post",
				headers: {
					Accept: "application/json, text/plain, */*",
					"Content-Type": "application/json",
				},
				body: JSON.stringify(submitState),
			};
			await fetch("/api/createNewEvent", options)
				.then(() => {
					console.log("Created new event");
				})
				.catch((error) => {
					console.error(`error - ${error}`);
					throw error;
				});
		}
	};

	// submission refresh useEffect:
	useEffect(() => {
		submitReq();
	}, []);
	// handle changes to the subObj
	const handleSubObjChange = (key, value) => {
		subObj[key] = value;
		setSubmitState(subObj);
	};

	return (
		<Box sx={{ mx: "auto", p: 4, width: "45%" }}>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					submitReq();
				}}
			>
				<FormContainer container>
					<Container
						sx={{ display: "flex", alignItems: "center", marginLeft: "0", padding: "20px" }}
					>
						<EventAvailableRoundedIcon fontSize="large"></EventAvailableRoundedIcon>
						<Typography marginLeft="20px" fontSize="20px" fontWeight="bold">
							Create an Event
						</Typography>
					</Container>

					{/* location */}
					<StyledInput>
						<TextField
							label="location"
							required
							id="location-input"
							name="location"
							onChange={(e) =>
								handleSubObjChange(e.target.name, e.target.value)
							}
						/>
					</StyledInput>

					{/* postcode */}
					<StyledInput>
						<TextField
							label="postcode"
							required
							id="postcode-input"
							name="postcode"
							onChange={(e) =>
								handleSubObjChange(e.target.name, e.target.value)
							}
						/>
					</StyledInput>

					{/* address */}
					<StyledInput>
						<TextField
							label="address"
							required
							id="address-input"
							name="address"
							onChange={(e) =>
								handleSubObjChange(e.target.name, e.target.value)
							}
						/>
					</StyledInput>

					{/* city */}
					<StyledInput>
						<TextField
							label="city"
							required
							id="city-input"
							name="city"
							onChange={(e) =>
								handleSubObjChange(e.target.name, e.target.value)
							}
						/>
					</StyledInput>

					{/* meeting start */}
					<StyledInput>
						<LocalizationProvider dateAdapter={DateAdapter}>
							<DateTimePicker
								required
								disableToolbar
								variant="inline"
								margin="normal"
								id="meeting-start-date-picker"
								label="meeting-start-date"
								name="meeting_start"
								value={displayedStartDate}
								onChange={(newDate) => {
									setDisplayedStartDate(newDate);
								}}
								keyboardButtonProps={{
									"aria-label": "change date",
								}}
								openTo="day"
								renderInput={(params) => <TextField {...params} />}
							/>
						</LocalizationProvider>
					</StyledInput>

					{/* meeting end */}
					<StyledInput>
						<LocalizationProvider dateAdapter={DateAdapter}>
							<DateTimePicker
								required
								disableToolbar
								variant="inline"
								margin="normal"
								id="meeting-start-date-picker"
								label="meeting-start-date"
								name="meeting_start"
								value={displayedEndDate}
								onChange={(newDate) => {
									setDisplayedEndDate(newDate);
								}}
								keyboardButtonProps={{
									"aria-label": "change date",
								}}
								openTo="day"
								renderInput={(params) => <TextField {...params} />}
							/>
						</LocalizationProvider>
					</StyledInput>

					{/* submit button */}
					<StyledInput>
						<Button variant="contained" type="submit" value="Submit">
							Create
						</Button>
					</StyledInput>
				</FormContainer>
			</form>
		</Box>
	);
};
export default CreateEventForm;