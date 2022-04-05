import { useState } from "react";
import styled from "@emotion/styled";
import { Container, Typography, Grid, Box } from "@mui/material";
import LoginPageHeading from "../components/LoginPageHeading";
import RegisterForm from "../components/RegisterForm";
import LoginForm from "../components/LoginForm";
import LoginRegisterButtons from "../components/LoginRegisterButtons";
import cyfBanner from "../../images/cyf-banner.png";

export function LoginPage() {
	const [displayRegister, setDisplayRegister] = useState({
		marginTop: "20px",
		display: "none",
	});
	const [displayLogin, setDisplayLogin] = useState({
		marginTop: "20px",
		display: "none",
	});

	const RegisterFormContainer = styled(Container)(displayRegister);
	const LoginFormContainer = styled(Container)(displayLogin);

	const displayForms = (action) => {
		//action === "register" || "login"
		//toggles visibility of forms
		if (action === "register") {
			if (displayRegister.display === "none") {
				//hide login
				setDisplayLogin({
					marginTop: "20px",
					display: "none",
					position: "absolute",
				});
				//show register
				setDisplayRegister({
					marginTop: "20px",
					display: "initial",
					position: "relative",
				});
			} else {
				//hide register
				setDisplayRegister({
					marginTop: "20px",
					display: "none",
					position: "absolute",
				});
			}
		} else {
			if (displayLogin.display === "none") {
				//hide register
				setDisplayRegister({
					marginTop: "20px",
					display: "none",
					position: "absolute",
				});
				//show login
				setDisplayLogin({
					marginTop: "20px",
					display: "initial",
					position: "relative",
				});
			} else {
				//hide register
				setDisplayLogin({
					marginTop: "20px",
					display: "none",
					position: "absolute",
				});
			}
		}
	};

	return (
		<Grid>
			<LoginPageHeading />
			<Container
				sx={{
					display: "flex",
					flexWrap: "wrap",
					alignItems: "center",
					justifyContent: "space-around",
				}}
			>
				<Box
					style={{
						alignSelf: "flex-start",
						marginTop: "100px",
						maxWidth: "400px",
					}}
				>
					<img src={cyfBanner} alt="CYF group" width="100%" />
					<Typography
						sx={{
							marginTop: "30px",
							marginBottom: "70px",
							textAlign: "justify",
						}}
					>
						Welcome to the CYF meeting app After registering, you will need to
						add extra information before each meeting such as: your location,
						confirmation of your attendance and if you will be having lunch. If
						you are chosen as the Lunch Shopper or Maker you will be informed by
						Friday of that week. The Lunch Shopper will be supplied with
						appropriate information, such as the nearest supermarket, a
						comprehensive shopping list and the budget. The Lunch Maker will be
						supplied with recipes, amount of diners and a list of all allergies
						and dietary requirements.
					</Typography>
				</Box>
				<Box sx={{ marginBottom: "70px", width: "350px" }}>
					<LoginRegisterButtons displayForms={displayForms} />
					{/* register form render */}
					<RegisterFormContainer
						className="register-form-container"
						mt={2}
						sx={displayRegister}
					>
						<RegisterForm />
					</RegisterFormContainer>
					{/* login form render */}
					<LoginFormContainer
						className="login-form-container"
						mt={2}
						sx={displayLogin}
					>
						<LoginForm />
					</LoginFormContainer>
				</Box>
			</Container>
		</Grid>
	);
}

export default LoginPage;
