import { React, useState, useEffect } from "react";
import { FormControl, Typography, Box, InputLabel, Select, MenuItem, Container } from "@mui/material";

const Transit = () => {
    const [userData, setUserData] = useState([]);
    const [update, setUpdate] = useState(false);
    const [travel, setTravel] = useState("");

    // function to get the id of the current user
    function getId() {
        fetch(`http://localhost:3000/api/users/${sessionStorage.getItem("userId")}`)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw `${response.status} ${response.statusText}`;
            })
            .then((response) => {
                setUserData(response);
            })
            .catch((error) => {
                console.log("An error occurred:", error);
            });
    }

        useEffect(()=>{
             getId();
        },[update]);

    // on change the value of the option will be sent to sessionStorage and as an update to the database
    const handleChange=(e)=> {
        let sessionData = sessionStorage.getItem("transportType");
        sessionData = e.target.value;
        sessionStorage.setItem("transportType", sessionData);
        fetch("api/users/transport", {
            method: "put",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                transport: e.target.value,
                id: sessionStorage.getItem("userId"),
            }),
        }).then(()=>{
            setTravel(e.target.value);
            setUpdate(!update);
        });
    };

    return (
			<Container sx={{ mt: "20px", display: "flex", alignItems: "center", justifyContent: "center" }}>
				{userData.map((element) => {
					return !element.transport_type ? (
						<Typography margin="20px">
							How will you be travelling to this weeks meeting? Please Select a
							travel option.
						</Typography>
					) : (
						<Typography>
							Your chosen mode of travel is{" "}
							{element.transport_type === "transit"
								? "public transport"
								: element.transport_type}
							. Is this Correct? If not please update.
						</Typography>
					);
				})}
				<FormControl sx={{ width: "175px", marginLeft: "20px" }}>
					<InputLabel id="travel">Travel</InputLabel>
					<Select
						id="travel"
						value={travel}
						label="Age"
						onChange={handleChange}
					>
						<MenuItem value={"transit"}>
							Public Transport
						</MenuItem>
						<MenuItem value={"driving"}>
							Car
						</MenuItem>
						<MenuItem value={"walking"}>
							Walking
						</MenuItem>
						<MenuItem value={"bicycling"}>
							Bicycling
						</MenuItem>
					</Select>
				</FormControl>
			</Container>
		);
};

export default Transit;