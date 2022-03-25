import { Grid, OutlinedInput } from "@mui/material";
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
});

const EditEventForm = () => {
    //select the meeting (drop down)
    //when meeting is selected display form containing all the information already in the database
    //update those values in a fresh object to send off to the api that will update the old entry

    const StyledInput = styled(FormControl)({
			margin: "2rem",
			width: "40%",
		});

    const [selectedMeeting, setSelectedMeeting] = useState([]);

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

    const changeSelectedMeeting = (value) => {
        setSelectedMeeting(value);
    };

    return (
			<FormContainer>
				<StyledInput>
					<InputLabel id="select-meeting-label">
						Select Meeting to Edit
					</InputLabel>
					<Select
						labelId="select-meeting-label"
						id="select-meeting"
						multiple
						value={selectedMeeting}
						onChange={(e) => {
							changeSelectedMeeting(e.target.value);
						}}
					>
						{meetings.map((meeting) => {
							return (
								<option
									value={meeting.meeting_id}
									key={`meeting-option-${meeting.meeting_id}`}
								>
                                    {`${meeting.meeting_location} ${meeting.meeting_start}-${meeting.meeting_end}`}
                                </option>
							);
						})}
					</Select>
				</StyledInput>
			</FormContainer>
		);
};

export default EditEventForm;