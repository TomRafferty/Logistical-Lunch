import React from "react";
import StudentCard from "../components/StudentCard";
import { Container } from "@mui/material";
import Location from "../components/Location";
export function Student() {

	return (
		<div sx={{ padding: 0 }}>
			<Container>
				<StudentCard />
				<Location />
			</Container>
		</div>
	);
}

export default Student;
