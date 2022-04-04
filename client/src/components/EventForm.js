import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import DateAdapter from "@mui/lab/AdapterLuxon";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import { DesktopDatePicker, TimePicker } from "@mui/lab";
import EditIcon from "@mui/icons-material/Edit";
import EventAvailableRoundedIcon from "@mui/icons-material/EventAvailableRounded";

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

const EditEventForm = ({ isEdit }) => {
	const [originalLocation, setOriginalLocation] = useState("");
	const [location, setLocation] = useState("");
	const [postcode, setPostcode] = useState("");
	const [address, setAddress] = useState("");
	const [city, setCity] = useState("");
	const [meetingStart, setMeetingStart] = useState("");
	const [meetingEnd, setMeetingEnd] = useState("");
	const [meetingDate, setMeetingDate] = useState("");
	const [currentCohort, setCurrentCohort] = useState("");

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
				return result[0];
			})
			.then((event) => {
				console.log(event);
				setOriginalLocation(event.meeting_location);
				setLocation(event.meeting_location);
				setPostcode(event.meeting_postcode);
				setAddress(event.meeting_address);
				setCity(event.meeting_city);
				setMeetingStart(DateTime.fromSQL(event.meeting_start));
				setMeetingEnd(DateTime.fromSQL(event.meeting_end));
				setMeetingDate(DateTime.fromISO(event.meeting_date));
				setCurrentCohort(sessionStorage.getItem("cohortId"));
			})
			.catch((error) => {
				console.error(error);
				throw error;
			});
	};

	useEffect(() => {
		if (isEdit) {
			fetchCurrentMeeting();
		}
	}, []);

	// submit
	const submitReq = async () => {
		const options = {
			method: isEdit ? "put" : "post",
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
				currentCohort: sessionStorage.getItem("cohortID"),
			}),
		};
		await fetch(`/api/${isEdit ? "editEvent" : "createNewEvent"}`, options)
			.then((response) => {
				if(response.ok){
					console.log(response.json());
				}
			})
			.catch((error) => {
				console.error(`error - ${error}`);
				throw error;
			});

	};
	useEffect(() => {
		submitReq();
	}, []);

	return (
		<Box sx={{ mx: "auto", p: 4, width: "45%" }}>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					submitReq();
				}}
			>
				<FormContainer container>
					{isEdit ? (
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
					) : (
						<Container
							sx={{
								display: "flex",
								alignItems: "center",
								marginLeft: "0",
								padding: "20px",
							}}
						>
							<EventAvailableRoundedIcon fontSize="large"></EventAvailableRoundedIcon>
							<Typography marginLeft="20px" fontSize="20px" fontWeight="bold">
								Create an Event
							</Typography>
						</Container>
					)}
					{/* location */}
					<StyledInput>
						<TextField
							label="Location"
							required
							id="location-input"
							name="location"
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
						{isEdit ? (
							<Button variant="contained" type="submit" value="Submit">
								Update
							</Button>
						) : (
							<Button variant="contained" type="submit" value="Submit">
								Create
							</Button>
						)}
					</StyledInput>
				</FormContainer>
			</form>
		</Box>
	);
};

export default EditEventForm;