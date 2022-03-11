import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Menu, MenuItem, IconButton, Typography, Avatar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogisticalLunchIcon from "../../images/logistical-lunch-icon.png";

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
    // variable for the useNavigate hook
	let nav = useNavigate();
	return (
		<AppBar position="static" sx={{ bgcolor: "rgb(239,239,239)" }}>
			<Toolbar>
				<Avatar
					alt="logistical-lunch"
					src={LogisticalLunchIcon}
					sx={{ height: "40px", width: "40px" }}
					variant="square"
				/>
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
							nav("/");
						}}
					>
						Logout
					</MenuItem>
				</Menu>
			</Toolbar>
		</AppBar>
	);
};

export default NavBar;