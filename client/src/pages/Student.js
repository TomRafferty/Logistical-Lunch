import React from "react";
import StudentCard from "../components/StudentCard";
import { Container } from "@mui/material";
import Location from "../components/Location";
import RequestLunch from "../components/RequestLunch";

const Student = () => {
	return (
		<div sx={{ padding: 0 }}>
			<Container>
				<StudentCard />
				<Location />
			</Container>
			<RequestLunch />
		</div>
	);
};

export default Student;
