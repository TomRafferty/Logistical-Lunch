import styled from "@emotion/styled";
import { Button, FormControl, Grid, Input, InputLabel, TextField, Typography } from "@mui/material";
import DateAdapter from "@mui/lab/AdapterLuxon";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { useState } from "react";
import { MobileDatePicker } from "@mui/lab";

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

	const [selectedStartDate, setSelectedStartDate] = useState(new Date("9999-12-30T00:00:00"));
	const [selectedEndDate, setSelectedEndDate] = useState(new Date("9999-12-30T00:00:00"));
	const handleStartDateChange = (date) => {
		setSelectedStartDate(date);
	};
	const handleEndDateChange = (date) => {
		setSelectedEndDate(date);
	};

    return (
			<FormContainer container>
				<Header>Create New Event:</Header>

				{/* location */}
				<StyledInput sx={{ width: 1 / 2 }}>
					<InputLabel htmlFor="location-input">Location</InputLabel>
					<Input id="location-input" />
				</StyledInput>

				{/* postcode */}
				<StyledInput>
					<InputLabel htmlFor="postcode-input">postcode</InputLabel>
					<Input id="postcode-input" />
				</StyledInput>

				{/* address */}
				<StyledInput>
					<InputLabel htmlFor="address-input">address</InputLabel>
					<Input id="address-input" />
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
							onChange={() => handleStartDateChange}
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
							onChange={() => handleEndDateChange}
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
					<Button variant="contained">
						Submit
					</Button>
				</StyledInput>
			</FormContainer>
		);
};
export default CreateEventForm;