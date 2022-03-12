import React from "react";
import { Box, BottomNavigation, Typography } from "@mui/material";
import styled from "@emotion/styled";

const FooterBox = styled(Box)({
	background: "#f3f3f3",
    height: "60px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "auto",
});


const Footer = () => {
    return (
			<FooterBox>
				<Typography>&copy; Copyright CYF 2022</Typography>
			</FooterBox>
		);
};

export default Footer;


