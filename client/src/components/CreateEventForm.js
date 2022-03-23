import styled from "@emotion/styled";
import { Button, Card, FormControl, Grid, Input, InputLabel, TextField, Typography } from "@mui/material";
import DateAdapter from "@mui/lab/AdapterLuxon";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { useState } from "react";
import { MobileDatePicker } from "@mui/lab";
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

	// format new date from picker
	const formatDate = (dateObj) => {
		return DateTime.fromObject({
			year: dateObj.year,
			month: dateObj.month,
			day: dateObj.day,
			hour: dateObj.hour,
			minute: dateObj.minute,
			second: dateObj.second,
			millisecond: dateObj.millisecond,
		}).toSQL();
	};

	// sending off the submission object
	const submit = () => {
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
	};

	return (
		<FormContainer container>
			<Header>Create New Event:</Header>

			{/* location */}
			<StyledInput sx={{ width: 1 / 2 }}>
				<InputLabel htmlFor="location-input">Location</InputLabel>
				<TextField
					id="location-input"
					name="location"
					onChange={(e) => changeSubProp(e.target.name, e.target.value)}
				/>
			</StyledInput>

			{/* postcode */}
			<StyledInput>
				<InputLabel htmlFor="postcode-input">postcode</InputLabel>
				<TextField
					id="postcode-input"
					name="postcode"
					onChange={(e) => changeSubProp(e.target.name, e.target.value)}
				/>
			</StyledInput>

			{/* address */}
			<StyledInput>
				<InputLabel htmlFor="address-input">address</InputLabel>
				<TextField
					id="address-input"
					name="address"
					onChange={(e) => changeSubProp(e.target.name, e.target.value)}
				/>
			</StyledInput>

			{/* city */}
			<StyledInput>
				<InputLabel htmlFor="city-input">city</InputLabel>
				<TextField
					id="city-input"
					name="city"
					onChange={(e) => changeSubProp(e.target.name, e.target.value)}
				/>
			</StyledInput>

			{/* meeting start */}
			<StyledInput>
				<LocalizationProvider dateAdapter={DateAdapter}>
					<MobileDatePicker
						disableToolbar
						variant="inline"
						margin="normal"
						id="meeting-start-date-picker"
						label="meeting-start-date"
						value={new Date("2090-12-30")}
						name="meeting_start"
						onChange={(newDate) => {
							changeSubProp("meeting_start", formatDate(newDate));
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
					<MobileDatePicker
						disableToolbar
						variant="inline"
						margin="normal"
						id="meeting-end-date-picker"
						label="meeting-end-date"
						value={new Date("2090-12-30")}
						name="meeting_End"
						onChange={(newDate) => {
							changeSubProp("meeting_end", formatDate(newDate));
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
					onClick={() => {
						setSubmitState(subObj);
						// patch to avoid sending empty request. - temporary fix, needs proper solution
						if (
							submitState.location !== undefined &&
							submitState.location !== ""
						) {
							submit();
						}
					}}
				>
					Submit
				</Button>
			</StyledInput>
		</FormContainer>
	);
};
export default CreateEventForm;