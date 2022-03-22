import styled from "@emotion/styled";
import { Button, FormControl, Grid, Input, InputLabel, TextField, Typography } from "@mui/material";
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
});

const StyledInput = styled(FormControl)({
	margin: "2rem",
	width: "40%",
});

const CreateEventForm = () => {
	// start date state and set function
	const [selectedStartDate, setSelectedStartDate] = useState(
		new Date("2090-12-30")
	);
	const handleStartDateChange = (date) => {
		setSelectedStartDate(date);
	};
	// end date state and set function
	const [selectedEndDate, setSelectedEndDate] = useState(
		new Date("2090-12-30")
	);
	const handleEndDateChange = (date) => {
		setSelectedEndDate(date);
	};

	// submit state and change handler
	const subObj = {
		location: "",
		postcode: "",
		address: "",
		meeting_start: DateTime,
		meeting_end: DateTime,
	};
	const [submitState, setSubmitState] = useState({});
	const changeSubProp = (property, value) => {
		subObj[property] = value;
		console.log(subObj);
	};

    return (
			<FormContainer container>
				<Header>Create New Event:</Header>

				{/* location */}
				<StyledInput sx={{ width: 1 / 2 }}>
					<InputLabel htmlFor="location-input">Location</InputLabel>
					<Input
						id="location-input"
						name="location"
						onChange={(e) => changeSubProp(e.target.name, e.target.value)}
					/>
				</StyledInput>

				{/* postcode */}
				<StyledInput>
					<InputLabel htmlFor="postcode-input">postcode</InputLabel>
					<Input
						id="postcode-input"
						name="postcode"
						onChange={(e) => changeSubProp(e.target.name, e.target.value)}
					/>
				</StyledInput>

				{/* address */}
				<StyledInput>
					<InputLabel htmlFor="address-input">address</InputLabel>
					<Input
						id="address-input"
						name="address"
						onChange={(e) => changeSubProp(e.target.name, e.target.value)}
					/>
				</StyledInput>

				{/* meeting start */}
				<StyledInput>
					<LocalizationProvider dateAdapter={DateAdapter}>
						<MobileDatePicker
							disableToolbar
							variant="inline"
							format="MM/dd/yyy"
							margin="normal"
							id="meeting-start-date-picker"
							label="meeting-start-date"
							value={selectedStartDate}
							name="meeting_start"
							onChange={(newDate) => {
								handleStartDateChange(newDate);
								changeSubProp("meeting_start", newDate);
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
							format="MM/dd/yyy"
							margin="normal"
							id="meeting-end-date-picker"
							label="meeting-end-date"
							value={selectedEndDate}
							name="meeting_End"
							onChange={(newDate) => {
								handleEndDateChange(newDate);
								changeSubProp("meeting_end", newDate);
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
							console.log(submitState);
						}}
					>
						Submit
					</Button>
				</StyledInput>
			</FormContainer>
		);
};
export default CreateEventForm;