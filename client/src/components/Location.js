import { React, useState, useEffect } from "react";
import { TextField, Typography, Box, Button, FormControl } from "@mui/material";

const Location = () => {
    const [userData, setUserData] = useState([]);
    const [newLocal, setNewLocal] = useState("");
    const [update, setUpdate] = useState(true);

    // a function that gets the user information for given id
    useEffect(()=> {
        fetch(`http://localhost:3000/api/users/${sessionStorage.getItem("userId")}`)
        .then((response)=> {
            if(response.ok) {
                return response.json();
            }
            throw `${response.status} ${response.statusText}`;
        }).then((response)=>{
            setUserData(response);
        }).catch((error) => {
            console.log("An error occurred:", error);
        });
    },[update]);

    // a function to set the new inputted location
    const handleChange=(e)=> {
        setNewLocal(e.target.value);
    };
    // a function to update the users location in the database
    const handleClick=()=> {
        let sessionData = sessionStorage.getItem("userLocation");
        sessionData=newLocal;
        sessionStorage.setItem("userLocation", sessionData);
        fetch("api/users/location", {
					method: "put",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						location: newLocal,
						id: sessionStorage.getItem("userId"),
					}),
				}).then(() => {
					setUpdate(!update);
				});
    };

    return (
			<Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
				{userData.map((element) => {
					return !element.user_location ? (
						<Typography padding="20px 20px 10px 20px">
							We do not have your location details. Please enter your Postcode
						</Typography>
					) : (
						<Typography padding="20px 20px 10px 20px">
							Your Postcode is {element.user_location}. Would you like to enter
							a different location?
						</Typography>
					);
				})}
				<Box
                component="form"
                sx={{
                    display: "flex",
                    gap: "10px",
                    paddingLeft: "10px",
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
                        margin="10px"
                        size="small"
                        sx={{ height: "40px" }}
                        onClick={handleClick}
                    >
                        Submit Postcode
                    </Button>
                </FormControl>
				</Box>
			</Box>
		);
};

export default Location;