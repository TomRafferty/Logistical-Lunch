import React from "react";
import StudentCard from "../components/StudentCard";
import { Container } from "@mui/material";
import LunchMakerInformation from "../components/LunchMakerInformation";
import RequestLunch from "../components/RequestLunch";

const isLunchMaker = true; //temp bool


export function Student() {

	return (
		<div sx={{ padding: 0 }}>
			<Container>
				{isLunchMaker? <LunchMakerInformation /> : false}

				{/* <StudentCard /> commented out to stop errors*/}
			</Container>
			<RequestLunch />
		</div>
	);
}

export default Student;
