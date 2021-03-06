import React from "react";
import { useNavigate } from "react-router-dom";
import {
	AppBar,
	Toolbar,
	MenuItem,
	Typography,
	Avatar,
} from "@mui/material";
import logo from "../../images/cyf-logo.png";
import { styled } from "@mui/system";

const StyledMenuItem = styled(MenuItem)({
	color: "black",
});

const StyledMenuItemLogout = styled(MenuItem)({
	color: "red",
});

const NavBar = () => {

	//storing the role of the user into the  sessionStorage so we can display the nav accordingly.
	const userType = sessionStorage.getItem("userType");
	const isLunchMaker = sessionStorage.getItem("isLunchMaker");
	const isLunchShopper = sessionStorage.getItem("isLunchShopper");

	//setting different styles for the navbar depending if the user is logged in or not
	const bgColor = userType != null ? "rgb(239,239,239)" : "rgb(255,255,255)";
	const boxShadow = userType != null ? "" : "none";

	// variable for the useNavigate hook
	let nav = useNavigate();

	return (
		<AppBar
			position="static"
			sx={{
				bgcolor: `${bgColor}`,
				boxShadow: `${boxShadow}`,
				paddingLeft: "40px",
			}}
		>
			<Toolbar>
				<Avatar
					alt="logistical-lunch"
					src={logo}
					sx={{ height: "40px", width: "auto" }}
					variant="square"
				/>
				{userType != null ? (
					<>
						<Typography sx={{ flexGrow: 1, color: "black" }} align="center">
							Hi {sessionStorage.getItem("userName")}
						</Typography>
							{isLunchMaker === "true" ? (
								<StyledMenuItem onClick={() => nav("/recipes")} >Lunch Maker</StyledMenuItem>
							) : (
								""
							)}
							{isLunchShopper === "true" ? (
								<StyledMenuItem onClick={() => nav("/shopper")}>
									Lunch Shopper
								</StyledMenuItem>
							) : (
								""
							)}
							{userType === "student" ? (
								<StyledMenuItem onClick={() => nav("/student")}>
									{" "}
									Meeting Info
								</StyledMenuItem>
							) : (
								""
							)}

							{userType === "admin" ? (
								<StyledMenuItem onClick={() => nav("/admin")}> Meeting Info</StyledMenuItem>
							) : (
								""
							)}

							<StyledMenuItemLogout
								onClick={() => {
									sessionStorage.removeItem("userType");
									nav("/");
								}}
							>
								Logout
							</StyledMenuItemLogout>
					</>
				) : (
					""
				)}
			</Toolbar>
		</AppBar>
	);
};

export default NavBar;
