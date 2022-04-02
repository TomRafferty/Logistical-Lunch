import { Router } from "express";
import { knex } from "../db";
const router = Router("nodemailer");

// //endpoint to get user by id
// router.get("/users/:id", (req,res)=> {
// 	const userId = req.params.id;

// 	const userQuery = "SELECT * FROM users WHERE id=$1";
// 	pool.query(userQuery,[userId])
// 	.then((response)=>res.json(response.rows))
// 	.catch((error)=>{
// 		console.error(error);
// 		res.status(500).json(error);
// 	});
// });

//endpoint to get user by cohort_id
// router.get("/users/cohort/:cohortId", async (req, res) => {
// 	const cohortId = req.params.cohortId;
// 	const cohortUsers = await knex.select("id", "user_name", "is_lunch_maker", "is_lunch_shopper")
// 		.from("users")
// 		.where({ "cohort_id": cohortId, "is_admin": false });

// 	if(cohortUsers.length > 0) {
// 		res.status(201).json(cohortUsers);
// 	}else{
// 		res.status(401).json({ msg: "There was a problem please try again later" });
// 	}
// });

//endpoint to get the history of all the lunch makers assigned in the past
router.get("/lunchMaker/:cohortId", async (req, res) => {
	const cohortId = req.params.cohortId;
	const historyLunchMaker = await knex("lunch_maker_history").where("cohort_id", cohortId);

	if (historyLunchMaker.length > 0) {
		res.status(201).json(historyLunchMaker);
	} else {
		res.status(401).json({ msg: "There was a problem please try again later" });
	}
});

//endpoint to get the history of all the lunch shoppers assigned in the past
router.get("/lunchShopper/:cohortId", async (req, res) => {
	const cohortId = req.params.cohortId;
	const historyLunchShopper = await knex("lunch_shopper_history").where("cohort_id", cohortId);

	if (historyLunchShopper.length > 0) {
		res.status(201).json(historyLunchShopper);
	}else{
		res.status(401).json({ msg: "There was a problem please try again later" });
	}
});

export { router };