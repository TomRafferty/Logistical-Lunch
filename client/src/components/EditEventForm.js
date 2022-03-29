import { Button, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import DateAdapter from "@mui/lab/AdapterLuxon";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import { MobileDatePicker } from "@mui/lab";

const { default: styled } = require("@emotion/styled");
const { FormControl } = require("@material-ui/core");

const StyledInput = styled(FormControl)({
	margin: "2rem",
	width: "50%",
});
const Header = styled(Typography)({
	variant: "h4",
	align: "center",
});

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
	// states:
	const [submitState, setSubmitState] = useState({});
	// this is where the data is stored from the database to display initial values
	const [eventToEdit, setEventToEdit] = useState({
		location: "",
		postcode: "",
		address: "",
		city: "",
	});
	// --------------------------------------------------------------------------------
	// this object stores all the information ready to be sent off to the database + stops rerendering while using states
	let subObj = {};
	// set up the initial data inside of the subObj
	const setData = () => {
		subObj = eventToEdit;
	};
	// get current cohort data
	const options = {
		method: "get",
		headers: {
			Accept: "application/json, text/plain, */*",
			"Content-Type": "application/json",
		},
	};
	// change the number on the end here to be the session stored cohort id.
	// ${sessionStorage.getItem("cohortId")}
	useEffect(() => {
		fetch("http://localhost:3000/api/events/get/378", options)
			.then((response) => response.json())
			.then((result) => {
				// this assumes we only have one meeting per cohort which is currently the case
				return result[0];
			})
			.then((event) => {
				// this will set both the eventToEdit and subObj to be the same initially
				const setEvent = {
					location: event.meeting_location,
					postcode: event.meeting_postcode,
					address: event.meeting_address,
					city: event.meeting_city,
					start: event.meeting_start,
					end: event.meeting_end,
				};
				setEventToEdit(setEvent, setData());
			})
			.catch((error) => {
				console.error(error);
				throw error;
			});
	}, []);


	// reformat submit
	const reformatSubmit = (keyName) => {
		// this essentially makes sure everything has a value when
		// it is submitted; so if nothing was changed, it will use
		// the old value.
		handleSubObjChange(keyName, eventToEdit[keyName]);
	};
	// submit
	useEffect(() => {
		// this is where the actual submission will take place
		console.log(`final submission state - ${submitState}`);
		console.log(`final submission state keys - ${Object.keys(submitState)}`);
		console.log(`final submission state values - ${Object.values(submitState)}`);
	}, [submitState]);
	// this refreshes the use effect above
	const submit = () => {
		// this will check if all the values have been adjusted,
		// if not it will apply the previously set values to them.
		Object.keys(eventToEdit).forEach((key) => {
			if (!Object.keys(subObj).includes(key)) {
				reformatSubmit(key);
			}
		});
		setSubmitState(subObj);
	};

	// handle changes to the subObj
	const handleSubObjChange = (key, value) => {
		subObj[key] = value;
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
	return (
		<Box sx={{ boxShadow: 3, mx: "auto", my: 6, p: 4, width: "80%" }}>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					submit();
				}}
			>
				<FormContainer container>
					<Header>{`Edit - ${eventToEdit.location}`}</Header>

					{/* location */}
					<StyledInput sx={{ width: 1 / 2 }}>
						<TextField
							label="Location"
							required
							id="location-input"
							name="location"
							key={eventToEdit.location}
							defaultValue={eventToEdit.location}
							onChange={(e) =>
								handleSubObjChange(e.target.name, e.target.value)
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
							key={eventToEdit.postcode}
							defaultValue={eventToEdit.postcode}
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
							key={eventToEdit.address}
							defaultValue={eventToEdit.address}
							onChange={(e) =>
								handleSubObjChange(e.target.name, e.target.value)
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
							key={eventToEdit.city}
							defaultValue={eventToEdit.city}
							onChange={(e) =>
								handleSubObjChange(e.target.name, e.target.value)
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
								value={new Date()}
								onChange={(newDate) => {
									handleSubObjChange("start", formatDate(newDate));
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
								value={new Date()}
								onChange={(newDate) => {
									handleSubObjChange("end", formatDate(newDate));
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