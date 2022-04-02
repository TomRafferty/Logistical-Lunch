import { Router } from "express";
import pool, { knex } from "../db";
const router = Router("nodemailer");

// endpoint to update location
router.put("/location", (req, res) => {
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
router.put("/transport", (req, res) => {
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

//endpoint to get user by id
router.get("/:id", (req, res) => {
	const userId = req.params.id;

	const userQuery = "SELECT * FROM users WHERE id=$1";
	pool
		.query(userQuery, [userId])
		.then((response) => res.json(response.rows))
		.catch((error) => {
			console.error(error);
			res.status(500).json(error);
		});
});

//endpoint to get user by cohort_id
router.get("/cohort/:cohortId", async (req, res) => {
	const cohortId = req.params.cohortId;
	const cohortUsers = await knex
		.select("id", "user_name", "is_lunch_maker", "is_lunch_shopper")
		.from("users")
		.where({ cohort_id: cohortId, is_admin: false });

	if (cohortUsers.length > 0) {
		res.status(201).json(cohortUsers);
	} else {
		res.status(401).json({ msg: "There was a problem please try again later" });
	}
});

export { router };