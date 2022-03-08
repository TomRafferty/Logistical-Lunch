import { useState } from "react";
import styled from "@emotion/styled";
import { Container } from "@mui/material";
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
		if(action === "register"){
			if(displayRegister.visibility === "hidden"){
				setDisplayRegister({
					marginTop: "20px",
					display: "block",
				});
			}else{
				setDisplayRegister({
					marginTop: "20px",
					display: "none",
				});
			}
		}else{
			if (displayLogin.visibility === "hidden") {
				setDisplayLogin({
					marginTop: "20px",
					display: "block",
				});
			} else {
				setDisplayLogin({
					marginTop: "20px",
					display: "none",
				});
			}
		}
	};

	return (
		<main role="main">
			<LoginPageHeading />
			<LoginRegisterButtons displayForms={displayForms} />
			<RegisterFormContainer
				className="register-form-container"
				mt={2}
				sx={displayRegister}
			>
				<RegisterForm />
			</RegisterFormContainer>

			<LoginFormContainer
				className="login-form-container"
				mt={2}
				sx={displayLogin}
			>
				<LoginForm />
			</LoginFormContainer>
		</main>
	);
}

export default LoginPage;
