import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { Typography, Box, List, ListItemButton, ListItemText, Button } from "@mui/material";
import MoreTimeIcon from "@mui/icons-material/MoreTime";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SettingsApplicationsOutlinedIcon from "@mui/icons-material/SettingsApplicationsOutlined";
import LocalDiningOutlinedIcon from "@mui/icons-material/LocalDiningOutlined";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";


//expand box
const ExpandMore = styled((props) => {
	const { expand, ...other } = props;
	return <IconButton {...other} />;
})(({ theme, expand }) => ({
	transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
	marginLeft: "auto",
	transition: theme.transitions.create("transform", {
	duration: theme.transitions.duration.shortest,
	}),
}));

//styling the button
const SubmitButton = styled(Button)({
	marginTop: "10px",
});


const RecipeCard = (props) => {
	//states for expanding the ingredients and cooking instructions section
	const [expanded, setExpanded] = React.useState(false);

	//event for expanding the card
	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	//getting the video id
    const idLength = 11;
    const videoId = props.recipe.video_recipe.split("").splice(-idLength).join("");

	//event submit
    const handleSubmit = (event) => {
		fetch("/api/eventRecipeId", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				recipeId: event.target.name,
				cohortId: sessionStorage.getItem("cohortId"),
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				alert(data.msg);
			})
			.catch((error) => console.log(error));
	};

	return (
		<Card
			sx={{
				boxShadow: 3,
				mx: "auto",
				mt: 6,
				p: 2,
				maxWidth: 370,
				display: "flex",
				flexDirection: "column",
			}}
		>
			<CardHeader
				avatar={
					<Avatar sx={{ bgcolor: "black" }} aria-label="recipe">
						<MenuBookOutlinedIcon />
					</Avatar>
				}
				title={props.recipe.recipe_name}
				subheader={new Date(`${props.recipe.created_at}`).toDateString()}
			/>
			<CardMedia>
				<iframe
					width="100%"
					height="315"
					src={`https://www.youtube.com/embed/${videoId}`}
					title="YouTube video player"
					frameBorder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowFullScreen
				></iframe>
			</CardMedia>

			<CardContent>
				<Typography variant="body2" color="text.secondary" minHeight={100}>
					{props.recipe.description}
				</Typography>
			</CardContent>
			<CardActions disableSpacing>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						mr: 3,
					}}
				>
					<IconButton aria-label="settings applications outlined">
						<SettingsApplicationsOutlinedIcon />
					</IconButton>
					<Typography variant="body2" color="text.secondary">
						Difficulty
					</Typography>
					<Typography variant="body2" color="text.secondary">
						{props.recipe.difficulty}
					</Typography>
				</Box>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						mr: 3,
					}}
				>
					<IconButton aria-label="access time">
						<AccessTimeIcon />
					</IconButton>
					<Typography variant="body2" color="text.secondary">
						Prep time
					</Typography>
					<Typography variant="body2" color="text.secondary">
						{props.recipe.preparation_time}
					</Typography>
				</Box>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						mr: 3,
					}}
				>
					<IconButton aria-label="more time">
						<MoreTimeIcon />
					</IconButton>
					<Typography variant="body2" color="text.secondary">
						Total time
					</Typography>
					<Typography variant="body2" color="text.secondary">
						{props.recipe.total_time}
					</Typography>
				</Box>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<IconButton aria-label="local dining outlined">
						<LocalDiningOutlinedIcon />
					</IconButton>
					<Typography variant="body2" color="text.secondary">
						Servings
					</Typography>
					<Typography variant="body2" color="text.secondary">
						{props.recipe.servings}
					</Typography>
				</Box>
				<ExpandMore
					expand={expanded}
					onClick={handleExpandClick}
					aria-expanded={expanded}
					aria-label="show more"
				>
					<ExpandMoreIcon />
				</ExpandMore>
			</CardActions>
			<Collapse in={expanded} timeout="auto" unmountOnExit>
				<CardContent>
					<Typography
						textAlign="center"
						sx={{ textDecoration: "underline" }}
					>
						Ingredients
					</Typography>
					<List>
						{
							//mapping the array of objects received so we can create a list item for each lunch maker assigned in the past
							props.recipe.ingredients.map((ingredient, index) => {
								return (
									<ListItemButton key={index}>
										<ListItemText primary={ingredient} textAlign="justify" />
									</ListItemButton>
								);
							})
						}
					</List>
					<Typography
						textAlign="center"
						sx={{ textDecoration: "underline" }}
					>
						Cooking Instructions
					</Typography>
					<List>
						{
							//mapping the array of objects received so we can create a list item for each lunch maker assigned in the past
							props.recipe.cooking_instructions.map((step, index) => {
								return (
									<ListItemButton key={index}>
										<ListItemText primary={step} />
									</ListItemButton>
								);
							})
						}
					</List>
				</CardContent>
			</Collapse>
			<SubmitButton
				type="submit"
				variant="contained"
				size="medium"
				onClick={handleSubmit}
				name={props.recipe.id}
			>
				Cook
			</SubmitButton>
		</Card>
	);
};


export default RecipeCard;

