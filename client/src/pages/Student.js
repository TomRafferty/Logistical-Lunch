import React from "react";
import StudentCard from "../components/StudentCard";
import { Container } from "@mui/material";
import RequestLunch from "../components/RequestLunch";

export function Student() {

	return (
		<div sx={{ padding: 0 }}>
			<Container>
				<StudentCard />
			</Container>
			<RequestLunch />
		</div>
	);
}

export default Student;
