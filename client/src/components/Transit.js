import { React, useState, useEffect } from "react";
import { FormControl, Typography, Box, InputLabel, Select, MenuItem, Container } from "@mui/material";
import EmojiTransportationIcon from "@mui/icons-material/EmojiTransportation";

const Transit = () => {
    const [userData, setUserData] = useState([]);
    const [update, setUpdate] = useState(false);
    const [travel, setTravel] = useState("");

    // function to get the id of the current user
    function getId() {
        fetch(`/api/users/${sessionStorage.getItem("userId")}`)
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
			<Box
				sx={{
					boxShadow: 3,
					p: 4,
					width: "40%",
					alignSelf: "flex-start",
					minHeight: "150px",
				}}
			>
				<Container
					sx={{ display: "flex", alignItems: "center", marginLeft: "0" }}
				>
					<EmojiTransportationIcon fontSize="large"></EmojiTransportationIcon>
					<Typography marginLeft="20px" fontSize="20px" fontWeight="bold">
						Transportation mode
					</Typography>
				</Container>
				{userData.map((element) => {
					return !element.transport_type ? (
						<Typography marginTop={2} marginBottom={1}>
							How will you be traveling to this weeks meeting? Please select a
							travel option.
						</Typography>
					) : (
						<Typography marginTop={2} marginBottom={1}>
							Your chosen mode of travel is
							<Typography component="span" sx={{ color: "primary.main" }}>
								{element.transport_type === "transit"
									? " public transport"
									: ` ${element.transport_type}`}
							</Typography>
							. Is this correct? If not please update.
						</Typography>
					);
				})}
				<FormControl sx={{ width: "175px", marginLeft: "20px" }}>
					<InputLabel id="travel">Go</InputLabel>
					<Select
						id="travel"
						size="small"
						value={travel}
						label="Age"
						onChange={handleChange}
					>
						<MenuItem value={"transit"}>Public Transport</MenuItem>
						<MenuItem value={"driving"}>Car</MenuItem>
						<MenuItem value={"walking"}>Walking</MenuItem>
						<MenuItem value={"bicycling"}>Bicycling</MenuItem>
					</Select>
				</FormControl>
			</Box>
		);
};

export default Transit;