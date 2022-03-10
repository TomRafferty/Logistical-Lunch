import { Router } from "express";
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

//retrieve user by id
router.get("/users/:userId", (req, res) => {
	const id = req.params.userId;
	client
		.query("SELECT * FROM users WHERE id=$1",[id])
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

export default router;
