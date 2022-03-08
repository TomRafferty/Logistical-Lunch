import { useState } from "react";
import styled from "@emotion/styled";
import { Container } from "@mui/material";
import LoginPageHeading from "../components/LoginPageHeading";
import RegisterForm from "../components/RegisterForm";
import LoginForm from "../components/LoginForm";
import LoginRegisterButtons from "../components/LoginRegisterButtons";

const FormContainer = styled(Container)({
	marginTop: "20px",
	display: "none",
});

export function LoginPage() {
	const [displayRegister, setDisplayRegister] = useState(false);
	const [displayLogin, setDisplayLogin] = useState(false);
	const displayForms = (action) => {
		//action === "register" || login
		if (action === "register") {
			// toggle register form
			setDisplayRegister(!displayRegister);
		} else {
			// toggle login form
			setDisplayLogin(!displayLogin);
		}
	};

	return (
		<main role="main">
			<LoginPageHeading />
			<LoginRegisterButtons displayForms={displayForms} />
			<FormContainer
				className="register-form-container"
				mt={2}
				sx={() => {
					if (displayRegister) {
						return { display: "none" };
					} else {
						return { display: "block" };
					}
				}}
			>
				<RegisterForm />
			</FormContainer>

			<FormContainer
				className="login-form-container"
				mt={2}
				sx={() => {
					if (displayLogin) {
						return { display: "none" };
					} else {
						return { display: "block" };
					}
				}}
			>
				<LoginForm />
			</FormContainer>
		</main>
	);
}

export default LoginPage;
