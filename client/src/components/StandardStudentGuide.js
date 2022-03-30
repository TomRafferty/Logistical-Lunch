import { Typography, Box, Container } from "@mui/material";
import EngineeringIcon from "@mui/icons-material/Engineering";

const StandardStudentGuide = () => {
	return (
		<Box sx={{ boxShadow: 3, my: 6, p: 4 }}>
			<Container
				sx={{ display: "flex", alignItems: "center", marginLeft: "0" }}
			>
				<EngineeringIcon fontSize="large"></EngineeringIcon>
				<Typography marginLeft="20px" fontSize="20px" fontWeight="bold">
					How does it work?
				</Typography>
			</Container>
			<Typography marginTop={2} align="justify">
				As a participant to our weekly meetings all the students are expected to provide some information in order to help us organize the logistical side of the event. As soon as the class organizer will create the event, you will have to provide us your postcode, the transportation mode you will use to get to us and your lunch requests. The postcode and the transportation mode will help the event organizer to set up a fair starting time for the event taking into consideration how long it will take the students to get there. Also CYF supported by a weekly lunch maker and lunch shopper can provide you the lunch so please feel free to send us your requirements. All this information should be submitted by each Thursday morning.
			</Typography>
		</Box>
	);
};

export default StandardStudentGuide;
