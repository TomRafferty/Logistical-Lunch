import { Router } from "express";
import pool from "../db";
const router = Router("nodemailer");

//  endpoint for event details for shopper
router.get("/shopper", (req, res) => {
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

router.get("/next", (req,res)=> {
    const cohortId = req.query.cohId;
	const eventQuery =
		`
			SELECT 
				events.id, meeting_location, meeting_postcode,
				meeting_address, meeting_city, meeting_start,
				meeting_end, meeting_date, break_time, lunch_maker_id, recipe_id,
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

router.get("/get/:cohortId", (req, res) => {
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

export { router };