import styled from "@emotion/styled";
import { Box, Button, FormControl, Grid, InputLabel, TextField, Typography } from "@mui/material";
import DateAdapter from "@mui/lab/AdapterLuxon";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { useEffect, useState } from "react";
import { DateTimePicker, MobileDatePicker } from "@mui/lab";
import { DateTime } from "luxon";

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
	const subObj = {
		location: "",
		postcode: "",
		address: "",
		city: "",
		meeting_start: "",
		meeting_end: "",
		currentCohort: sessionStorage.getItem("cohortId"),
	};
	const [submitState, setSubmitState] = useState({});
	const changeSubProp = (property, value) => {
		subObj[property] = value;
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


	// submission refresh useEffect:
	useEffect(() => {
		console.log(`getting to useEffect in create submission with the subObj values of: ${Object.values(subObj)}`);
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
				console.log(response);
				console.log("Created new event");
			})
			.catch((error) => {
				console.error(error);
				throw error;
			});
	});
	// sending off the submission object
	const submit = () => {
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
							onChange={(e) => changeSubProp(e.target.name, e.target.value)}
						/>
					</StyledInput>

					{/* postcode */}
					<StyledInput>
						<TextField
							label="postcode"
							required
							id="postcode-input"
							name="postcode"
							onChange={(e) => changeSubProp(e.target.name, e.target.value)}
						/>
					</StyledInput>

					{/* address */}
					<StyledInput>
						<TextField
							label="address"
							required
							id="address-input"
							name="address"
							onChange={(e) => changeSubProp(e.target.name, e.target.value)}
						/>
					</StyledInput>

					{/* city */}
					<StyledInput>
						<TextField
							label="city"
							required
							id="city-input"
							name="city"
							onChange={(e) => changeSubProp(e.target.name, e.target.value)}
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
						<Button
							variant="contained"
							type="submit"
							value="Submit"
						>
							Submit
						</Button>
					</StyledInput>
				</FormContainer>
			</Box>
		</form>
	);
};
export default CreateEventForm;