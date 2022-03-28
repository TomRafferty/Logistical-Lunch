import { Button, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import DateAdapter from "@mui/lab/AdapterLuxon";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import { MobileDatePicker } from "@mui/lab";

const { default: styled } = require("@emotion/styled");
const { FormControl } = require("@material-ui/core");

const FormContainer = styled(Grid)({
	spacing: "0",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "center",
	padding: "30px 50px",
	background: "#fafafa",
	marginBottom: "2rem",
});

const EditEventForm = () => {
	//select the meeting (drop down)
	//when meeting is selected display form containing all the information already in the database
	//update those values in a fresh object to send off to the api that will update the old entry
	let [currentEvent, setCurrentEvent] = useState({
		location: "",
		postcode: "",
		address: "",
		city: "",
	});

	const [tempState, setTempState] = useState({});

	useEffect(() => {
		const options = {
			method: "get",
			headers: {
				Accept: "application/json, text/plain, */*",
				"Content-Type": "application/json",
			},
		};
		// change the number on the end here to be the session stored cohort id.
		// ${sessionStorage.getItem("cohortId")}

		fetch("http://localhost:3000/api/events/get/378", options)
			.then((response) => response.json())
			.then((result) => {
				// this assumes we only have one meeting per cohort which is currently the case
				const event = result[0];
				setTempState({
					location: event.meeting_location,
					postcode: event.meeting_postcode,
					address: event.meeting_address,
					city: event.meeting_city,
				});
			})
			.catch((error) => {
				console.error(error);
				throw error;
			});
	}, []);

	const StyledInput = styled(FormControl)({
		margin: "2rem",
		width: "50%",
	});
	const Header = styled(Typography)({
		variant: "h4",
		align: "center",
	});

	const [submitState, setSubmitState] = useState({});

	useEffect(() => {
		// add verification here
		if(Object.keys(submitState).includes("location")){
			// submit
			console.log(submitState);
		}
	}, [submitState]);

	const changeCurrentEventProperty = (key, value) => {
		setCurrentEvent((event) => ({
			...event,
			[key] : value,
		}));
	};

	const submit = () => {
		setSubmitState(currentEvent);
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

	currentEvent = tempState;
	return (
		<Box sx={{ boxShadow: 3, mx: "auto", my: 6, p: 4, width: "80%" }}>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					submit();
				}}
			>
				<FormContainer container>
					<Header>{`Edit - ${currentEvent.location}`}</Header>

					{/* location */}
					<StyledInput sx={{ width: 1 / 2 }}>
						<TextField
							label="Location"
							required
							id="location-input"
							name="location"
							defaultValue={currentEvent.location}
							onChange={(e) =>
								changeCurrentEventProperty(e.target.name, e.target.value)
							}
						/>
					</StyledInput>

					{/* postcode */}
					<StyledInput>
						<TextField
							label="Postcode"
							required
							id="postcode-input"
							name="postcode"
							defaultValue={currentEvent.postcode}
							onChange={(e) =>
								changeCurrentEventProperty(e.target.name, e.target.value)
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
							defaultValue={currentEvent.address}
							onChange={(e) =>
								changeCurrentEventProperty(e.target.name, e.target.value)
							}
						/>
					</StyledInput>

					{/* city */}
					<StyledInput>
						<TextField
							label="City"
							required
							id="city-input"
							name="city"
							defaultValue={currentEvent.city}
							onChange={(e) =>
								changeCurrentEventProperty(e.target.name, e.target.value)
							}
						/>
					</StyledInput>

					{/* meeting start */}
					<StyledInput>
						<LocalizationProvider dateAdapter={DateAdapter}>
							<MobileDatePicker
								required
								disableToolbar
								variant="inline"
								margin="normal"
								id="meeting-start-date-picker"
								label="meeting-start-date"
								name="meeting_start"
								onChange={(newDate) => {
									changeCurrentEventProperty(
										"meeting_end",
										formatDate(newDate)
									);
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
								required
								disableToolbar
								variant="inline"
								margin="normal"
								id="meeting-end-date-picker"
								label="meeting-end-date"
								name="meeting_End"
								onChange={(newDate) => {
									changeCurrentEventProperty(
										"meeting_end",
										formatDate(newDate)
									);
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
			</form>
		</Box>
	);
};

export default EditEventForm;