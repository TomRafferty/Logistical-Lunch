import { Router } from "express";
import pool from "./db";
const bcrypt = require("bcrypt");
const router = Router();

const makeArrayUnique = (arr) => {
	// reusable array formatter for ensuring every element only appears once.
	let newArr = [];
	arr.forEach((element) => {
		if(!newArr.includes(element)){
			newArr.push(element);
		}
	});
	return newArr;
};

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
					const allAllergies = lunchMakerInfo["allergies"];
					lunchMakerInfo["allergies"] = makeArrayUnique(allAllergies);

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

router.post("/lunch/dietary", async (req, res) => {
	console.log(req.body);
});


export default router;
