import React from "react";
import StudentCard from "../components/StudentCard";
import { Container } from "@mui/material";
import Location from "../components/Location";
import RequestLunch from "../components/RequestLunch";
import SetLunchMaker from "../components/SetLunchMaker";
import CreateEventForm from "../components/CreateEventForm";


export function Admin() {
	return (
		<div sx={{ padding: 0 }}>
			<Container>
				<StudentCard />
				<Location />
			</Container>
			<RequestLunch />
			<SetLunchMaker />
			<CreateEventForm />
		</div>
	);
}
