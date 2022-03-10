import {
	FormControl,
	TextField,
	Button,
	Container,
	Typography,
} from "@mui/material";
import styled from "@emotion/styled";
import React, { useEffect } from "react";
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
	const navigation = useNavigate();

	let [submitObjectState, setSubmitObjectState] = { email: "", password: "" };
	let submitObject = { email: "", password: "" };

	const submitLoginRequest = () => {
		setSubmitObjectState(submitObject);
	};

	useEffect(() => {
		fetch("localhost:3000/api/login", { body: submitObjectState })
			.then((response) => {
				//this is temp just to check page switching, I don't know how we want to handle this.
				if (response === "auth") {
					navigation.push("/student");
				}
			})
			.catch((error) => {
				console.error(error);
				throw error;
			});
	},[submitObjectState, navigation]);
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

				<LoginButton variant="contained" size="medium" onClick={submitLoginRequest}>
					Login
				</LoginButton>
			</FormControl>
		</LoginContainer>
	);
};

export default LoginForm;
