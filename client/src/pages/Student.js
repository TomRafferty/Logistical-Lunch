import React from "react";
import NavBar from "../components/NavBar";
import StudentCard from "../components/StudentCard"
import { Container } from "@mui/material";

export function Student() {

	return (
		<div sx={{ padding: 0 }}>
			<Container>
				<NavBar />
				<StudentCard />
			</Container>
		</div>
	);
}

export default Student;
