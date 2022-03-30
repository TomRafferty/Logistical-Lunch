import { React, useState } from "react";
import { TextField, Typography, Box, Button, FormControl, Container } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const Location = () => {
    // const [userData, setUserData] = useState([]);
    const [newLocal, setNewLocal] = useState("");
    const [update, setUpdate] = useState(true);


    // a function to set the new inputted location
    const handleChange=(e)=> {
        if(e.target.value) {
            setNewLocal(e.target.value);
        }
    };
    // a function to update the users location in the database
    const handleClick=()=> {
        if(newLocal.length>0) {
            fetch("api/users/location", {
                        method: "put",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            location: newLocal,
                            id: sessionStorage.getItem("userId"),
                        }),
                    })
                        .then(() => {
                            let sessionData = sessionStorage.getItem("userLocation");
                            sessionData = newLocal;
                            sessionStorage.setItem("userLocation", sessionData);
                            setUpdate(!update);
                        })
                        .catch((error) => {
                            console.log("An error occurred:", error);
                        });
                    }
                };
    return (
			<Box
				sx={{
					boxShadow: 3,
					p: 4,
					width: "40%",
					minHeight: "150px",
				}}
			>
				<Container
					sx={{ display: "flex", alignItems: "center", marginLeft: "0" }}
				>
					<LocationOnIcon fontSize="large"></LocationOnIcon>
					<Typography marginLeft="20px" fontSize="20px" fontWeight="bold">
						Location
					</Typography>
				</Container>
				{sessionStorage.getItem("userLocation") === "null" ? (
					<Typography marginTop={2} marginBottom={1}>
						We do not have your location details. Please enter your Postcode
					</Typography>
				) : (
					<Typography marginTop={2} marginBottom={1}>
						Your Postcode is{" "}
						<Typography component="span" sx={{ color: "primary.main" }}>
							{sessionStorage.getItem("userLocation")}.
						</Typography>{" "}
						Would you like to enter a different location?
					</Typography>
				)}
				<Box
					component="form"
					sx={{
						display: "flex",
						gap: "20px",
						alignItems: "end",
					}}
				>
					<FormControl
						sx={{
							display: "flex",
							flexDirection: "row",
							gap: "10px",
						}}
					>
						<TextField
							size="small"
							id="location"
							name="location"
							label="Postcode"
							sx={{ width: "180px" }}
							onChange={handleChange}
							required
						></TextField>
						<Button
							type="reset"
							variant="contained"
							size="medium"
							sx={{ width: "max-content" }}
							onClick={handleClick}
						>
							Submit
						</Button>
					</FormControl>
				</Box>
			</Box>
		);
};

export default Location;