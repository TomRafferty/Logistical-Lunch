import { Grid, MenuItem } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";

const { default: styled } = require("@emotion/styled");
const { FormControl, InputLabel, Select } = require("@material-ui/core");

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

    const StyledInput = styled(FormControl)({
			margin: "2rem",
			width: "50%",
		});

    const [selectedMeetingId, setSelectedMeetingId] = useState("");

    // swap this out for live data after testing
    let meetings = [
        {
            meeting_id: 1,
            meeting_location: "zoo",
            meeting_start: "14:00",
            meeting_end: "16:00",
        },
        {
            meeting_id: 2,
            meeting_location: "park",
            meeting_start: "10:00",
            meeting_end: "12:00",
        },
        {
            meeting_id: 3,
            meeting_location: "pub",
            meeting_start: "09:00",
            meeting_end: "15:00",
        },
    ];

    const changeSelectedMeeting = async (event) => {
		setSelectedMeetingId(event.target.value);
    };

    return (
			<FormContainer>
				<FormControl fullWidth>
					<InputLabel id="demo-simple-select-label">Meeting</InputLabel>
					<Select
						labelId="demo-simple-select-label"
						id="demo-simple-select"
						value={""}
						label="Age"
						onChange={changeSelectedMeeting}
					>
						{meetings.map((meeting, index) => {
							return (
								<MenuItem key={`meeting-${index}`} value={meeting.meeting_id}>
									{`${meeting.meeting_location} ${meeting.meeting_start}`}
								</MenuItem>
							);
						})}
					</Select>
				</FormControl>
			</FormContainer>
		);
};

export default EditEventForm;