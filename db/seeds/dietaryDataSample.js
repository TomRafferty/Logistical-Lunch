/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
	// Deletes ALL existing entries
	await knex("allergies").del();
	await knex("allergies").insert([{ allergy_name: "Peanut Allergies" }]);
	await knex("allergies").insert([{ allergy_name: "Vegetarian Diet" }]);
	await knex("allergies").insert([{ allergy_name: "Vegan Diet" }]);
	await knex("allergies").insert([{ allergy_name: "Lactose Intolerance" }]);
	await knex("allergies").insert([{ allergy_name: "Gluten Intolerance" }]);
	await knex("allergies").insert([{ allergy_name: "Kosher Diet" }]);
	await knex("allergies").insert([{ allergy_name: "Halal Diet" }]);
	// Deletes ALL existing entries
	await knex("dietary_restrictions").del();
	await knex("dietary_restrictions").insert([{ user_id:5, allergen_id:1 }]);
	await knex("dietary_restrictions").insert([{ user_id:6, allergen_id:3 }]);
	await knex("dietary_restrictions").insert([{ user_id:7, allergen_id:5 }]);
};
