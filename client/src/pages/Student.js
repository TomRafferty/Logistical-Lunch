import React from "react";
import StudentCard from "../components/StudentCard";
import { Container } from "@mui/material";
import LunchMakerInformation from "../components/LunchMakerInformation";

const isLunchMaker = true; //temp bool

export function Student() {

	return (
		<div sx={{ padding: 0 }}>
			<Container>
				{isLunchMaker? <LunchMakerInformation /> : false}

				<StudentCard />
			</Container>
		</div>
	);
}

export default Student;
