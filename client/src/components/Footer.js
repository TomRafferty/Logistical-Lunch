import React from "react";
import { Box, Typography } from "@mui/material";
import styled from "@emotion/styled";

const FooterBox = styled(Box)({
	background: "rgb(239,239,239)",
	height: "50px",
	paddingTop: "20px",
	// position: "fixed",
	// bottom: 0,
	// left: 0,
	width: "100%",
	textAlign: "center",
    zIndex: 100,
});

const Footer = () => {
    return (
			<FooterBox>
				<Typography>&copy; Copyright CYF 2022</Typography>
			</FooterBox>
		);
};

export default Footer;


