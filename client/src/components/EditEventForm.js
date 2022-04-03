import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import DateAdapter from "@mui/lab/AdapterLuxon";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import { DesktopDatePicker, TimePicker } from "@mui/lab";
import EditIcon from "@mui/icons-material/Edit";

const { default: styled } = require("@emotion/styled");
const { FormControl } = require("@material-ui/core");

const StyledInput = styled(FormControl)({
	margin: "1rem",
	width: "80%",
});

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

const EditEventForm = () => {
	// // just stops the alert before editing the form being displayed incorrectly
	// let editFormLoaded = false;
	// // states:
	const [originalLocation, setOriginalLocation] = useState("");
	const [location, setLocation] = useState("");
	const [postcode, setPostcode] = useState("");
	const [address, setAddress] = useState("");
	const [city, setCity] = useState("");
	const [meetingStart, setMeetingStart] = useState("");
	const [meetingEnd, setMeetingEnd] = useState("");
	const [meetingDate, setMeetingDate] = useState("");
	const [currentCohort, setCurrentCohort] = useState("");

	// const [submitState, setSubmitState] = useState({
	// 	location: "",
	// 	postcode: "",
	// 	address: "",
	// 	city: "",
	// 	meeting_start: "",
	// 	meeting_end: "",
	// 	currentCohort: sessionStorage.getItem("cohortId"),
	// });
	// this is where the data is stored from the database to display initial values
	// const [eventToEdit, setEventToEdit] = useState({
	// 	location: "",
	// 	postcode: "",
	// 	address: "",
	// 	city: "",
	// 	meeting_start: "",
	// 	meeting_end: "",
	// 	currentCohort: sessionStorage.getItem("cohortId"),
	// });
	// dates to display and use to update the subObj:
	// const [displayedStartDate, setDisplayedStartDate] = useState(new Date());
	// const [displayedEndDate, setDisplayedEndDate] = useState(new Date());
	// --------------------------------------------------------------------------------
	// this object stores all the information ready to be sent off to the database + stops rerendering while using states
	// let subObj = {};
	// // set up the initial data inside of the subObj
	// const setData = () => {
	// 	subObj = eventToEdit;
	// };
	// get current cohort data
	const options = {
		method: "get",
		headers: {
			Accept: "application/json, text/plain, */*",
			"Content-Type": "application/json",
		},
	};
	const fetchCurrentMeeting = async () => {
		await fetch(`/api/events/get/${sessionStorage.getItem("cohortId")}`, options)
			.then((response) => response.json())
			.then((result) => {
				// this assumes we only have one meeting per cohort which is currently the case
				return result[0];
			})
			.then((event) => {
				// this will set both the eventToEdit and subObj to be the same initially
				// const setEvent = {
				// 	location: event.meeting_location,
				// 	postcode: event.meeting_postcode,
				// 	address: event.meeting_address,
				// 	city: event.meeting_city,
				// 	meeting_start: DateTime.fromSQL(event.meeting_start),
				// 	meeting_end: DateTime.fromSQL(event.meeting_end),
				// 	currentCohort: sessionStorage.getItem("cohortId"),
				// };
				// setEventToEdit(setEvent, setData());
				setOriginalLocation(event.meeting_location);
				setLocation(event.meeting_location);
				setPostcode(event.meeting_postcode);
				setAddress(event.meeting_address);
				setCity(event.meeting_city);
				setMeetingStart(DateTime.fromSQL(event.meeting_start));
				setMeetingEnd(DateTime.fromSQL(event.meeting_end));
				setMeetingDate(DateTime.fromSQL(event.meeting_date));
				setCurrentCohort(sessionStorage.getItem("cohortId"));
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
		// const shouldPass = submitState.location !== "" ? true : false;
		// if(shouldPass){
			console.log(meetingStart, meetingEnd);
		const options = {
			method: "put",
			headers: {
				Accept: "application/json, text/plain, */*",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				location,
				postcode,
				address,
				city,
				meeting_start: meetingStart.toISOTime(),
				meeting_end: meetingEnd.toISOTime(),
				meeting_date: meetingDate.toISODate(),
				currentCohort,
			}),
		};
		await fetch("/api/editEvent", options)
			.then((response) => {
				if(response.ok){
					console.log(response.json());
				}
			})
			.catch((error) => {
				console.error(`error - ${error}`);
				throw error;
			});
		// }else if(!shouldPass && editFormLoaded){
		// 	alert("please edit the form before trying to update");
		// }
	};
	useEffect(() => {
		submitReq();
	}, []);

	// // reformat subObj key - plant old value in place of undefined change
	// const reformatSubmit = (keyName) => {
	// 	/*
	// 	this essentially makes sure everything has a value when
	// 	it is submitted; so if nothing was changed, it will use
	// 	the old value.
	// 	*/
	// 	if (keyName !== ("meeting_start" || "meeting_end")) {
	// 		handleSubObjChange(keyName, eventToEdit[keyName]);
	// 	}
	// };

	// // handle changes to the subObj
	// const handleSubObjChange = (key, value) => {
	// 	subObj[key] = value;
	// 	// this will check if all the values have been adjusted,
	// 	// if not it will apply the previously set values to them.
	// 	Object.keys(eventToEdit).forEach((key) => {
	// 		if (!Object.keys(subObj).includes(key)) {
	// 			reformatSubmit(key);
	// 		}
	// 	});
	// 	setSubmitState(subObj);
	// 	console.log(JSON.parse(JSON.stringify(subObj)));
	// };

	// change date useEffect will refresh the date value in subObj
	// useEffect(() => {
	// 	subObj.meeting_start = DateTime.local(displayedStartDate).toSQL();
	// });
	// useEffect(() => {
	// 	subObj.meeting_end = DateTime.local(displayedEndDate).toSQL();
	// });

	return (
		<Box sx={{ mx: "auto", p: 4, width: "45%" }}>
			<form
				onSubmit={(e) => {
					// basically if you can click submit, then the form is likely loaded.
					// editFormLoaded = true;
					e.preventDefault();
					submitReq();
				}}
			>
				<FormContainer container>
					{/* <Header>{`Edit - ${eventToEdit.location}`}</Header> */}
					<Container
						sx={{
							display: "flex",
							alignItems: "center",
							marginLeft: "0",
							padding: "20px",
						}}
					>
						<EditIcon fontSize="large"></EditIcon>
						<Typography marginLeft="20px" fontSize="20px" fontWeight="bold">
							{`Event - ${originalLocation}`}
						</Typography>
					</Container>
					{/* location */}
					<StyledInput>
						<TextField
							label="Location"
							required
							id="location-input"
							name="location"
							// key={location}
							value={location}
							onChange={(e) => setLocation(e.target.value)}
						/>
					</StyledInput>

					{/* postcode */}
					<StyledInput>
						<TextField
							label="Postcode"
							required
							id="postcode-input"
							name="postcode"
							// key={postcode}
							value={postcode}
							onChange={(e) => setPostcode(e.target.value)}
						/>
					</StyledInput>

					{/* address */}
					<StyledInput>
						<TextField
							label="address"
							required
							id="address-input"
							name="address"
							// key={address}
							value={address}
							onChange={(e) => setAddress(e.target.value)}
						/>
					</StyledInput>

					{/* city */}
					<StyledInput>
						<TextField
							label="City"
							required
							id="city-input"
							name="city"
							// key={city}
							value={city}
							onChange={(e) => setCity(e.target.value)}
						/>
					</StyledInput>

					{/* meeting start */}
					<StyledInput>
						<LocalizationProvider dateAdapter={DateAdapter}>
							<TimePicker
								required
								disableToolbar
								variant="inline"
								margin="normal"
								id="meeting-start-picker"
								label="meeting-start"
								name="meeting_start"
								value={meetingStart}
								onChange={(newDate) => {
									console.log(newDate);
									setMeetingStart(newDate);
								}}
								keyboardButtonProps={{
									"aria-label": "change time",
								}}
								openTo="day"
								renderInput={(params) => <TextField {...params} />}
							/>
						</LocalizationProvider>
					</StyledInput>

					{/* meeting end */}
					<StyledInput>
						<LocalizationProvider dateAdapter={DateAdapter}>
							<TimePicker
								required
								disableToolbar
								variant="inline"
								margin="normal"
								id="meeting-end-picker"
								label="meeting-end"
								name="meeting_End"
								value={meetingEnd}
								onChange={(newDate) => {
									setMeetingEnd(newDate);
								}}
								keyboardButtonProps={{
									"aria-label": "change time",
								}}
								openTo="day"
								renderInput={(params) => <TextField {...params} />}
							/>
						</LocalizationProvider>
					</StyledInput>

					{/* meeting date */}
					<StyledInput>
						<LocalizationProvider dateAdapter={DateAdapter}>
							<DesktopDatePicker
								required
								disableToolbar
								variant="inline"
								margin="normal"
								id="meeting-date-picker"
								label="meeting-date"
								name="meeting_date"
								value={meetingDate}
								onChange={(newTime) => {
									console.log(newTime);
									setMeetingDate(newTime);
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