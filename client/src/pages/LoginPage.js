import { useState } from "react";
import styled from "@emotion/styled";
import { Container, Typography } from "@mui/material";
import LoginPageHeading from "../components/LoginPageHeading";
import RegisterForm from "../components/RegisterForm";
import LoginForm from "../components/LoginForm";
import LoginRegisterButtons from "../components/LoginRegisterButtons";

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
		<main role="main">
			<LoginPageHeading />
			<Container sx={{ display: "flex", alignItems: "center" }}>
				<Container style={{ alignSelf: "flex-start", marginTop: "100px" }}>
					<img
						src="https://classplanner.codeyourfuture.io/files/Home.png"
						alt="CYF group"
					/>
					<Typography sx={{ marginTop: "30px", marginBottom: "70px", textAlign: "justify" }}>
						Lorem Ipsum is simply dummy text of the printing and typesetting
						industry. Lorem Ipsum has been the industry is standard dummy text
						ever since the 1500s, when an unknown printer took a galley of type
						and scrambled it to make a type specimen book. It has survived not
						only five centuries, but also the leap into electronic typesetting,
						remaining essentially unchanged. It was popularised in the 1960s
						with the release of Letraset sheets containing Lorem Ipsum passages,
						and more recently with desktop publishing software like Aldus
						PageMaker including versions of Lorem Ipsum.
					</Typography>
				</Container>
				<Container sx={{ marginBottom: "70px" }}>
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
				</Container>
			</Container>
		</main>
	);
}

export default LoginPage;
