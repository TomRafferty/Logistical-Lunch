import { Router } from "express";
import { knex } from "./db";
import pool from "./db";
const bcrypt = require("bcrypt");
const router = Router();

router.get("/", (_, res) => {
	res.json({ message: "Hello, world!" });
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
			console.log(response.rows[0].user_password);
			bcrypt.compare(
				password,
				response.rows[0].user_password,
				function (err, result) {
					if(result){
						//success
						res.json(response.rows[0]);
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
router.put("/users/location", (req,res)=>{
    const location = req.body.location;
	const id = req.body.id;
	if(!location) {
		res.status(400).json({ msg: "Please provide a location" });
	}
	const locationQuery = "UPDATE users SET user_location=$1 WHERE id=$2";
	pool.query(locationQuery,[location,id])
	.then(()=>{
	res.json({ msg: "user location updated" });
	}).catch((error)=>{
		console.error(error);
		res.status(500).json(error);
	});
});


router.get("/events/next", (req,res)=> {
    // a query
	const eventQuery =
		"SELECT id, meeting_location, meeting_start, meeting_end, meeting_address, meeting_city, meeting_postcode FROM events WHERE meeting_end BETWEEN NOW() AND NOW() + INTERVAL '7 day'";
	pool.query(eventQuery)
	.then((response)=>res.json(response.rows))
	.catch((error)=>{
		console.error(error);
		res.status(500).json(error);
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
	const cohortUsers = await knex.select("id", "user_name")
		.from("users")
		.where({ "cohort_id": cohortId, "is_admin": false });

	if(cohortUsers.length > 0) {
		res.status(201).json(cohortUsers);
	}else{
		res.status(401).json({ msg: "There was a problem please try again later" });
	}
});

//endpoint to get the history of all the lunch makers assigned in the past
router.get("/history/lunchMaker", async (req, res) => {
	const historyLunchMaker = await knex.select().table("lunch_maker_history");

	if (historyLunchMaker.length > 0) {
		res.status(201).json(historyLunchMaker);
	}else{
		res.status(401).json({ msg: "There was a problem please try again later" });
	}
});

//endpoint to update the is_lunch_maker value for a specific user
router.post("/lunchMaker", async (req, res) => {
	const lunchMakerId = req.body.lunchMakerId;
	const lunchMakerName = req.body.lunchMakerName;
	try {
		await knex.transaction(async (trx) => {
			//overwriting all the previous is_lunch_maker values to false
			await trx("users").update("is_lunch_maker", false);

			//updating only a specific is_lunch_maker value to true
			await trx("users").update("is_lunch_maker", true).where("id", lunchMakerId);

			//inserted the nominated lunch_maker name and date into the lunch_maker_history table
			await trx("lunch_maker_history").insert({ lunch_maker_name: lunchMakerName, created_on: "NOW()" });
			res
			.status(201)
			.json({ msg: "The lunch maker was nominated successfully" });
		});
	} catch (error) {
		res.status(401).json({ msg: "Something went wrong. Please try again later!" });
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
					"INSERT INTO users (user_name, user_email, is_admin, is_lunch_maker, is_lunch_shopper, user_password, cohort_id) VALUES ($1, $2, $3, $4, $5, $6, $7)";
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




export default router;