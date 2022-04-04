import React from "react";
import StudentCard from "../components/StudentCard";
import { Box, Typography } from "@mui/material";
import Location from "../components/Location";
import RequestLunch from "../components/RequestLunch";
import SetLunchMaker from "../components/SetLunchMaker";
import SetLunchShopper from "../components/SetLunchShopper";
import EventForm from "../components/EventForm";
import DistanceMatrix from "../components/DistanceMatrix";

export default function Admin() {
	return (
		<Box sx={{ width: "80%", mx: "auto", mb: 6 }}>
			<StudentCard />
			<Box
				disableGutters
				sx={{ display: "flex", justifyContent: "space-between", mb: 6 }}
			>
				<Location />
				<RequestLunch />
			</Box>

			<DistanceMatrix />

			<Box sx={{ boxShadow: 3, mx: "auto", mb: 6, display: "flex", justifyContent: "space-between" }}>
				<EventForm isEdit={false} />
				<EventForm isEdit={true} />
			</Box>

			<Box sx={{ boxShadow: 3, mx: "auto", my: 6, p: 4 }}>
				<Typography
					fontSize="20px"
					fontWeight="bold"
					textAlign="center"
					marginBottom="16px"
				>
					Nominate Lunch Maker & Lunch Shopper
				</Typography>
				<Box
					disableGutters
					sx={{ display: "flex", justifyContent: "space-between" }}
				>
					<SetLunchMaker />
					<SetLunchShopper />
				</Box>
			</Box>
		</Box>
	);
}
