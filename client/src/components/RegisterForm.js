import {
	FormControl,
	MenuItem,
	TextField,
	Button,
	Typography,
	Container,
} from "@mui/material";
import styled from "@emotion/styled";
import React from "react";

//stores the options for the dropdown lists
const roles = ["Admin", "Student"];
const regions = ["London", "West Midlands", "Scotland", "Manchester"];
const classes = [
	"1",
	"2",
	"3",
	"4",
	"5",
	"6",
	"7",
	"8",
	"9",
	"10",
	"11",
	"12",
	"13",
	"14",
	"15",
];

//Applying styles to elements
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

//Register Form Component
const RegisterForm = () => {

	//states for storing the values of the inputs
	const [formData, setFormData] = React.useState({
		name: "",
		email: "",
		role: "",
		region: "",
		classNr: "",
		password: "",
		retypedPassword: "",
	});

	//states for form inputs errors
	const [nameError, setNameError] = React.useState(false);
	const [emailError, setEmailError] = React.useState(false);
	const [roleError, setRoleError] = React.useState(false);
	const [regionError, setRegionError] = React.useState(false);
	const [classNrError, setClassNrError] = React.useState(false);
	const [passwordError, setPasswordError] = React.useState(false);
	const [retypedPasswordError, setRetypedPasswordError] = React.useState(false);

	//functions to validate form inputs
	const isNameValid = (name) => (name.length < 3 ? false : true);

	const isEmailValid = (email) => {
		const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
		return emailRegex.test(email) ? true : false;
	};

	const isSelectFieldValid = (value) => (value.length < 1 ? false : true);

	const isPasswordValid = (password) => (password.length < 5 ? false : true);

	const isRetypedPasswordValid = (retypedPassword) =>
		formData.password == retypedPassword && retypedPassword.length > 5
			? true
			: false;

	//calling all the validation functions in order to set the states for errors
	//returning a boolean so I can do a general validation when the user try to submit the form
	const areTheFieldsValid = () => {
		isNameValid(formData.name) ? setNameError(false) : setNameError(true);
		isEmailValid(formData.email) ? setEmailError(false) : setEmailError(true);
		isSelectFieldValid(formData.role)
			? setRoleError(false)
			: setRoleError(true);
		isSelectFieldValid(formData.region)
			? setRegionError(false)
			: setRegionError(true);
		isSelectFieldValid(formData.classNr)
			? setClassNrError(false)
			: setClassNrError(true);
		isPasswordValid(formData.password)
			? setPasswordError(false)
			: setPasswordError(true);
		isRetypedPasswordValid(formData.retypedPassword)
			? setRetypedPasswordError(false)
			: setRetypedPasswordError(true);

		return (
			isNameValid(formData.name) &&
			isEmailValid(formData.email) &&
			isSelectFieldValid(formData.role) &&
			isSelectFieldValid(formData.region) &&
			isSelectFieldValid(formData.classNr) &&
			isPasswordValid(formData.password) &&
			isRetypedPasswordValid(formData.retypedPassword)
		);
	};

	//event for storing the input values in the formData state
	const handleChangeInput = (event) => {
		const objectKey = event.target.name;
		const objectValue = event.target.value;
		setFormData({ ...formData, [objectKey]: objectValue });
	};

	//submit form event
	const handleSubmit = () => {
		if (!areTheFieldsValid()) {
			return;
		} else {
			fetch("http://localhost:3100/api/register", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formData),
			})
				.then((res) => res.json())
				.then((data) => {
					if (data.msg == "Register successful" && formData.role == "Student") {
						sessionStorage.setItem("userType", "student");
						alert(
							"Your account was created successfully. You can now login."
						);
					} else if (data.msg == "Register successful" && formData.role == "Admin") {
						sessionStorage.setItem("userType", "admin");
						alert("Your account was created successfully. You can now login.");
					} else {
						alert(data.msg);
					}
				})
				.catch((err) => console.log(err));
		}
	};

	return (
		<RegisterContainer disableGutters={true}>
			<Typography variant="h4" align="center">
				Register
			</Typography>
			<FormControl margin="dense">
				{/* field for name */}
				<TextField
					id="name"
					name="name"
					label="Name"
					margin="dense"
					value={formData.name}
					onChange={handleChangeInput}
					error={nameError}
					autoComplete="off"
				/>

				{/* field for email */}
				<TextField
					id="email"
					name="email"
					label="Email"
					type="email"
					margin="dense"
					value={formData.email}
					onChange={handleChangeInput}
					error={emailError}
					autoComplete="off"
				/>

				{/* dropdown to select the role */}
				<TextField
					id="role"
					name="role"
					select
					label="Role"
					margin="dense"
					value={formData.role}
					onChange={handleChangeInput}
					error={roleError}
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
					name="region"
					select
					label="Region"
					margin="dense"
					value={formData.region}
					onChange={handleChangeInput}
					error={regionError}
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
					name="classNr"
					select
					label="Class"
					defaultValue=""
					margin="dense"
					value={formData.classNr}
					onChange={handleChangeInput}
					error={classNrError}
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
					name="password"
					label="Password"
					type="password"
					margin="dense"
					value={formData.password}
					onChange={handleChangeInput}
					error={passwordError}
				/>

				{/* Field for retyping password */}
				<TextField
					id="retype-password"
					name="retypedPassword"
					label="Retype Password"
					type="password"
					margin="dense"
					value={formData.retypedPassword}
					onChange={handleChangeInput}
					error={retypedPasswordError}
				/>

				<RegisterButton
					type="submit"
					variant="contained"
					size="medium"
					onClick={handleSubmit}
				>
					Register
				</RegisterButton>
			</FormControl>
		</RegisterContainer>
	);
};

export default RegisterForm;
