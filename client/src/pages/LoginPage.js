import styled from "@emotion/styled";
import { Container } from "@mui/material";
import LoginPageHeading from "../components/LoginPageHeading";
import RegisterForm from "../components/RegisterForm";
import LoginRegisterButtons from "../components/LoginRegisterButtons";
import { useState } from "react";

const FormContainer = styled(Container)({
	marginTop: "20px",
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
		</main>
	);
}

export default LoginPage;
