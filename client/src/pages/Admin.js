import React from "react";
import StudentCard from "../components/StudentCard";
import { Container, Box, Typography } from "@mui/material";
import Location from "../components/Location";
import RequestLunch from "../components/RequestLunch";
import SetLunchMaker from "../components/SetLunchMaker";
import CreateEventForm from "../components/CreateEventForm";
import SetLunchShopper from "../components/SetLunchShopper";
import EditEventForm from "../components/EditEventForm";



export default function Admin() {
	return (
		<div sx={{ padding: 0 }}>
			<Container>
				<StudentCard />
				<Location />
			</Container>
			<RequestLunch />
			<CreateEventForm />
			<Box sx={{ boxShadow: 3, mx: "auto", my: 6, p: 4, width: "80%" }}>
				<Typography variant="h5" sx={{ mb: 2 }} align="center">
					Nominate Lunch Maker & Lunch Shopper
				</Typography>
				<Box>
					<SetLunchMaker />
					<SetLunchShopper />
				</Box>
			</Box>
			<EditEventForm />
		</div>
	);
}
