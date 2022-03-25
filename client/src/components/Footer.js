import React from "react";
import { Box, Typography } from "@mui/material";
import styled from "@emotion/styled";

const FooterBox = styled(Box)({
	background: "#f3f3f3",
    height: "60px",
    marginTop: "2rem",
    position: "fixed",
    bottom: 0,
    left: 0,
    width: "100%",
    textAlign: "center",
});

const Footer = () => {
    return (
			<FooterBox>
				<Typography>&copy; Copyright CYF 2022</Typography>
			</FooterBox>
		);
};

export default Footer;


