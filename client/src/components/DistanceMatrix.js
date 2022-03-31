import { React, useState, useEffect } from "react";
import {
	Container,
	Typography,
	Card,
	Box,
	TextField,
	FormControl,
	Button,
} from "@mui/material";

// function sends locations(postcodes) to api and receives coordinates back
async function getPostCodeData(postcodes, origin) {
	const pcs = [`${origin}`];
	const modes = [];
	postcodes.map((element) => {
		pcs.push(element.user_location);
		modes.push(element.transport_type);
	});

	const pcInfo = await fetch("https://api.postcodes.io/postcodes", {
		method: "post",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			postcodes: pcs,
		}),
	});
	const pcInfoTwo = await pcInfo.json();

	return { pcInfoTwo, modes };
}
// inputs coordinates and travel types to google matrix and receives durations and distances
async function getDistance(originCoords, coord, mode) {
	const result = await fetch(
		`http://localhost:3000/api/google/admin?begin=${originCoords}&finish=${coord}&transit=${mode}`
	);
	const data = await result.json();
	if(data.rows[0].elements[0].status!=="OK") {
		return undefined;
	}
	return data;
}
// function
async function distMatrix(originCoords, destCoords, modes) {
	const travelMatrix = await Promise.allSettled(
		destCoords.map((coord, index) =>
			getDistance(originCoords, coord, modes[index])
		)
	);
	const travelMatrixTwo = travelMatrix.filter((x)=> x.value).map((response) => response.value.rows[0].elements[0]);
	const travelMatrixThree = travelMatrixTwo.map((element, index) => ({
		...element,
		transport: modes[index],
	}));
	return travelMatrixThree;
}

const DistanceMatrix = () => {
	const [pcData, setPcData] = useState([]);
	const [matrix, setMatrix] = useState([]);
	const [origin, setOrigin] = useState("");
	const [update, setUpdate] = useState(false);
	const postCodeCohort = 378;

	// function to get the location and transport type of users
	async function getPostcodes() {
		const data = await fetch(
			`http://localhost:3000/api/postcodes?codesCohort=${postCodeCohort}`
		);
		const dataTwo = await data.json();
		let filtered = dataTwo.filter(
			(element) =>
				element.user_location !== null && element.transport_type !== null
		);
		setPcData(filtered);
	}

	// assigns to variables venue/origin coordinates and destinations' coordinates
	async function postCodeData() {
		const { pcInfoTwo, modes } = await getPostCodeData(pcData, origin);

		let originCoords = `${pcInfoTwo.result[0].result.latitude},${pcInfoTwo.result[0].result.longitude}`;
		let destCoords = [];
		pcInfoTwo.result.slice(1).forEach((element) => {
			destCoords.push(`${element.result.latitude},${element.result.longitude}`);
		});
		const distance = await distMatrix(originCoords, destCoords, modes);
		setMatrix(distance);
	}

	useEffect(() => {
		getPostcodes();
		postCodeData();
	}, [update]);

	const handleChange = (e) => {
		setOrigin(e.target.value);
	};

	const handleClick = () => {
		setMatrix([]);
		setUpdate(!update);
	};

	return (
		<Container>
			<Card>
				<Typography margin="20px" variant="h5">
					Travel Times of Trainees
				</Typography>
				<Typography margin="20px" variant="h7">
					Enter venue postcode
				</Typography>
				<Box component="form" noValidate autoComplete="off" margin="10px">
					<FormControl
						sx={{
							display: "flex",
							flexDirection: "row",
							gap: "30px",
						}}
					>
						<TextField
							required
							id="distance"
							label="venue"
							variant="outlined"
							size="small"
							name="distance"
							sx={{ width: "200px" }}
							onChange={handleChange}
						/>
						<Button
							type="button"
							variant="contained"
							margin="10px"
							size="small"
							sx={{ height: "40px", width: "100px" }}
							onClick={handleClick}
						>
							Submit
						</Button>
					</FormControl>
				</Box>
				<Box margin="20px">
					{matrix.map((element, index) => {
						return (
							<Box key={index} display="flex">
								<Box width="100px">
									<Typography display="inline">
										{element.distance.text}
									</Typography>
								</Box>
								<Box width="130px">
									<Typography display="inline">
										{element.duration.text}
									</Typography>
								</Box>
								<Box width="120px">
									<Typography display="inline">
										{element.transport === "transit"
											? "public transport"
											: element.transport}
									</Typography>
								</Box>
							</Box>
						);
					})}
				</Box>
			</Card>
		</Container>
	);
};

export default DistanceMatrix;
