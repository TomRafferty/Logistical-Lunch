import styled from "@emotion/styled";
import { Box, Button, FormControl, Grid, InputLabel, TextField, Typography } from "@mui/material";
import DateAdapter from "@mui/lab/AdapterLuxon";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { useEffect, useState } from "react";
import { DateTimePicker, MobileDatePicker } from "@mui/lab";
import { DateTime } from "luxon";

// styles:
const Header = styled(Typography)({
	align: "center",
	variant: "h3",
});
const FormContainer = styled(Grid)({
	spacing: "0",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "center",
	padding: "30px 50px",
	background: "#fafafa",
});
const StyledInput = styled(FormControl)({
	margin: "2rem",
	width: "40%",
});
const CreateEventForm = () => {
	// submit state and change handler
	const emptyEvent = {
		location: "",
		postcode: "",
		address: "",
		city: "",
		meeting_start: "",
		meeting_end: "",
		currentCohort: 378, //TODO change to session storage
		// currentCohort: sessionStorage.getItem("cohortId"),
	};
	const subObj = emptyEvent;
	const [submitState, setSubmitState] = useState(subObj);
	// handle changes to the subObj
	const handleSubObjChange = (key, value) => {
		subObj[key] = value;
		console.log(`just changed ${key} to = ${value}`);
		console.log(`subObj values now = ${Object.values(subObj)}`);
	};
	// dates to display and use to update the subObj:
	const [displayedStartDate, setDisplayedStartDate] = useState(new Date());
	const [displayedEndDate, setDisplayedEndDate] = useState(new Date());
	// change date useEffect will refresh the date value in subObj
	useEffect(() => {
		subObj.meeting_start = displayedStartDate;
	});
	useEffect(() => {
		subObj.meeting_end = displayedEndDate;
	});

	// TODO fix fetch request

	// submission refresh useEffect:
	useEffect(() => {
		// even though the fields are required this just ensures that no empty objects get sent through
		const shouldPass = submitState.location !== "" ? true : false;
		if (shouldPass) {
			console.log(`should pass = ${shouldPass}`);
			// currently it gets this far but doesn't make it to the api...
			const options = {
				method: "post",
				headers: {
					Accept: "application/json, text/plain, */*",
					"Content-Type": "application/json",
				},
				body: JSON.stringify(submitState),
			};
			fetch("http://localhost:3000/api/createNewEvent", options)
				.then((response) => {
					console.log(`hello there! here is the fetch response ${response}`);
					console.log("Created new event");
				})
				.catch((error) => {
					console.error(error);
					throw error;
				});
		}
	}, []);
	// sending off the submission object
	const submit = () => {
		console.log("clicked submit");
		// this sets the state, causing a refresh of the above useEffect
		setSubmitState(subObj);
	};

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				submit();
			}}
		>
			<Box sx={{ boxShadow: 3, mx: "auto", my: 6, p: 4, width: "80%" }}>
				<FormContainer container>
					<Header>Create New Event:</Header>

					{/* location */}
					<StyledInput sx={{ width: 1 / 2 }}>
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
							Submit
						</Button>
					</StyledInput>
				</FormContainer>
			</Box>
		</form>
	);
};
export default CreateEventForm;