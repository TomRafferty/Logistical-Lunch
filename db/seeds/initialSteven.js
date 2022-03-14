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

  const user = {
    user_name: "Steven",
    user_email: "initialSteven@steve.com",
    is_admin: false,
    is_lunch_maker: false,
    is_lunch_shopper: false,
    user_location: "Steveville",
    cohort_id: 1,
    user_password: "steveIsTheBest123",
  };

  await knex("cohort").del();
  await knex("users").del();
  await knex("cohort").insert(cohort);
  await knex("users").insert(user);
};
