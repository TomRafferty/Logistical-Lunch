import React,{ useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { List, ListItemButton, ListItemText } from "@mui/material";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "background.paper",
	boxShadow: 24,
	p: 4,
	height: "50%",
};

//a modal window that will display a list with all the lunch makers nominated in the past.
const ModalHistory = (props) => {
	//states for displaying a modal window
	const [open, setOpen] = useState(false);

	//states for updating the fetched data
	const [usersHistory, setUsersHistory] = useState([]);

	const cohortId = sessionStorage.getItem("cohortId");

	//event for opening the modal window
	const handleOpen = () => {
		setOpen(true);
		//fetching information (name & date) from a specific table - used 1 prop to make the component reusable
		fetch(`/api/history/${props.userInstance}/${cohortId}`)
			.then((response) => {
				if (response.ok) {
					return response.json();
				}
				throw `${response.status} ${response.statusText}`;
			})
			.then((response) => {
				setUsersHistory(response);
			})
			.catch((error) => {
				console.log("An error occurred:", error);
			});
	};

	//event for closing the modal window
	const handleClose = () => setOpen(false);

	//structure for the content of the modal window
	return (
		<div>
			<Button onClick={handleOpen}>See history</Button>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<Typography id="modal-modal-title" variant="h6" component="h2">
						{props.instance} History
					</Typography>
					<List sx={{ height: "90%", overflowY: "scroll" }}>
						{
							//mapping the array of objects received so we can create a list item for each lunch maker assigned in the past
							usersHistory.map((user, index) => {
								return (
									<ListItemButton key={index}>
										<ListItemText
											primary={user[props.keyName]}
											secondary={new Date(`${user.created_on}`).toDateString()}
										/>
									</ListItemButton>
								);
							})
						}
					</List>
				</Box>
			</Modal>
		</div>
	);
};


export default ModalHistory;
