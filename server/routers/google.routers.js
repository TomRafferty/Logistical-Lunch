import { Router } from "express";
import fetch from "node-fetch";
const router = Router("nodemailer");

// route to get nearby shops for the users postcode
router.get("/", (req, res) => {
	const getLat = req.query.lat;
	const getLong = req.query.long;

	fetch(
		`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${getLat},${getLong}&radius=2000&type=supermarket&key=${process.env.API_KEY}`
	)
		.then((response) => response.json())
		.then((data) => res.json(data))
		.catch(function (error) {
			console.log(error);
		});
});

// distance matrix endpoint
router.get("/distance", (req, res) => {
	const startCoords = req.query.start;
	const endsCoords = req.query.ends;

	fetch(
		`https://maps.googleapis.com/maps/api/distancematrix/json?origins=${startCoords}&destinations=${endsCoords}&key=${process.env.API_KEY}`
	)
		.then((response) => response.json())
		.then((data) => res.json(data))
		.catch(function (error) {
			console.log(error);
		});
});

// google matrix endpoint two
router.get("/admin", (req, res) => {
	const startCoords = req.query.begin;
	const endsCoords = req.query.finish;
	const transitMode = req.query.transit;
	fetch(
		`https://maps.googleapis.com/maps/api/distancematrix/json?origins=${startCoords}&destinations=${endsCoords}&mode=${transitMode}&key=${process.env.API_KEY}`
	)
		.then((response) => response.json())
		.then((data) => res.json(data))
		.catch(function (error) {
			console.log(error);
		});
});

export { router };