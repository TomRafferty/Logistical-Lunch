import React, { useState } from "react";
import styled from "@emotion/styled";
import {
	Box,
	FormControl,
	FormLabel,
	RadioGroup,
	FormControlLabel,
	Radio,
	FormGroup,
	TextField,
	Button,
	Typography,
	Container,
} from "@mui/material";
import CheckboxLabel from "./CheckboxLabel";
import LunchDiningIcon from "@mui/icons-material/LunchDining";

//applying styles to different elements
const SubmitButton = styled(Button)({
	marginTop: "10px",
});

const initialDietaryRestrictions = {
	milk: false,
	eggs: false,
	peanuts: false,
	fish: false,
	soy: false,
	wheat: false,
};

const initialDietaryRequirements = {
	vegetarian: false,
	vegan: false,
	halal: false,
	diabetic: false,
};

const RequestLunch = () => {
	//state for lunch requests - radio buttons
	const [lunchOption, setLunchOption] = useState("no");

	//states for checkboxes - dietary restrictions
	const [dietaryRestrictions, setDietaryRestrictions] = useState(
		initialDietaryRestrictions
	);

	//states for checkboxes - dietary requirements
	const [dietaryRequirements, setDietaryRequirements] = useState(
		initialDietaryRequirements
	);

	//states for text field - others restrictions
	const [otherDietaryRestrictions, setOtherDietaryRestrictions] =
		useState("");

	//event for radio buttons - lunch request
	const handleChangeInputRadioButtons = (event) => {
		setLunchOption(event.target.value);
	};

	//event for dietary restrictions
	const handleChangeInputRestrictions = (event) => {
		const objectKey = event.target.name;
		const objectValue = event.target.checked;
		setDietaryRestrictions({
			...dietaryRestrictions,
			[objectKey]: objectValue,
		});
	};

	//event for dietary requirements
	const handleChangeInputRequirements = (event) => {
		const objectKey = event.target.name;
		const objectValue = event.target.checked;
		setDietaryRequirements({
			...dietaryRequirements,
			[objectKey]: objectValue,
		});
	};

	//event for text field
	const handleChangeTextField = (event) => {
		setOtherDietaryRestrictions(event.target.value);
	};

	const transformObjToArray = (obj) => {
		return Object.keys(obj).filter((item)=> obj[item] == true);
	};


	//submit form event
	const handleSubmit = () => {
		const dietaryRestrictionsArray = transformObjToArray(dietaryRestrictions);
		const dietaryRequirementsArray = transformObjToArray(dietaryRequirements);
		if(lunchOption == "yes"){
			fetch("/api/lunch/dietary", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					dietaryRestrictions: dietaryRestrictionsArray,
					dietaryRequirements: dietaryRequirementsArray,
					otherDietaryRestrictions: otherDietaryRestrictions,
					userId: sessionStorage.getItem("userId"),
					cohortId: sessionStorage.getItem("cohortId"),
				}),
			})
				.then((res) => res.json())
				.then((data) =>{
					setDietaryRestrictions(initialDietaryRestrictions);
					setDietaryRequirements(initialDietaryRequirements);
					setOtherDietaryRestrictions("");
					setLunchOption("no");
					alert(data.msg);
				})
				.catch((error) => alert(error.msg));
		}else{
			alert("Your lunch request was registered");
		}
	};

	return (
		<Box
			sx={{
				boxShadow: 3,
				p: 4,
				width: "40%",
				alignSelf: "center",
				minHeight: "170px",
			}}
		>
			<Container
				sx={{ display: "flex", alignItems: "center", marginLeft: "0", mb: 2 }}
			>
				<LunchDiningIcon fontSize="large"></LunchDiningIcon>
				<Typography marginLeft="20px" fontSize="20px" fontWeight="bold">
					Lunch Request
				</Typography>
			</Container>
			<FormControl>
				{/* radio button for selecting if user wants/ doesn't want the meal to be provided*/}
				<FormLabel id="lunch-radio-buttons-group-label">
					Would you like to have the lunch provided by us?
				</FormLabel>
				<RadioGroup
					aria-labelledby="lunch-radio-buttons-group-label"
					name="lunch-radio-buttons-group"
					value={lunchOption}
					onChange={handleChangeInputRadioButtons}
				>
					<Box sx={{ display: "flex" }}>
						<FormControlLabel value="yes" control={<Radio />} label="Yes" />
						<FormControlLabel value="no" control={<Radio />} label="No" />
					</Box>
				</RadioGroup>

				{lunchOption == "yes" ? (
					<>
						{/* checkboxes for selecting any dietary restrictions */}
						<FormLabel
							id="restrictions-radio-buttons-group-label"
							component="legend"
						>
							Do you have any dietary restrictions?
						</FormLabel>
						<FormGroup>
							<Box sx={{ display: "flex", flexWrap: "wrap" }}>
								{Object.keys(dietaryRestrictions).map((restriction, index) => {
									return (
										<CheckboxLabel
											key={index}
											checkboxName={restriction}
											isChecked={dietaryRestrictions[restriction]}
											onChange={handleChangeInputRestrictions}
										/>
									);
								})}
							</Box>
						</FormGroup>

						{/* text field so the user can input any others dietary restrictions */}
						<TextField
							id="dietary-restrictions"
							name="dietary-restrictions"
							label="Others"
							margin="dense"
							value={otherDietaryRestrictions}
							onChange={handleChangeTextField}
							autoComplete="off"
						/>

						{/* checkboxes for selecting any dietary requirements */}
						<FormLabel
							id="requirements-radio-buttons-group-label"
							component="legend"
						>
							Do you have any dietary requirements?
						</FormLabel>
						<FormGroup>
							<Box sx={{ display: "flex", flexWrap: "wrap" }}>
								{Object.keys(dietaryRequirements).map((requirement, index) => {
									return (
										<CheckboxLabel
											key={index}
											checkboxName={requirement}
											isChecked={dietaryRequirements[requirement]}
											onChange={handleChangeInputRequirements}
										/>
									);
								})}
							</Box>
						</FormGroup>
					</>
				) : (
					<div></div>
				)}

				<SubmitButton
					type="submit"
					variant="contained"
					size="medium"
					sx={{ width: "max-content", height: "40px" }}
					onClick={handleSubmit}
				>
					Submit
				</SubmitButton>
			</FormControl>
		</Box>
	);
};

export default RequestLunch;
