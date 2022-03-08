import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const LoginRegisterButtons = () => {

    const buttonClicked = (action) => {
        if(action === "register"){
            alert("register");
        } else{
            alert("login");
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