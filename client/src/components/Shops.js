import { React, useState, useEffect } from "react";
import { Card, Typography, Box, Grid } from "@mui/material";

const Shops = () => {
const [shopResults, setShopResults] = useState([]);
const location = sessionStorage.getItem("userLocation");


// a function that first fetches the latitude and longitude for the students postcode
async function getPlaces() {
	const data = await fetch(`https://api.postcodes.io/postcodes/${location}`).then(
		(response) => response.json()
	);
	// then gets the information for nearby supermarkets/grocery shops
	const shopData = await fetch(
		`http://localhost:3000/api/google?lat=${data.result.latitude}&long=${data.result.longitude}`
	).then((response) => response.json());
	const shopArray = shopData.results.map((element) => {
		return {
			name: element.name,
			address: element.vicinity,
			open: !element.opening_hours ? "" : element.opening_hours.open_now ? "open now" : "closed now",
			distance: "",
		};
	});

	// builds a string of coordinates to pass to the distance matrix
	let originData = `${data.result.latitude},${data.result.longitude}`;
	let distString = "";
	shopData.results.forEach((element) => {
		distString = `${distString}
				${element.geometry.location.lat},
				${element.geometry.location.lng}|`;
	});
	// then sends built string to the distance matrix
	const distanceData = await fetch(
		`http://localhost:3000/api/google/distance?start=${originData}&ends=${distString.slice(1)}`
	).then((response) => response.json());
	const distShopArr = shopArray.map((element, index) => {
		return {
			...element,
			distance: distanceData.rows[0].elements[index].distance.text,
		};
	});

	setShopResults(distShopArr);
}

useEffect(() => {
	getPlaces();
	return () => {
		"cleanup";
	};
}, []);

    return (
			<Grid display="flex" flexDirection="column" alignItems="center">
				<Card sx={{ display: "flex", width: "87%" }}>
					<Box width="100%" gap="10px">
						{shopResults.slice(0, 7).map((element, index) => {
							return (
								<Box
									sx={{
										padding: "5px 0px",
										textAlign: "center",
										display: "flex",
										justifyContent: "space-evenly",
										my: "15px",
									}}
									key={index}
								>
									<Box width="35%" display="flex" padding="5px">
										<Typography>
											<b>{element.name}</b>
										</Typography>
									</Box>
									<Box width="35%" display="flex">
										<Typography>{element.address}</Typography>
									</Box>
									<Box width="15%" display="flex" justifyContent="center">
										<Typography>{element.open}</Typography>
									</Box>
									<Box width="15%" display="flex">
										<Typography>{element.distance}</Typography>
									</Box>
								</Box>
							);
						})}
					</Box>
				</Card>
			</Grid>
		);
};

export default Shops;