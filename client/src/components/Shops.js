import { React, useState, useEffect } from "react";
import { Container, Typography, Box, Grid } from "@mui/material";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";

const clean = (obj) => {
	return JSON.parse(JSON.stringify(obj));
};

const Shops = () => {
const [shopResults, setShopResults] = useState([]);
const location = sessionStorage.getItem("userLocation");


// a function that first fetches the latitude and longitude for the students postcode
async function getPlaces() {
	const data = await fetch(`/api/postcodes/shops/${location}`);
	console.log(`data 1 = ${clean(data)}`);
	const dataTwo = await data.json();
	console.log(`data 2 = ${clean(dataTwo)}`);
	// then gets the information for nearby supermarkets/grocery shops
	const shopData = await fetch(
		`/api/google?lat=${dataTwo.result.latitude}&long=${dataTwo.result.longitude}`
	);
	console.log(`shop data = ${clean(shopData)}`);
	const shopDataTwo = await shopData.json();
	const shopArray = shopDataTwo.results.map((element) => {
		return {
			name: element.name,
			address: element.vicinity,
			open: !element.opening_hours ? "" : element.opening_hours.open_now ? "open now" : "closed now",
			distance: "",
		};
	});

	// builds a string of coordinates to pass to the distance matrix
	let originData = `${dataTwo.result.latitude},${dataTwo.result.longitude}`;
	let distString = "";
	shopDataTwo.results.forEach((element) => {
		distString = `${distString}
				${element.geometry.location.lat},
				${element.geometry.location.lng}|`;
	});

	// then sends built string to the distance matrix
	const distanceData = await fetch(
		`/api/google/distance?start=${originData}&ends=${distString.slice(1)}`
	);
	console.log(`distance date = ${clean(distanceData)}`);
	const distanceDataTwo = await distanceData.json();
	const distShopArr = shopArray.map((element, index) => {
		return {
			...element,
			distance: distanceDataTwo.rows[0].elements[index].distance.text,
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
				<Box
					sx={{
						boxShadow: 3,
						my: 6,
						p: 4,
						display: "flex",
						flexDirection: "column",
						width: "80%",
					}}
				>
					<Container
						sx={{ display: "flex", alignItems: "center", marginLeft: "0" }}
					>
						<LocalGroceryStoreIcon fontSize="large"></LocalGroceryStoreIcon>
						<Typography marginLeft="20px" fontSize="20px" fontWeight="bold">
							Local shops
						</Typography>
					</Container>
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
									<Box width="30%" display="flex" padding="5px">
										<Typography>
											<b>{element.name}</b>
										</Typography>
									</Box>
									<Box width="40%" display="flex">
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
				</Box>
			</Grid>
		);
};

export default Shops;