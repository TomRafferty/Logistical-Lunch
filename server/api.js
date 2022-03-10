import { Router } from "express";
import query from "./db";

const client = query;

const router = Router();
// const pool =  Pool();

router.get("/", (_, res) => {
	res.json({ message: "Hello, world!" });
});

router.get("/login", (req, res) => {
	const loginObject = req.body;
	client
		.query(
			`
			SELECT * 
			FROM users 
			WHERE user_email=$1 AND user_password=$2
			`,
			[loginObject.email, loginObject.password]
		)
		.then((response) => {
			if(response.rowCount < 1){
				res.status(400).send("Email or password incorrect");
			}else{
				res.send("auth");
			}
		})
		.catch((error) => {
			console.error(error);
			res.status(error.status).send(error);
		});
});

router.get("/events", (req,res)=> {

	// const eventQuery="SELECT meeting_location, meeting_start, meeting_end, meeting_address_1, meeting_city, meeting_postcode FROM events WHERE meeting_end >=current_date AND meeting_end <= current_date + INTERVAL '7 day'";
	const evq = `
				SELECT * 
				FROM events
				`;
	client
	.query(evq)
	.then((result)=>res.json(result))
	.catch((error)=>{
		console.error(error);
		res.status(500).json(error);
	});
});

export default router;
