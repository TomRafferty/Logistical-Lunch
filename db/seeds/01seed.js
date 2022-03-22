
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {

	const cohort = [
		{ class_number: 1, region: "London" },
		{ class_number: 2, region: "London" },
		{ class_number: 3, region: "London" },
		{ class_number: 4, region: "London" },
		{ class_number: 5, region: "London" },
		{ class_number: 6, region: "London" },
		{ class_number: 7, region: "London" },
		{ class_number: 8, region: "London" },
		{ class_number: 9, region: "London" },
		{ class_number: 10, region: "London" },
		{ class_number: 11, region: "London" },
		{ class_number: 12, region: "London" },
		{ class_number: 13, region: "London" },
		{ class_number: 14, region: "London" },
		{ class_number: 15, region: "London" },
		{ class_number: 1, region: "West Midlands" },
		{ class_number: 2, region: "West Midlands" },
		{ class_number: 3, region: "West Midlands" },
		{ class_number: 4, region: "West Midlands" },
		{ class_number: 5, region: "West Midlands" },
		{ class_number: 6, region: "West Midlands" },
		{ class_number: 7, region: "West Midlands" },
		{ class_number: 8, region: "West Midlands" },
		{ class_number: 9, region: "West Midlands" },
		{ class_number: 10, region: "West Midlands" },
		{ class_number: 11, region: "West Midlands" },
		{ class_number: 12, region: "West Midlands" },
		{ class_number: 13, region: "West Midlands" },
		{ class_number: 14, region: "West Midlands" },
		{ class_number: 15, region: "West Midlands" },
		{ class_number: 1, region: "Manchester" },
		{ class_number: 2, region: "Manchester" },
		{ class_number: 3, region: "Manchester" },
		{ class_number: 4, region: "Manchester" },
		{ class_number: 5, region: "Manchester" },
		{ class_number: 6, region: "Manchester" },
		{ class_number: 7, region: "Manchester" },
		{ class_number: 8, region: "Manchester" },
		{ class_number: 9, region: "Manchester" },
		{ class_number: 10, region: "Manchester" },
		{ class_number: 11, region: "Manchester" },
		{ class_number: 12, region: "Manchester" },
		{ class_number: 13, region: "Manchester" },
		{ class_number: 14, region: "Manchester" },
		{ class_number: 15, region: "Manchester" },
		{ class_number: 1, region: "Scotland" },
		{ class_number: 2, region: "Scotland" },
		{ class_number: 3, region: "Scotland" },
		{ class_number: 4, region: "Scotland" },
		{ class_number: 5, region: "Scotland" },
		{ class_number: 6, region: "Scotland" },
		{ class_number: 7, region: "Scotland" },
		{ class_number: 8, region: "Scotland" },
		{ class_number: 9, region: "Scotland" },
		{ class_number: 10, region: "Scotland" },
		{ class_number: 11, region: "Scotland" },
		{ class_number: 12, region: "Scotland" },
		{ class_number: 13, region: "Scotland" },
		{ class_number: 14, region: "Scotland" },
		{ class_number: 15, region: "Scotland" },
	];

	const allergies = [
		{ allergy_name: "milk" },
		{ allergy_name: "eggs" },
		{ allergy_name: "peanuts" },
		{ allergy_name: "fish" },
		{ allergy_name: "soy" },
		{ allergy_name: "wheat" },
	];

	const lunchRequirements = [
		{ requirement_name: "vegetarian" },
		{ requirement_name: "vegan" },
		{ requirement_name: "halal" },
		{ requirement_name: "diabetic" },
	];
    const [id] = await knex("users").where("user_name", "maria");
	console.log(id);
	const someEvents = [
		{ meeting_location: "The BOM", meeting_postcode: "TF1 2BT", meeting_address: "Some place", meeting_city: "Telford", meeting_start: "2022-03-22 11:00:00", meeting_end: "2022-3-22 16:30:00",break_time: "2022-03-22 11:00:00", lunch_maker_id: id, lunch_shopper_id: id, diners: 0  },
	];

	// const dietaryRequirements = [
	// 	{ user_id: "1", requirement_id: "1" },
	// 	{ user_id: "2", requirement_id: "2" },
	// 	{ user_id: "3", requirement_id: "3" },
	// ];

	// const dietaryRestrictions = [
	// 	{ user_id: "1", allergen_id: "1" },
	// 	{ user_id: "2", allergen_id: "2" },
	// 	{ user_id: "3", allergen_id: "3" },
	// ];

  await knex("users").del();
  await knex("events").del();
  await knex("cohort").del();

//   await knex("dietary_restrictions").del();
//   await knex("dietary_requirements").del();
  await knex("lunch_requirements").del();
  await knex("allergies").del();
  await knex("cohort").insert(cohort);
  await knex("allergies").insert(allergies);
  await knex("lunch_requirements").insert(lunchRequirements);
  await knex("events").insert(someEvents);
//   await knex("dietary_requirements").insert(dietaryRequirements);
//   await knex("dietary_restrictions").insert(dietaryRestrictions);

};
