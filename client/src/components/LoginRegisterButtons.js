import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

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
			<Box textAlign="center">
				<div className="login-register-buttons">
					<Button
						className="register-button"
						onClick={() => buttonClicked("register")}
						variant="contained"
					>
						Register
					</Button>
					<Button
						className="login-button"
						onClick={() => buttonClicked("login")}
						variant="contained"
					>
						Login
					</Button>
				</div>
			</Box>
		);
};

export default LoginRegisterButtons;