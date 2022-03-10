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
			//I went with % here to be responsive
			<Box textAlign="center" margin="5%" flexDirection="row" flexWrap="wrap">
				<div className="login-register-buttons">
					<Button
						className="register-button"
						onClick={() => buttonClicked("register")}
						variant="contained"
						sx="margin: 2%"
					>
						Register
					</Button>
					<Button
						className="login-button"
						onClick={() => buttonClicked("login")}
						variant="contained"
						sx="margin: 2%"
					>
						Login
					</Button>
				</div>
			</Box>
		);
};

export default LoginRegisterButtons;