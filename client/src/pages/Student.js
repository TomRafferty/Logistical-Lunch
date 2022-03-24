import React from "react";
import StudentCard from "../components/StudentCard";
import { Container } from "@mui/material";
import LunchMakerInformation from "../components/LunchMakerInformation";
import Location from "../components/Location";
import RequestLunch from "../components/RequestLunch";

const Student = () => {
	return (
		<div sx={{ padding: 0 }}>
			<Container>
				{sessionStorage.getItem("is_lunch_maker") ? (
					<LunchMakerInformation display="flex" />
				) : (
					<LunchMakerInformation display="none" />
				)}
				<StudentCard />
				<Location />
			</Container>
			<RequestLunch />
		</div>
	);
};

export default Student;
