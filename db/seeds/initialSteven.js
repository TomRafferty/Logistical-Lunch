/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {

  const cohort = {
    class_number: 1,
    region: "Steveafornia",
  };

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
