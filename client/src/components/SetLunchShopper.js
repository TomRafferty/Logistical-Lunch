import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import {
	Typography,
	Box,
	Container,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Button,
} from "@mui/material";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import ModalHistory from "./ModalHistory";

//styling the heading and the button
const HeadingContainer = styled(Container)({
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	marginBottom: "20px",
});

const SubmitButton = styled(Button)({
	marginTop: "10px",
});

const SetLunchShopper = () => {
	//state for updating the lunch shopper id;
	const [lunchShopperId, setLunchShopperId] = useState("");

	//state to trigger a rerender
	const [update, setUpdate] = useState(true);

	//state for lunch shopper's name
	const [lunchShopperName, setLunchShopperName] = useState("");

	//state for updating all the users that are part of the same cohort
	const [lunchShopperOptions, setLunchShopperOptions] = useState([]);

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

				setLunchShopperOptions(response);
				setLunchShopperName(getLunchShopperNameFromResponse(response));
			})
			.catch((error) => {
				console.log("An error occurred:", error);
			});
	}, [cohortId, update]);

	//event for updating the lunchShopperId state with the id of the nominated user
	const handleChangeDropDown = (event) => {
		setLunchShopperId(event.target.value);
	};

	//function to get the name of the assigned lunch shopper from BACKEND RESPONSE
	const getLunchShopperNameFromResponse = (array) =>
		array.filter((user) => user.is_lunch_shopper == true).map((u) => u.user_name);

	//function to get the name of the assigned lunch shopper
	const getLunchShopperNameFromList = (id) =>
		lunchShopperOptions
			.filter((option) => option.id == id)
			.map((obj) => obj.user_name)[0];

	//event submit lunch shopper
	const handleSubmit = () => {
		const lunchShopperName = getLunchShopperNameFromList(lunchShopperId);
		fetch("http://localhost:3100/api/lunchShopper", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				lunchShopperId: lunchShopperId,
				lunchShopperName: lunchShopperName,
				cohortId: cohortId,
			}),
		})
			.then((res) => res.json())
			.then(() => {
				setUpdate(!update);
				setLunchShopperId("");
			})
			.catch((error) => alert(error.msg));
	};

	return (
		<Box sx={{ boxShadow: 3, mx: "auto", p: 4, width: "40%" }}>
			<HeadingContainer>
				<ShoppingCartCheckoutIcon fontSize="large"></ShoppingCartCheckoutIcon>
				<Typography variant="h6" sx={{ ml: 2 }}>
					Lunch Shopper
				</Typography>
			</HeadingContainer>
			<Typography variant="subtitle2" sx={{ mb: 2, textAlign: "center", color: "primary.main" }}>
				{lunchShopperName.length > 0
					? `${lunchShopperName} was nominated as a lunch shopper for this week event.`
					: "Please nominate a lunch shopper"}
			</Typography>
			<FormControl fullWidth>
				<InputLabel id="demo-simple-select-label">Lunch shopper</InputLabel>
				<Select
					labelId="demo-simple-select-label"
					id="demo-simple-select"
					value={lunchShopperId}
					label="Lunch Shopper"
					onChange={handleChangeDropDown}
				>
					{/* mapping the array of objects received so we can display all the students name into the dropdown */}
					{lunchShopperOptions.map((option, index) => {
						return (
							<MenuItem key={index} value={option.id}>
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
			{/* displaying the modal window containing all the history of lunch shoppers */}
			<ModalHistory
				instance={"Lunch Shopper"}
				userInstance={"lunchShopper"}
				keyName={"lunch_shopper_name"}
			/>
		</Box>
	);
};

export default SetLunchShopper;
