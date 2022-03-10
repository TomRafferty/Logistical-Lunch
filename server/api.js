import { response, Router } from "express";
import query from "./db";

const router = Router();
const client = query; //just looks a little nicer than query.query

//notes:
/*
- I can't figure out the syntax to do a release.
*/

router.get("/", (_, res) => {
	res.json({ message: "Hello, world!" });
});

//get all users with allergies
router.get("/users/allergies", (_, res) => {
	client
		.query(
			`
			SELECT u.user_name AS name, u.user_email AS email, a.allergy_name AS dietary_restriction
			FROM dietary_restrictions AS d_r
			INNER JOIN users AS u
			ON u.id = d_r.user_id
			INNER JOIN allergies AS a
			ON a.id = d_r.allergen_id
			`
		)
		.then((response) => {
			//check students with dietary restrictions exist
			console.log(response);
			if (response.rowCount < 1) {
				//no students with dietary restrictions found
				res.status(400).send("No students with dietary restrictions found.");
			} else {
				//found students with dietary restrictions
				res.send(response.rows);
			}
		})
		.catch((error) => {
			console.error(error);
			res.status(error.status).send(error);
		});
});

//retrieve user by id
router.get("/users/:userId", (req, res) => {
	const id = req.params.userId;
	client
		.query(
			`
			SELECT * 
			FROM users 
			WHERE id=$1
			`,
			[id]
		)
		.then((response) => {
			//check if user was found:
			if(response.rowCount < 1){
				//user does not exist.
				res.status(400).send(`No user found with id: ${id}`);
			}else{
				//user found
				res.send(response.rows);
			}
		})
		.catch((error) => {
			console.error(error);
			res.status(error.status).send(error);
		});
});

//retrieve all users
router.get("/users", (_, res) => {
	client
		.query("SELECT * FROM users")
		.then((response) => {
			res.send(response.rows);
		})
		.catch((error) => {
			console.error(error);
			res.status(error.status).send(error);
		});
});

export default router;
