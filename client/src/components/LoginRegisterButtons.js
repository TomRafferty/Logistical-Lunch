import Button from "@mui/material/Button";
import styled from "@emotion/styled";
import Box from "@mui/material/Box";

const StyledButton = styled(Button)({
	margin: "2%",
});

const LoginRegisterButtons = (props) => {

    const buttonClicked = (action) => {
        //action === "register" || "login"
        if(action === "register"){
            props.displayForms("register");
        } else{
            props.displayForms("login");
        }
    };

    return (
			//I went with % here to be responsive
			<Box textAlign="center" margin="5%" flexDirection="row" flexWrap="wrap">
				<div className="login-register-buttons">
					<StyledButton
						className="register-button"
						onClick={() => buttonClicked("register")}
						variant="contained"
					>
						Register
					</StyledButton>
					<StyledButton
						className="login-button"
						onClick={() => buttonClicked("login")}
						variant="contained"
					>
						Login
					</StyledButton>
				</div>
			</Box>
		);
};

export default LoginRegisterButtons;