import React from "react";
import StudentCard from "../components/StudentCard";
import { Box } from "@mui/material";
import Location from "../components/Location";
import RequestLunch from "../components/RequestLunch";
import Transit from "../components/Transit";
import StandardStudentGuide from "../components/StandardStudentGuide";

const Student = () => {
	return (
		<Box
			sx={{ width: "80%", mx: "auto", mb: 6 }}
		>
			<StandardStudentGuide />
			<StudentCard />
			<Box
				disableGutters
				sx={{ display: "flex", justifyContent: "space-between" }}
			>
				<Location />
				<Transit />
				<RequestLunch />
			</Box>
		</Box>
	);
};

export default Student;
