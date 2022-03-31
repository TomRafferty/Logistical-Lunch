import { React, useState } from "react";
import { TextField, Typography, Box, Button, FormControl } from "@mui/material";

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
			<Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
				{ sessionStorage.getItem("userLocation")=== "null" ? (
						<Typography padding="20px 20px 10px 20px">
							We do not have your location details. Please enter your Postcode
						</Typography>
					) : (
						<Typography padding="20px 20px 10px 20px">
							Your Postcode is {sessionStorage.getItem("userLocation")}. Would you like to enter
							a different location?
						</Typography>
					)
				}
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