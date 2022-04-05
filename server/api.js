import express from "express";
import pool, { knex } from "./db";
import bcrypt from "bcrypt";
import fetch from "node-fetch";
const router = express.Router("nodemailer");
import { router as userRouter } from "./routers/users.routers";
import { router as eventsRouter } from "./routers/events.routers";
import { router as googleRouter } from "./routers/google.routers";
import { router as historyRouter } from "./routers/history.routers";
import { router as postcodeRouter } from "./routers/postcodes.routers";
import { router as lunchRouter } from "./routers/lunch.routers";

router.get("/", (_, res) => {
	res.json({ message: "Hello, world!" });
});

/* contains 4 routers for users:
	-update location
	-update transport
	-get by id
	-get by cohort id
*/
router.use("/users", userRouter);

/* contains 3 routers for events:
	-get shopper
	-get next event
	-get by cohort id
*/
router.use("/events", eventsRouter);

/* contains 3 routers for google:
	-get nearest shops
	-distance matrix endpoint one
	-distance matrix endpoint two
*/
router.use("/google", googleRouter);

/* contains 2 routers for history:
	-lunch maker history
	-lunch shopper history
*/
router.use("/history", historyRouter);

/* contains 2 routers for history:
	-get passed postcode
	-validate postcode
*/
router.use("/postcodes", postcodeRouter);

/* contains 2 routers for history:
	-post new dietary information
	-get new dietary information
*/
router.use("/lunch", lunchRouter);

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
	const { location, postcode, address, city, meeting_start, meeting_end, currentCohort, meeting_date } = req.body;
	console.log(req.body);
	pool
	.query(
		`
			INSERT INTO 
			events
				(meeting_location, meeting_postcode, meeting_address, meeting_city, meeting_start, meeting_end, cohort_id, meeting_date)
			VALUES
				($1, $2, $3, $4, $5, $6, $7, $8)
		`,
		[location, postcode, address, city, meeting_start, meeting_end, currentCohort, meeting_date]
	)
	.then(() => {
		res.status(200).json({ message:"added new event" });
	})
	.catch((error) => {
		console.error(error);
		res.status(500).send(error);
	});
});
router.put("/editEvent", (req, res) => {
	const { location, postcode, address, city, meeting_start, meeting_end, currentCohort, meeting_date } = req.body;
	pool
	.query(
		`
			UPDATE events
			SET meeting_location=$1, meeting_postcode=$2, meeting_address=$3, meeting_city=$4, meeting_start=$5, meeting_end=$6, meeting_date=$7
			WHERE cohort_id=$8
		`,
		[location, postcode, address, city, meeting_start, meeting_end, meeting_date, currentCohort]
	)
	.then(() => {
		res.status(200).json({ message: "successfully updated event" });
	})
	.catch((error) => {
		console.error(error);
		res.status(error.status).send(error);
	});
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

router.get("/postcodes/validate/:newLocal", async (req, res) => {
	const validate = await fetch(
		`https://api.postcodes.io/postcodes/${req.params.newLocal}/validate`
	);
	const data = await validate.json();
	res.json(data);
});
router.post("/postcodes/coordinates", async (req, res) => {
	const postcodes = req.body.postcodes;
	const pcInfo = await fetch("https://api.postcodes.io/postcodes", {
		method: "post",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			postcodes: postcodes,
		}),
	});
	const output = await pcInfo.json();
	res.json(output);
});
router.get("/postcodes/shops/:location", async (req, res) => {
	const location = req.params.location;
	const data = await fetch(`https://api.postcodes.io/postcodes/${location}`);
	const output = await data.json();
	res.json(output);
});

export default router;