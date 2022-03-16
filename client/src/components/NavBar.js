import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Menu, MenuItem, IconButton, Typography, Avatar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const NavBar = () => {
	// boilerplate code from mui for a basic menu
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (e) => {
		setAnchorEl(e.currentTarget);
	};
	const close = () => {
		setAnchorEl(null);
	};

	//storing the role of the user into the  sessionStorage so we can display the nav accordingly.
	const userType = sessionStorage.getItem("userType");

	//setting different styles for the navbar depending if the user is logged in or not
	const bgColor = userType != null ? "rgb(239,239,239)" : "rgb(255,255,255)";
	const boxShadow = userType != null ? "" : "none";

    // variable for the useNavigate hook
	let nav = useNavigate();

	return (
		<AppBar
			position="static"
			sx={{ bgcolor: `${bgColor}`, boxShadow: `${boxShadow}` }}
		>
			<Toolbar>
				<Avatar
					alt="logistical-lunch"
					src="https://codeyourfuture.io/wp-content/uploads/2019/03/cyf_brand.png"
					sx={{ height: "40px", width: "auto" }}
					variant="square"
				/>
				{userType != null ? (
					<>
						<Typography sx={{ flexGrow: 1, color: "black" }} align="center">
							Hi Student
						</Typography>
						<IconButton
							aria-label="menu"
							id="menu-button"
							aria-haspopup="true"
							onClick={handleClick}
						>
							<MenuIcon sx={{ fontSize: 35 }} />
						</IconButton>
						<Menu id="menu" anchorEl={anchorEl} open={open} onClose={close}>
							<MenuItem onClick={close}>Recipes</MenuItem>
							<MenuItem onClick={close}> Edit Profile</MenuItem>
							<MenuItem onClick={close}> Meeting Info</MenuItem>
							<MenuItem
								onClick={() => {
									sessionStorage.removeItem("userType");
									nav("/");
								}}
							>
								Logout
							</MenuItem>
						</Menu>
					</>
				) : (
					""
				)}
			</Toolbar>
		</AppBar>
	);
};

export default NavBar;