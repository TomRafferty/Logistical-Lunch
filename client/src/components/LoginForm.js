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
				<TextField id="email" label="Email" type="email" margin="dense" />

				{/* Field for password */}
				<TextField
					id="password"
					label="Password"
					type="password"
					margin="dense"
				/>

				<LoginButton variant="contained" size="medium">
					Register
				</LoginButton>
			</FormControl>
		</LoginContainer>
	);
};

export default LoginForm;
