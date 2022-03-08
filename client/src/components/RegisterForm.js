import {
	FormControl,
	MenuItem,
	TextField, Button, Container, Typography } from "@mui/material";
import styled from "@emotion/styled";
import React from "react";

//stores the options for the dropdown lists
const roles = ["Admin", "Student"];
const regions = ["London", "West Midlands", "Scotland", "Manchester"];
const classes = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"];

const RegisterContainer = styled(Container)({
	background: "#fafafa",
    width: "max-content",
    padding: "30px 50px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
});
const RegisterButton = styled(Button)({
	marginTop: "10px",
});

const RegisterForm = () => {
    //states for the options in the dropdown lists
    const [role, setRole] =React.useState("");
    const [region, setRegion] = React.useState("");
    const [classNr, setClassNr] = React.useState("");

    //events for updating the value of the selected options
    const handleChangeRole = (event) => {
        setRole(event.target.value);
    };
    const handleChangeRegion = (event) => {
        setRegion(event.target.value);
    };
    const handleChangeClass = (event) => {
        setClassNr(event.target.value);
    };

    return (
			<RegisterContainer disableGutters={true}>
				<Typography variant="h4" align="center">
					Register
				</Typography>
				<FormControl margin="dense">
					{/* field for name */}
					<TextField id="name" label="Name" margin="dense" />

					{/* field for email */}
					<TextField id="email" label="Email" type="email" margin="dense" />

					{/* dropdown to select the role */}
					<TextField
						id="role"
						select
						label="Role"
						margin="dense"
						value={role}
						onChange={handleChangeRole}
					>
						{/* populate the roles dropdown with options */}
						{roles.map((option, index) => (
							<MenuItem key={index} value={option}>
								{option}
							</MenuItem>
						))}
					</TextField>

					{/* dropdown to select the region */}
					<TextField
						id="region"
						select
						label="Region"
						margin="dense"
						value={region}
						onChange={handleChangeRegion}
					>
						{/* populate the regions dropdown with different options */}
						{regions.map((option, index) => (
							<MenuItem key={index} value={option}>
								{option}
							</MenuItem>
						))}
					</TextField>

					{/* dropdown to select the class */}
					<TextField
						id="class"
						select
						label="Class"
						margin="dense"
						value={classNr}
						onChange={handleChangeClass}
					>
						{/* populate the classes dropdown with different options */}
						{classes.map((option, index) => (
							<MenuItem key={index} value={option}>
								{option}
							</MenuItem>
						))}
					</TextField>

					{/* Field for password */}
					<TextField
						id="password"
						label="Password"
						type="password"
						margin="dense"
					/>

					{/* Field for retyping password */}
					<TextField
						id="retype-password"
						label="Retype Password"
						type="password"
						margin="dense"
					/>

					<RegisterButton variant="contained" size="medium">
						Register
					</RegisterButton>
				</FormControl>
			</RegisterContainer>
		);
};

export default RegisterForm;