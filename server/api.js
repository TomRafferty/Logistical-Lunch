import { Router } from "express";
import { knex } from "./db";
import pool from "./db";
import fetch from "node-fetch";
const bcrypt = require("bcrypt");
const router = Router("nodemailer");

router.get("/", (_, res) => {
	res.json({ message: "Hello, world!" });
});

router.post("/lunchMakerInfo", (req, res) => {
	let lunchMakerInfo = {};
	const currentCohort = req.body.cohort_id;
	pool
		// just for ease I add both allergies and diets to the same area, we can split this later if we have time
		.query(
			`
			SELECT a.allergy_name
			FROM allergies AS a
			INNER JOIN dietary_restrictions AS dr
			ON dr.allergen_id = a.id
			INNER JOIN users AS u
			ON u.id = dr.user_id
			WHERE u.cohort_id=$1
		`,
			[currentCohort]
		)
		.then((response) => {
			// map allergies
			lunchMakerInfo["allergies"] = response.rows.map((allergy) => {
				return allergy.allergy_name;
			});
			pool
				.query(
					`
						SELECT lr.requirement_name
						FROM lunch_requirements AS lr
						INNER JOIN dietary_requirements AS dr
						ON lr.id = dr.requirement_id
						INNER JOIN users AS u
						ON u.id = dr.user_id
						WHERE u.cohort_id = $1
					`,
					[currentCohort]
				)
				.then((response) => {
					// map requirements
					lunchMakerInfo["allergies"].push(response.rows.map((requirement) => {
						return requirement.requirement_name;
					}));

					pool
						.query(
							`
								SELECT u.user_name
								FROM users AS u
								WHERE is_lunch_shopper=true AND cohort_id=$1
							`,
							[currentCohort]
						)
						.then((response) => {
							if (response.rowCount === 0) {
								// shopper not set.
								lunchMakerInfo["lunchShopper"] = "Shopper not yet chosen.";
							} else {
								// shopper set.
								lunchMakerInfo["lunchShopper"] = response.rows[0];
							}
							pool
								.query(
									`
								SELECT e.diners
								FROM events AS e
								WHERE cohort_id=$1
							`,
									[currentCohort]
								)
								.then((response) => {
									lunchMakerInfo["numDiners"] = response.rows[0];
									res.json(lunchMakerInfo);
								})
								.catch((error) => {
									console.log("failed on diner collection");
									console.error(error);
									res.status(error.status).send(error);
								});
						})
						.catch((error) => {
							console.log("failed on shopper collection");
							console.error(error);
							res.status(error.status).send(error);
						});
				})
				.catch((error) => {
					console.log("failed on requirement collection");
					console.error(error);
					res.status(error.status).send(error);
				});
		})
		.catch((error) => {
			console.log("failed on allergy collection");
			console.error(error);
			res.status(error.status).send(error);
		});
});

//login
router.post("/login", async (req, res) => {
	const { email, password } = req.body;
	pool
		.query(
			`
			SELECT * 
			FROM users 
			WHERE user_email=$1
			`,
			[email]
		)
		.then((response) => {
			bcrypt.compare(
				password,
				response.rows[0].user_password,
				function (err, result) {
					if(result){
						//success
						pool.query(
							`SELECT * 
							FROM users 
							WHERE user_email=$1`,
							[email]
						)
						.then((userInfo) => {
							res.json(userInfo.rows);
						})
						.catch((error) => {
							console.error(error);
							res.status(error.status).send(error);
						});
					}else{
						//failure
						res.status(400).send("Email or password incorrect");
					}
				}
			);
		})
		.catch((error) => {
			console.error(error);
			res.status(error.status).send(error);
		});
});

// endpoint to update location
router.put("/users/location", (req, res) => {
	const location = req.body.location;
	const id = req.body.id;
	if (!location) {
		res.status(400).json({ msg: "Please provide a location" });
	}
	const locationQuery = "UPDATE users SET user_location=$1 WHERE id=$2";
	pool
		.query(locationQuery, [location, id])
		.then(() => {
			res.json({ msg: "user location updated" });
		})
		.catch((error) => {
			console.error(error);
			res.status(500).json(error);
		});
});

// endpoint to update chosen travel type
router.put("/users/transport", (req, res) => {
	const transport = req.body.transport;
	const id = req.body.id;
	if (!transport) {
		res.status(400).json({ msg: "Please provide a transport option" });
	}
	const locationQuery = "UPDATE users SET transport_type=$1 WHERE id=$2";
	pool
		.query(locationQuery, [transport, id])
		.then(() => {
			res.json({ msg: "transport_type updated" });
		})
		.catch((error) => {
			console.error(error);
			res.status(500).json(error);
		});
});





//  endpoint for event details for shopper
router.get("/events/shopper", (req, res) => {
	const shopPerson = parseInt(req.query.shopperId);
	console.log(shopPerson);
	const shopperQuery =
		`
			SELECT 
				events.id, meeting_location, meeting_postcode,
				meeting_address, meeting_city, meeting_start,
				meeting_end, break_time, lunch_maker_id,
				lunch_shopper_id, diners, recipe_id,
				events.cohort_id, user_name,
				user_email, recipes.ingredients, recipes.recipe_name, recipes.servings
			FROM events 
			INNER JOIN recipes 
				ON events.recipe_id=recipes.id 
			INNER JOIN users
				ON events.lunch_maker_id=users.id 
			WHERE events.lunch_shopper_id=$1
		`;
	pool
		.query(shopperQuery, [shopPerson])
		.then((response) => res.json(response.rows))
		.catch((error) => {
			console.error(error);
			res.status(500).json(error);
		});
});

router.get("/events/next", (req,res)=> {
    const cohortId = req.query.cohId;
	const eventQuery =
		`
			SELECT 
				events.id, meeting_location, meeting_postcode,
				meeting_address, meeting_city, meeting_start,
				meeting_end, break_time, lunch_maker_id, recipe_id,
				cohort_id, class_number, region 
			FROM events 
			INNER JOIN cohort 
				ON events.cohort_id=cohort.id
			WHERE events.cohort_id=$1
		`;

		// AND meeting_end BETWEEN NOW() + INTERVAL '21 days';

	pool.query(eventQuery,[cohortId])
	.then((response)=>res.json(response.rows))
	.catch((error)=>{
		console.error(error);
		res.status(500).json(error);
	});

});

router.get("/events/get/:cohortId", (req, res) => {
	pool
		.query(
			`
				SELECT * FROM events WHERE cohort_id=$1
			`,
			[req.params.cohortId]
		)
		.then((response) => {
			res.json(response.rows);
		})
		.catch((error) => {
			console.error(error);
			res.status(error.status).send(error);
		});
});

//endpoint to get user by id
router.get("/users/:id", (req,res)=> {
	const userId = req.params.id;

	const userQuery = "SELECT * FROM users WHERE id=$1";
	pool.query(userQuery,[userId])
	.then((response)=>res.json(response.rows))
	.catch((error)=>{
		console.error(error);
		res.status(500).json(error);
	});
});

//endpoint to get user by cohort_id
router.get("/users/cohort/:cohortId", async (req, res) => {
	const cohortId = req.params.cohortId;
	const cohortUsers = await knex.select("id", "user_name", "is_lunch_maker", "is_lunch_shopper")
		.from("users")
		.where({ "cohort_id": cohortId, "is_admin": false });

	if(cohortUsers.length > 0) {
		res.status(201).json(cohortUsers);
	}else{
		res.status(401).json({ msg: "There was a problem please try again later" });
	}
});

//endpoint to get the history of all the lunch makers assigned in the past
router.get("/history/lunchMaker/:cohortId", async (req, res) => {
	const cohortId = req.params.cohortId;
	const historyLunchMaker = await knex("lunch_maker_history").where("cohort_id", cohortId);

	if (historyLunchMaker.length > 0) {
		res.status(201).json(historyLunchMaker);
	} else {
		res.status(401).json({ msg: "There was a problem please try again later" });
	}
});

//endpoint to get the history of all the lunch shoppers assigned in the past
router.get("/history/lunchShopper/:cohortId", async (req, res) => {
	const cohortId = req.params.cohortId;
	const historyLunchShopper = await knex("lunch_shopper_history").where("cohort_id", cohortId);

	if (historyLunchShopper.length > 0) {
		res.status(201).json(historyLunchShopper);
	}else{
		res.status(401).json({ msg: "There was a problem please try again later" });
	}
});

//endpoint to update the is_lunch_maker value for a specific user
router.post("/lunchMaker", async (req, res) => {
	const lunchMakerId = req.body.lunchMakerId;
	const lunchMakerName = req.body.lunchMakerName;
	const cohortId = req.body.cohortId;
	try {
		await knex.transaction(async (trx) => {
			//overwriting all the previous is_lunch_maker values to false
			await trx("users").update("is_lunch_maker", false);

			//updating only a specific is_lunch_maker value to true
			await trx("users").update("is_lunch_maker", true).where("id", lunchMakerId);

			//inserted the nominated lunch_maker name and date into the lunch_maker_history table
			await trx("lunch_maker_history").insert({
				lunch_maker_name: lunchMakerName, created_on: "NOW()", cohort_id: cohortId,
			});

			//update the nominated lunch maker id into the events table
			await trx("events").update("lunch_maker_id", lunchMakerId).where("cohort_id", cohortId);
			res
			.status(201)
			.json({ msg: "The lunch maker was nominated successfully" });
		});
	} catch (error) {
		res.status(500).json({ msg: "Something went wrong. Please try again later!" });
	}
});

//endpoint to update the is_lunch_shopper value for a specific user
router.post("/lunchShopper", async (req, res) => {
	const lunchShopperId = req.body.lunchShopperId;
	const lunchShopperName = req.body.lunchShopperName;
	const cohortId = req.body.cohortId;
	try {
		await knex.transaction(async (trx) => {
			//overwriting all the previous is_lunch_shopper values to false
			await trx("users").update("is_lunch_shopper", false);

			//updating only a specific is_lunch_shopper value to true
			await trx("users")
				.update("is_lunch_shopper", true)
				.where("id", lunchShopperId);

			//inserted the nominated lunch_shopper name and date into the lunch_shopper_history table
			await trx("lunch_shopper_history").insert({
				lunch_shopper_name: lunchShopperName,
				created_on: "NOW()",
				cohort_id: cohortId,
			});

			//update the nominated lunch shopper id into the events table
			await trx("events")
				.update("lunch_shopper_id", lunchShopperId)
				.where("cohort_id", cohortId);
			res
				.status(201)
				.json({ msg: "The lunch shopper was nominated successfully" });
		});
	} catch (error) {
		res.status(500).json({ msg: "Something went wrong. Please try again later!" });
	}
});

// endpoint for register form
router.post("/register", async (req, res) => {
	const { name, email, region, classNr, password } = req.body;
	const role = req.body.role == "Admin" ? true : false;
	const isLunchMaker = false;
	const isLunchShopper = false;

	//hashing the password
	const saltRounds = 10;
	const salt = await bcrypt.genSalt(saltRounds);
	const encryptedPassword = await bcrypt.hash(password, salt);

	//get the cohortId from cohort table
	const getCohortId =
		"Select id FROM cohort WHERE class_number = $1 AND region = $2";

	const cohortId = await pool
		.query(getCohortId, [classNr, region])
		.then((result) => result.rows[0].id);

	//check if email is already used
	pool
		.query("SELECT * FROM users WHERE user_email = $1", [email])
		.then((result) => {
			if (result.rows.length > 0) {
				return res
					.status(409)
					.json({ msg: "This email address already has an account" });
			}else{
				//if email is not already used, insert new user to the users table
				const query =
					`
						INSERT INTO 
							users (user_name, user_email, is_admin, is_lunch_maker, is_lunch_shopper, user_password, cohort_id)
						VALUES ($1, $2, $3, $4, $5, $6, $7)
					`;
				pool
					.query(query, [
						name,
						email,
						role,
						isLunchMaker,
						isLunchShopper,
						encryptedPassword,
						cohortId,
					])
					.then(() => res.json({ msg: "Register successful" }))
					.catch(() => res.status(400).json({ msg: "Unsuccessful. Please try again later" }));
			}
		});

});

//lunchRequest
router.post("/lunch/dietary", async (req, res) => {
	const {
		dietaryRestrictions,
		dietaryRequirements,
		otherDietaryRestrictions,
		userId,
		cohortId,
	} = req.body;

	try {
		await knex.transaction(async (trx) => {
			//updating the numbers of meals
			const diners = await trx("events")
				.select("diners")
				.where("cohort_id", cohortId);

			await trx("events")
				.update("diners", diners[0].diners + 1)
				.where("cohort_id", cohortId);

			if (otherDietaryRestrictions.length > 0) {
				//INSERT new allergy and GET the otherDietaryRestriction id
				//so we can insert it in the dietary_restrictions table
				const allergyResult = await trx("allergies")
					.insert({ allergy_name: otherDietaryRestrictions })
					.returning("id");

				await trx("dietary_restrictions").insert({
					user_id: userId,
					allergen_id: allergyResult[0].id,
				});
			}

			if (dietaryRestrictions.length > 0) {
				//GET the allergies ids so we can insert them in the dietary_restrictions table
				const allergiesId = await trx("allergies")
					.select("id")
					.whereIn("allergy_name", dietaryRestrictions);

				//INSERT allergies ids alongside with the userId into the dietary_restrictions table
				const allergiesArray = allergiesId.map((field) => ({
					user_id: userId,
					allergen_id: field.id,
				}));
				await trx("dietary_restrictions").insert(allergiesArray);
			}

			if (dietaryRequirements.length > 0) {
				//GET the lunch requirements ids so we can insert them in the dietary_requirements table
				const dietaryReqIds = await trx("lunch_requirements")
					.select("id")
					.whereIn("requirement_name", dietaryRequirements);

				//INSERT dietaryRequirements id alongside with the userId into the dietary_restrictions table
				const dietaryReqArray = dietaryReqIds.map((field) => ({
					user_id: userId,
					requirement_id: field.id,
				}));
				await trx("dietary_requirements").insert(dietaryReqArray);
			}

			res
				.status(201)
				.json({ msg: "Your lunch request was submitted successfully" });
		});
	} catch (error) {
		res
			.status(401)
			.json({ msg: "Something went wrong. Please try again later!" });
	}
});

//endpoint to get all the recipes and the name of the selected recipe
router.post("/recipes", async (req, res) => {
	const cohortId = req.body.cohortId;
	try{
		await knex.transaction(async (trx) => {
				//get all the recipes
				const recipes = await knex.select().table("recipes");

				//get the selected recipe id for a specific event
				const recipeId = await trx("events")
					.select("recipe_id")
					.where("cohort_id", cohortId);

				//get the name of the selected recipe id
				const nameRecipe = await trx("recipes")
					.select("recipe_name")
					.where("id", recipeId[0].recipe_id)
					.returning("recipe_name");

					res
						.status(201)
						.json({ recipes: recipes, selectedRecipe: nameRecipe[0].recipe_name });
			});
	} catch (error) {
		res.status(500).json({ msg: "There was a problem please try again later" });
	}

});

//endpoint to update the chosen recipe id in the events table;
router.post("/eventRecipeId", async (req, res) => {
	const recipeId = req.body.recipeId;
	const cohortId = req.body.cohortId;
	try {
		//update the recipe_id column
		await knex.transaction(async (trx) => {
			await trx("events")
				.update("recipe_id", recipeId)
				.where("cohort_id", cohortId);

			res.status(201).json({ msg: "Your choice was successfully submitted" });
		});
	} catch (error) {
		res
			.status(500)
			.json({ msg: "Something went wrong. Please try again later!" });
	}
});

// admin create new event
router.post("/createNewEvent", (req, res) => {
	const { location, postcode, address, city, meeting_start, meeting_end, currentCohort } = req.body;
	pool
	.query(
		`
			INSERT INTO 
			events
				(meeting_location, meeting_postcode, meeting_address, meeting_city, meeting_start, meeting_end, cohort_id)
			VALUES
				($1, $2, $3, $4, $5, $6, $7)
		`,
		[location, postcode, address, city, meeting_start, meeting_end, currentCohort]
	)
	.then(() => {
		res.status(200).json({ message:"added new event" });
	})
	.catch((error) => {
		console.error(error);
		res.status(error.status).send(error);
	});
});
router.put("/editEvent", (req, res) => {
	const { location, postcode, address, city, meeting_start, meeting_end, currentCohort } = req.body;
	pool
	.query(
		`
			UPDATE events
			SET meeting_location=$1, meeting_postcode=$2, meeting_address=$3, meeting_city=$4, meeting_start=$5, meeting_end=$6
			WHERE cohort_id=$7
		`,
		[location, postcode, address, city, meeting_start, meeting_end, currentCohort]
	)
	.then(() => {
		res.status(200).json({ message: "successfully updated event" });
	})
	.catch((error) => {
		console.error(error);
		res.status(error.status).send(error);
	});
});

// route to get nearby shops for the users postcode
router.get("/google", (req,res)=> {
	const getLat = req.query.lat;
	const getLong = req.query.long;

	fetch(
		`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${getLat},${getLong}&radius=2000&type=supermarket&key=${process.env.API_KEY}`
	)
		.then((response) => response.json())
		.then((data) => res.json(data))
		.catch(function (error) {
			console.log(error);
		});
	});

// distance matrix endpoint
router.get("/google/distance", (req, res) => {
	const startCoords = req.query.start;
	const endsCoords = req.query.ends;

	fetch(
		`https://maps.googleapis.com/maps/api/distancematrix/json?origins=${startCoords}&destinations=${endsCoords}&key=${process.env.API_KEY}`
	)
		.then((response) => response.json())
		.then((data) => res.json(data))
		.catch(function (error) {
			console.log(error);
});
});

// google matrix endpoint two
router.get("/google/admin", (req, res) => {
	const startCoords = req.query.begin;
	const endsCoords = req.query.finish;
	const transitMode = req.query.transit;
	fetch(
		`https://maps.googleapis.com/maps/api/distancematrix/json?origins=${startCoords}&destinations=${endsCoords}&mode=${transitMode}&key=${process.env.API_KEY}`
	)
		.then((response) => response.json())
		.then((data) => res.json(data))
		.catch(function (error) {
			console.log(error);
		});
});

// endpoint for getting dietary information for cohort
router.get("/lunch/dietary",(req,res)=> {
	const dietCohort = parseInt(req.query.diets);
	const dietArray = [];

	const allergyQuery = "SELECT DISTINCT allergy_name FROM allergies INNER JOIN dietary_restrictions ON allergies.id=dietary_restrictions.allergen_id INNER JOIN users ON dietary_restrictions.user_id=users.id INNER JOIN cohort ON users.cohort_id=cohort.id WHERE cohort.id=$1";

	const lunchQuery = "SELECT DISTINCT requirement_name FROM lunch_requirements INNER JOIN dietary_requirements ON lunch_requirements.id=dietary_requirements.requirement_id INNER JOIN users ON dietary_requirements.user_id=users.id INNER JOIN cohort ON users.cohort_id=cohort.id WHERE cohort.id=$1";


	pool
		.query(allergyQuery, [dietCohort])
		.then((response) => dietArray.push(response.rows))
		.then(() => {
			return pool.query(lunchQuery,[dietCohort]);
		})
		.then((response)=> {
			return dietArray.push(response.rows);
		})
		.then(()=> res.json(dietArray))
		.catch(function (error) {
			console.log(error);
		});
});

router.get("/postcodes", (req, res) => {
	const allPostCodes = parseInt(req.query.codesCohort);
	const postcodeQuery =
		"SELECT user_location, transport_type FROM users WHERE cohort_id=$1";
	pool
		.query(postcodeQuery, [allPostCodes])
		.then((response) => res.json(response.rows))
		.catch(function (error) {
			console.log(error);
		});
});

export default router;