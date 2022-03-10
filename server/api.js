import { Router } from "express";
import query from "./db";

const client = query;

const router = Router();
// const pool =  Pool();

router.get("/", (_, res) => {
	res.json({ message: "Hello, world!" });
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
