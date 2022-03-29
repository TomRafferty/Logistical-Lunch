import {
	FormControl,
	TextField,
	Button,
	Container,
	Typography,
} from "@mui/material";
import styled from "@emotion/styled";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginContainer = styled(Container)({
	background: "#fafafa",
	width: "max-content",
	padding: "30px 50px",
	display: "flex",
	flexDirection: "column",
	justifyContent: "center",
});
const LoginButton = styled(Button)({
	marginTop: "10px",
});

const LoginForm = () => {
	const [submitObjectState, setSubmitObjectState] = useState({ email: "", password: "" });
	const nav = useNavigate();

	const tryLogin = () => {
		const options = {
			method: "post",
			headers: {
				Accept: "application/json, text/plain, */*",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(submitObjectState),
		};
		fetch("http://localhost:3000/api/login", options)
		.then((response) => response.json())
		.then((resJson) => {
			const res = resJson[0];
			sessionStorage.setItem("userType", res.is_admin ? "admin" : "student" );
			sessionStorage.setItem("cohortId", res.cohort_id);
			sessionStorage.setItem("userId", res.id);
			sessionStorage.setItem("isLunchMaker", res.is_lunch_maker);
			sessionStorage.setItem("isLunchShopper", res.is_lunch_shopper);
			sessionStorage.setItem("userLocation", res.user_location);
			sessionStorage.setItem("userName", res.user_name);
			sessionStorage.setItem("transportType", res.transport_type);
			login(sessionStorage.getItem("userType"));
		})
		.catch((error) => {
			console.error(error);
			throw error;
		});
	};

	const login = (userType) => {
		//this will have to be a variable depending on how we handle the userType
		nav(`/${userType}`);
	};

	let submitObject = { email: "", password: "" };

	const updateField = (e) => {
		setSubmitObjectState({
			...submitObjectState,
			[e.target.name]: e.target.value,
		});
	};

	return (
		<LoginContainer disableGutters={true}>
			<Typography variant="h4" align="center">
				Login
			</Typography>
			<FormControl margin="dense">
				{/* field for email */}
				<TextField
					id="login-email"
					label="Email"
					type="email"
					name="email"
					margin="dense"
					autoComplete="off"
					onChange={(e) => {
						updateField(e);
					}}
				/>

				{/* Field for password */}
				<TextField
					id="login-password"
					label="Password"
					type="password"
					name="password"
					margin="dense"
					autoComplete="new-password"
					onChange={(e) => {
						updateField(e);
					}}
				/>

				<LoginButton
					variant="contained"
					size="medium"
					onClick={() => {
						setSubmitObjectState(submitObject);
						/*
							this gets rid of the error for sending an empty string on this side
							but this is not a solution this is just a patch.
						*/
						if(submitObjectState.email.length > 0 && submitObjectState.password.length > 0){
							tryLogin();
						}
					}}
				>
					Login
				</LoginButton>
			</FormControl>
		</LoginContainer>
	);
};

export default LoginForm;
