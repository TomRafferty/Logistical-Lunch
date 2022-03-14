import { Router } from "express";
import pool from "./db";
const bcrypt = require("bcrypt");
const router = Router();

router.get("/", (_, res) => {
	res.json({ message: "Hello, world!" });
});

router.post("/login", async (req, res) => {
	const { email, password } = req.body;

	pool
		.query(
			`
			SELECT user_password 
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
						//res.json({ userType: "student" });
						pool.query(
							`SELECT * 
							FROM users 
							WHERE email=$1`,
							[email]
						)
						.then((userInfo) => {
							res(userInfo.rows);
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
		"SELECT id, meeting_location, meeting_start, meeting_end, meeting_address_1, meeting_city, meeting_postcode FROM events WHERE meeting_end BETWEEN NOW() AND NOW() + INTERVAL '7 day'";

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

export default router;
