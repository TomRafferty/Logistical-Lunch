import { Typography, Box, Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import LunchMakerGuide from "../components/LunchMakerGuide";
import LunchMakerInformation from "../components/LunchMakerInformation";
import RecipeCard from "../components/RecipeCard";


const LunchMaker = () => {
	//state to update the recipes
	const [recipes, setRecipes] = useState([]);

	//states to update the chosen recipe name
    const [selectedRecipeName, setSelectedRecipeName] = useState("");


	//fetching all the recipes and the name of the chosen recipe
	useEffect(() => {
		fetch("http://localhost:3000/api/recipes", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					cohortId: sessionStorage.getItem("cohortId"),
				}),
            })
			.then((response) => {
				if (response.ok) {
					return response.json();
				}
				throw `${response.status} ${response.statusText}`;
			})
			.then((response) => {
				setRecipes(response.recipes);
				setSelectedRecipeName(response.selectedRecipe);
			})
			.catch((error) => {
				console.log("An error occurred:", error);
			});
	}, []);


	return (
		<Grid>
			<LunchMakerGuide />
			<Box sx={{ boxShadow: 3, mx: "auto", my: 6, p: 4, width: "80%" }}>
				<LunchMakerInformation />
			</Box>

			<Box sx={{ boxShadow: 3, mx: "auto", my: 6, p: 4, width: "80%" }}>
				<Typography
					sx={{ textAlign: "center", fontSize: "20px", fontWeight: "bold" }}
				>
					Recipes
				</Typography>
				{selectedRecipeName.length > 0 ? (
					<Typography sx={{ mt: 2, textAlign: "center", fontWeight: "bold" }}>
						Your choice for this week event is:
						<Typography
							component="span"
							sx={{ color: "primary.main", m: "5px" }}
						>
							{selectedRecipeName}
						</Typography>
					</Typography>
				) : (
					""
				)}
				<Box
					sx={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start" }}
				>
					{recipes.map((recipe, index) => (
						<RecipeCard key={index} recipe={recipe} />
					))}
				</Box>
			</Box>
		</Grid>
	);
};

export default LunchMaker;
