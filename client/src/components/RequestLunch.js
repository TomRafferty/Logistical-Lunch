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
	Checkbox,
	TextField,
	Button,
	Typography,
} from "@mui/material";

//applying styles to different elements
const SubmitButton = styled(Button)({
	marginTop: "10px",
});

const RequestLunch = () => {
	//state for lunch requests - radio buttons
	const [lunchOption, setLunchOption] = useState("no");

	//states for checkboxes - dietary restrictions
	const [dietaryRestrictions, setDietaryRestrictions] = useState({
		milk: false,
		eggs: false,
		peanuts: false,
		fish: false,
		soy: false,
		wheat: false,
	});

	//states for checkboxes - dietary requirements
	const [dietaryRequirements, setDietaryRequirements] = useState({
		vegetarian: false,
		vegan: false,
		halal: false,
		diabetic: false,
	});

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

	//submit form event
	const handleSubmit = () => {
		fetch("http://localhost:3100/api/lunch/dietary", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				lunchOption: lunchOption,
				dietaryRestrictions: dietaryRestrictions,
				dietaryRequirements: dietaryRequirements,
				otherDietaryRestrictions: otherDietaryRestrictions,
			}),
		})
			.then((res) => res.json())
			.then((data) => alert(data.msg))
			.catch((err) => console.log(err));
	};

	return (
		<Box sx={{ boxShadow: 3, mx: "auto", my: 6, p: 4, width: "80%" }}>
			<Typography variant="h5" sx={{ mb: 2 }} align="center">
				Lunch Requests
			</Typography>
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
						<Box sx={{ display: "flex" }}>
							<FormGroup>
								<FormControlLabel
									control={
										<Checkbox
											checked={dietaryRestrictions.milk}
											onChange={handleChangeInputRestrictions}
											name="milk"
										/>
									}
									label="Milk"
								/>
								<FormControlLabel
									control={
										<Checkbox
											checked={dietaryRestrictions.eggs}
											onChange={handleChangeInputRestrictions}
											name="eggs"
										/>
									}
									label="Eggs"
								/>
								<FormControlLabel
									control={
										<Checkbox
											checked={dietaryRestrictions.peanuts}
											onChange={handleChangeInputRestrictions}
											name="peanuts"
										/>
									}
									label="Peanuts"
								/>
							</FormGroup>
							<FormGroup>
								<FormControlLabel
									control={
										<Checkbox
											checked={dietaryRestrictions.fish}
											onChange={handleChangeInputRestrictions}
											name="fish"
										/>
									}
									label="Fish"
								/>
								<FormControlLabel
									control={
										<Checkbox
											checked={dietaryRestrictions.soy}
											onChange={handleChangeInputRestrictions}
											name="soy"
										/>
									}
									label="Soy"
								/>
								<FormControlLabel
									control={
										<Checkbox
											checked={dietaryRestrictions.wheat}
											onChange={handleChangeInputRestrictions}
											name="wheat"
										/>
									}
									label="Wheat"
								/>
							</FormGroup>
						</Box>

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
						<Box sx={{ display: "flex" }}>
							<FormGroup>
								<FormControlLabel
									control={
										<Checkbox
											checked={dietaryRequirements.vegetarian}
											onChange={handleChangeInputRequirements}
											name="vegetarian"
										/>
									}
									label="Vegetarian"
								/>
								<FormControlLabel
									control={
										<Checkbox
											checked={dietaryRequirements.vegan}
											onChange={handleChangeInputRequirements}
											name="vegan"
										/>
									}
									label="Vegan"
								/>
							</FormGroup>

							<FormGroup>
								<FormControlLabel
									control={
										<Checkbox
											checked={dietaryRequirements.halal}
											onChange={handleChangeInputRequirements}
											name="halal"
										/>
									}
									label="Halal"
								/>
								<FormControlLabel
									control={
										<Checkbox
											checked={dietaryRequirements.diabetic}
											onChange={handleChangeInputRequirements}
											name="diabetic"
										/>
									}
									label="Diabetic"
								/>
							</FormGroup>
						</Box>
					</>
				) : (
					<div></div>
				)}

				<SubmitButton
					type="submit"
					variant="contained"
					size="medium"
					onClick={handleSubmit}
				>
					Submit
				</SubmitButton>
			</FormControl>
		</Box>
	);
};

export default RequestLunch;
