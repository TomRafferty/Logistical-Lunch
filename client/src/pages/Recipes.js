import { Typography, Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import RecipeCard from "../components/RecipeCard";

const Recipes = () => {
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
		<Box sx={{ boxShadow: 3, mx: "auto", my: 6, p: 4, width: "80%" }}>
			<Typography
				variant="h5"
				sx={{ mt: 4, textAlign: "center" }}
			>
				Recipe
			</Typography>
			{selectedRecipeName.length > 0 ? (
				<Typography
					variant="h6"
					sx={{ mt: 4, textAlign: "center", color: "primary.main" }}
				>
					Your choice for this week event is {selectedRecipeName}
				</Typography>
			) : (
				""
			)}
			<Box sx={{ display: "flex", flexWrap: "wrap" }}>
				{recipes.map((recipe, index) => (
					<RecipeCard key={index} recipe={recipe} />
				))}
			</Box>
		</Box>
	);
};

export default Recipes;
