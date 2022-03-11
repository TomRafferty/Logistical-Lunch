import { Router } from "express";
// import { Pool } from "pg/lib";
import query from "./db";
const router = Router();
const client = query;

router.get("/", (_, res) => {
	res.json({ message: "Hello, world!" });
});

router.get("/events/next", (req,res)=> {
    // a query
	const eventQuery =
		"SELECT id, meeting_location, meeting_start, meeting_end, meeting_address_1, meeting_city, meeting_postcode FROM events WHERE meeting_end BETWEEN NOW() AND NOW() + INTERVAL '7 day'";

	client.query(eventQuery)
	.then((response)=>res.json(response.rows))
	.catch((error)=>{
		console.error(error);
		res.status(500).json(error);
	});

});

export default router;
