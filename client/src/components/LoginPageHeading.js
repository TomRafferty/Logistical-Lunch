import React from "react";
import LogisticalLunchIcon from "../../images/logistical-lunch-icon.png";
import styled from "@emotion/styled";
import { Avatar, Container } from "@mui/material";
import { Typography } from "@mui/material";

const HeadingContainer = styled(Container)({
	background: "rgb(239,239,239)",
	display: "flex",
	alignItems: "center",
	margin: 0,
	paddingLeft: 40,
	paddingRight: 40,
});

const IconBox = styled(Avatar)({
    padding: 10,
});

const Heading = styled(Typography)({
	fontSize: 20,
	marginLeft: 20,
});

const LoginPageHeading = () => {
    return (
			<HeadingContainer disableGutters={true} maxWidth="xl">
				<IconBox
					variant="square"
					src={LogisticalLunchIcon}
					alt="logistical-lunch"
				/>
				<Heading variant="h1"> Logistical Lunch </Heading>
			</HeadingContainer>
		);
};
export default LoginPageHeading;
