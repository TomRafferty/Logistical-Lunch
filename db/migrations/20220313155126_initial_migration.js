require("dotenv").config();
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const addDefaultColumn = (table) => {
	table.timestamps(false, true);
	table.dateTime("deleted_at");
};
exports.up = (knex) => {
	const cohort = knex.schema.createTable("cohort", (table) => {
		table.increments("id").notNullable();
		table.integer("class_number").notNullable();
		table.string("region", 30).notNullable();
		addDefaultColumn(table);
	});
	const users = knex.schema.createTable("users", (table) => {
		table.increments("id").notNullable();
		table.string("user_name", 256).notNullable();
		table.string("user_email", 256).notNullable();
		table.boolean("is_admin").notNullable();
		table.boolean("is_lunch_shopper").notNullable();
		table.boolean("is_lunch_maker").notNullable();
		table.string("user_location", 120);
		table
			.integer("cohort_id")
			.references("id")
			.inTable("cohort")
			.onDelete("cascade");
		table.string("user_password", 10240).notNullable();
		addDefaultColumn(table);
	});
	const recipes = knex.schema.createTable("recipes", (table) => {
		table.increments("id").notNullable();
		table.string("recipe_name", 90).notNullable();
		table.string("cooking_instructions", 1000).notNullable();
		table.string("ingredients", 500).notNullable();
		table.integer("servings").notNullable();
		table.integer("ratings").notNullable();
		table.string("difficulty", 20).notNullable();
		table.string("preparation_time").notNullable();
		table.string("total_time").notNullable();
		addDefaultColumn(table);
	});
	const events = knex.schema.createTable("events", (table) => {
		table.increments("id").notNullable();
		table.string("meeting_location", 1024).notNullable();
		table.string("meeting_postcode", 30).notNullable();
		table.string("meeting_address", 1024).notNullable();
		table.string("meeting_city", 1024).notNullable();
		table.time("meeting_start").notNullable();
		table.time("meeting_end").notNullable();
		table.time("break_time");
		table
			.integer("lunch_maker_id")
			.references("id")
			.inTable("users")
			.onDelete("cascade");
		table
			.integer("lunch_shopper_id")
			.references("id")
			.inTable("users")
			.onDelete("cascade");
		table.integer("diners");
		table
			.integer("recipe_id")
			.references("id")
			.inTable("recipes")
			.onDelete("cascade");
		addDefaultColumn(table);
	});
	const allergies = knex.schema.createTable("allergies", (table) => {
		table.increments("id").notNullable();
		table.string("allergy_name", 120).notNullable();
		addDefaultColumn(table);
	});
	const dietary_restrictions = knex.schema.createTable("dietary_restrictions", (table) => {
		table
			.integer("user_id")
			.references("id")
			.inTable("users")
			.onDelete("cascade");
		table
			.integer("allergen_id")
			.references("id")
			.inTable("allergies")
			.onDelete("cascade");
		addDefaultColumn(table);
	});
	const recipe_allergies = knex.schema.createTable("recipe_allergies", (table) => {
		table
			.integer("recipe_id")
			.references("id")
			.inTable("recipes")
			.onDelete("cascade");
		table
			.integer("allergy_id")
			.references("id")
			.inTable("allergies")
			.onDelete("cascade");
		addDefaultColumn(table);
	});
    return Promise.all([cohort, users, recipes, events, allergies, dietary_restrictions, recipe_allergies]);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async (knex) => {
    await Promise.all([
			"cohort",
			"users",
			"recipes",
			"events",
			"allergies",
			"dietary_restrictions",
			"recipe_allergies",
		].reverse().map((table) => knex.schema.dropTableIfExists(table)));
};
