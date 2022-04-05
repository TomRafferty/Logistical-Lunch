import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Menu, MenuItem, IconButton, Typography, Avatar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../../images/cyf-logo.png";
import { useMediaQuery } from "@material-ui/core";

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
	const isLunchMaker = sessionStorage.getItem("isLunchMaker");
	const isLunchShopper = sessionStorage.getItem("isLunchShopper");

	//setting different styles for the navbar depending if the user is logged in or not
	const bgColor = userType != null ? "rgb(239,239,239)" : "rgb(255,255,255)";
	const boxShadow = userType != null ? "" : "none";

    // variable for the useNavigate hook
	let nav = useNavigate();
	const isMobile = useMediaQuery("(max-width:500px)");
	return (
		<>
			{isMobile ?
				/* desktop nav */
				<AppBar position="static">
					<Toolbar variant="dense">
						<IconButton
							edge="start"
							color="inherit"
							aria-label="menu"
							sx={{ mr: 2 }}
						>
							<MenuIcon />
						</IconButton>
						<Typography variant="h6" color="inherit" component="div">
							Photos
						</Typography>
					</Toolbar>
				</AppBar>
			:
				/* mobile nav (hamburger menu) */
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
								<IconButton
									aria-label="menu"
									id="menu-button"
									aria-haspopup="true"
									onClick={handleClick}
								>
									<MenuIcon sx={{ fontSize: 35 }} />
								</IconButton>
								<Menu id="menu" anchorEl={anchorEl} open={open} onClose={close}>
									{isLunchMaker === "true" ? (
										<MenuItem onClick={() => nav("/recipes")}>
											Lunch Maker
										</MenuItem>
									) : (
										""
									)}
									{isLunchShopper === "true" ? (
										<MenuItem onClick={() => nav("/shopper")}>
											Lunch Shopper
										</MenuItem>
									) : (
										""
									)}
									<MenuItem onClick={() => nav("/student")}>
										{" "}
										Meeting Info
									</MenuItem>
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
			}
		</>
	);
};

export default NavBar;