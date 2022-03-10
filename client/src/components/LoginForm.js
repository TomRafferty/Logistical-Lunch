import {
	FormControl,
	TextField,
	Button,
	Container,
	Typography,
} from "@mui/material";
import styled from "@emotion/styled";
import React, { useState, useEffect } from "react";
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
		fetch("http://localhost:3000/api/login",
		{
			method : "POST",
			body : submitObjectState,
		}
		)
		.then((response) => {
			if(response === "student"){
				loginStudent();
			}
		})
		.catch((error) => {
			console.error(error);
			throw error;
		});
	};

	const loginStudent = () => {
		nav("/student");
	};

	let submitObject = { email: "", password: "" };
	return (
		<LoginContainer disableGutters={true}>
			<Typography variant="h4" align="center">
				Login
			</Typography>
			<FormControl margin="dense">
				{/* field for email */}
				<TextField id="login-email" label="Email" type="email" margin="dense" onChange={(e) => {
					submitObject.email = e.target.value;
				}} />

				{/* Field for password */}
				<TextField
					id="login-password"
					label="Password"
					type="password"
					margin="dense"
					onChange={(e) => {
						submitObject.password = e.target.value;
					}}
				/>

				<LoginButton variant="contained" size="medium" onClick={() => {
					setSubmitObjectState(submitObject);
					tryLogin();
				}}>
					Login
				</LoginButton>
			</FormControl>
		</LoginContainer>
	);
};

export default LoginForm;
