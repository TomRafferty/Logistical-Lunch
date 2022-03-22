
import  React, { useState, useEffect  } from "react";
import styled from "@emotion/styled";
import { Typography, Box, Container, FormControl, InputLabel, Select, MenuItem, Button } from "@mui/material";
import DinnerDiningIcon from "@mui/icons-material/DinnerDining";
import ModalHistory from "./ModalHistory";


//styling the heading and the button
const HeadingContainer = styled(Container)({
	display: "flex",
	alignItems: "center",
    justifyContent: "center",
	margin: 0,
	paddingLeft: 40,
	paddingRight: 40,
});

const SubmitButton = styled(Button)({
	marginTop: "10px",
});



const SetLunchMaker = () => {
		//state for updating the lunch maker id;
        const [lunchMakerId, setLunchMakerId] = useState("");

		//state for updating all the users that are part of the same cohort
        const [lunchMakerOptions, setLunchMakerOptions] = useState([]);

		//storing the cohortId of the admin in a variable
        const cohortId = sessionStorage.getItem("cohortId");

		//fetching all the users that have the same cohortId as the admin so it can be displayed in the dropdown
        useEffect(() => {
			fetch(`http://localhost:3000/api/users/cohort/${cohortId}`)
				.then((response) => {
					if (response.ok) {
						return response.json();
					}
					throw `${response.status} ${response.statusText}`;
				})
				.then((response) => {
					setLunchMakerOptions(response);
				})
				.catch((error) => {
					console.log("An error occurred:", error);
				});
		}, [cohortId]);

	//event for updating the lunchMakerId state with the id of the nominated user
    const handleChangeDropDown = (event) => {
			setLunchMakerId(event.target.value);
	};

	//function to get the name of the assigned lunch maker
    const getLunchMakerName = (id) => lunchMakerOptions.filter((option) => option.id == id).map((obj) => obj.user_name)[0];

	//event submit lunch maker
    const handleSubmit = () => {
        const lunchMakerName = getLunchMakerName(lunchMakerId);

        fetch("http://localhost:3100/api/lunchMaker", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						lunchMakerId: lunchMakerId,
						lunchMakerName: lunchMakerName,
					}),
				})
					.then((res) => res.json())
					.then((data) => {
						setLunchMakerId("");
						alert(data.msg);
					})
					.catch((error) => alert(error.msg));
		};

    return (
			<Box sx={{ boxShadow: 3, mx: "auto",  my: 6, p: 4, width: "80%" }}>
				<HeadingContainer>
					<DinnerDiningIcon fontSize="large"></DinnerDiningIcon>
					<Typography variant="h5">Lunch Maker</Typography>
				</HeadingContainer>
				<FormControl fullWidth>
					<InputLabel id="demo-simple-select-label">Lunch maker</InputLabel>
					<Select
						labelId="demo-simple-select-label"
						id="demo-simple-select"
						value={lunchMakerId}
						label="Lunch Maker"
						onChange={handleChangeDropDown}
					>
						{/* mapping the array of objects received so we can display all the students name into the dropdown */}
						{lunchMakerOptions.map((option, index) => {
							return (
								<MenuItem
									key={index}
									value={option.id}
								>
									{option.user_name}
								</MenuItem>
							);
						})}
					</Select>
					<SubmitButton
						type="submit"
						variant="contained"
						size="medium"
						onClick={handleSubmit}
					>
						Submit
					</SubmitButton>
				</FormControl>
				{/* displaying the modal window containing all the history of lunch makers */}
				<ModalHistory instance ={"Lunch Maker"} userInstance={"lunchMaker"} />
			</Box>
		);
};

export default SetLunchMaker;