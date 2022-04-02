import { Router } from "express";
import pool, { knex } from "../db";
const router = Router("nodemailer");

//lunchRequest
router.post("/dietary", async (req, res) => {
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

// endpoint for getting dietary information for cohort
router.get("/dietary",(req,res)=> {
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

export { router };