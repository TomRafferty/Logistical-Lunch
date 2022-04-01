import { Button, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import DateAdapter from "@mui/lab/AdapterLuxon";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import { DateTimePicker } from "@mui/lab";

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
	// just stops the alert before editing the form being displayed incorrectly
	let editFormLoaded = false;
	// states:
	const [submitState, setSubmitState] = useState({
		location: "",
		postcode: "",
		address: "",
		city: "",
		meeting_start: "",
		meeting_end: "",
		currentCohort: sessionStorage.getItem("cohortId"),
	});
	// this is where the data is stored from the database to display initial values
	const [eventToEdit, setEventToEdit] = useState({
		location: "",
		postcode: "",
		address: "",
		city: "",
		meeting_start: "",
		meeting_end: "",
		currentCohort: sessionStorage.getItem("cohortId"),
	});
	// dates to display and use to update the subObj:
	const [displayedStartDate, setDisplayedStartDate] = useState(new Date());
	const [displayedEndDate, setDisplayedEndDate] = useState(new Date());
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
	const fetchCurrentMeeting = async () => {
		await fetch("http://localhost:3000/api/events/get/378", options)
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
					meeting_start: DateTime.fromSQL(event.meeting_start),
					meeting_end: DateTime.fromSQL(event.meeting_end),
					currentCohort: sessionStorage.getItem("cohortId"),
				};
				setEventToEdit(setEvent, setData());
			})
			.catch((error) => {
				console.error(error);
				throw error;
			});
	};
	useEffect(() => {
		fetchCurrentMeeting();
	}, []);

	// submit
	const submitReq = async () => {
		const shouldPass = submitState.location !== "" ? true : false;
		if(shouldPass){
			const options = {
				method: "put",
				headers: {
					Accept: "application/json, text/plain, */*",
					"Content-Type": "application/json",
				},
				body: JSON.stringify(submitState),
			};
			await fetch("http://localhost:3000/api/editEvent", options)
				.then((response) => {
					if(response.ok){
						console.log(response.json());
					}
				})
				.catch((error) => {
					console.error(`error - ${error}`);
					throw error;
				});
		}else if(!shouldPass && editFormLoaded){
			alert("please edit the form before trying to update");
		}
	};
	useEffect(() => {
		submitReq();
	}, []);

	// reformat subObj key - plant old value in place of undefined change
	const reformatSubmit = (keyName) => {
		/*
		this essentially makes sure everything has a value when
		it is submitted; so if nothing was changed, it will use
		the old value.
		*/
		handleSubObjChange(keyName, eventToEdit[keyName]);
	};

	// handle changes to the subObj
	const handleSubObjChange = (key, value) => {
		subObj[key] = value;
		// this will check if all the values have been adjusted,
		// if not it will apply the previously set values to them.
		Object.keys(eventToEdit).forEach((key) => {
			if (!Object.keys(subObj).includes(key)) {
				reformatSubmit(key);
			}
		});
		setSubmitState(subObj);
	};

	// change date useEffect will refresh the date value in subObj
	useEffect(() => {
		subObj.meeting_start = DateTime.local(displayedStartDate).toSQL();
	});
	useEffect(() => {
		subObj.meeting_end = DateTime.local(displayedEndDate).toSQL();
	});

	return (
		<Box sx={{ boxShadow: 3, mx: "auto", my: 6, p: 4, width: "80%" }}>
			<form
				onSubmit={(e) => {
					// basically if you can click submit, then the form is likely loaded.
					editFormLoaded = true;
					e.preventDefault();
					submitReq();
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
								id="meeting-end-date-picker"
								label="meeting-end-date"
								name="meeting_End"
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
							Update
						</Button>
					</StyledInput>
				</FormContainer>
			</form>
		</Box>
	);
};

export default EditEventForm;