import React from "react";
import StudentCard from "../components/StudentCard";
import { Container } from "@mui/material";

export function Student() {

	return (
		<div sx={{ padding: 0 }}>
			<Container>
				<StudentCard />
			</Container>
		</div>
	);
}

export default Student;
