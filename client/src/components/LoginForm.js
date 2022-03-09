import {
	FormControl,
	TextField,
	Button,
	Container,
	Typography,
} from "@mui/material";
import styled from "@emotion/styled";
import React from "react";

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
	return (
		<LoginContainer disableGutters={true}>
			<Typography variant="h4" align="center">
				Login
			</Typography>
			<FormControl margin="dense">
				{/* field for email */}
				<TextField id="login-email" label="Email" type="email" margin="dense" />

				{/* Field for password */}
				<TextField
					id="login-password"
					label="Password"
					type="password"
					margin="dense"
				/>

				<LoginButton variant="contained" size="medium">
					Login
				</LoginButton>
			</FormControl>
		</LoginContainer>
	);
};

export default LoginForm;
