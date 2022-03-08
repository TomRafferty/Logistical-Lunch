import styled from "@emotion/styled";
import { Container } from "@mui/material";
import LoginPageHeading from "../components/LoginPageHeading";
import RegisterForm from "../components/RegisterForm";

const FormContainer = styled(Container)({
	marginTop: "20px",
});

export function LoginPage() {
	return (
		<main role="main">
			<LoginPageHeading />
			<FormContainer mt={2}>
				<RegisterForm />
			</FormContainer>
		</main>
	);
}

export default LoginPage;
