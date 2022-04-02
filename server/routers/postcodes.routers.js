import { Router } from "express";
import pool from "../db";
import fetch from "node-fetch";
const router = Router("nodemailer");

router.get("/", (req, res) => {
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

router.get("/validate/:newLocal", async (req, res) => {
	const validate = await fetch(
		`https://api.postcodes.io/postcodes/${req.params.newLocal}/validate`
	);
	const data = await validate.json();
	res.json(data);
});

export { router };