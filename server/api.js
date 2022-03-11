import { Router } from "express";
import pool from "./db";
const bcrypt = require("bcrypt");

const router = Router();
// const pool =  Pool();

router.get("/", (_, res) => {
	res.json({ message: "Hello, world!" });
});

router.post("/login", (req, res) => {
	const loginObject = req.body;

	//password hashing
	const receivedPassword = loginObject.password;
	const saltRounds = 10;
	const salt = bcrypt.genSaltSync(saltRounds);
	const hash = bcrypt.hashSync(receivedPassword, salt);
	// this wont work on this branch due to the register endpoint not existing
	// so basically I don't have any hashed passwords in my local db.
	pool
		.query(
			`
			SELECT * 
			FROM users 
			WHERE user_email=$1 AND user_password=$2
			`,
			[loginObject.email, hash]
		)
		.then((response) => {
			console.log("time to respond");
			if (response.rowCount < 1) {
				res.status(400).send("Email or password incorrect");
			} else {
				console.log("sending student auth.");
				res.json({ userType: "student" });
			}
		})
		.catch((error) => {
			console.error(error);
			res.status(error.status).send(error);
		}
	);
});

router.get("/events", (req,res)=> {

	// const eventQuery="SELECT meeting_location, meeting_start, meeting_end, meeting_address_1, meeting_city, meeting_postcode FROM events WHERE meeting_end >=current_date AND meeting_end <= current_date + INTERVAL '7 day'";
	const evq = `
				SELECT * 
				FROM events
				`;
	pool
	.query(evq)
	.then((result)=>res.json(result))
	.catch((error)=>{
		console.error(error);
		res.status(500).json(error);
	});
});

export default router;
