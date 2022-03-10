INSERT INTO cohort (class_number,region) VALUES (3, 'West Midlands');
INSERT INTO users (user_name,user_email,is_admin,is_lunch_maker,is_lunch_shopper,user_location,cohort_id,user_password) VALUES ('john doe', 'johndoe@mail.com', false, false, false, 'birmingham',1,'password');

-- dietary test:
-- I didn't run the file here to avoid duplicate data but this is what I added through CLI
INSERT INTO users (user_name,user_email,is_admin,is_lunch_maker,is_lunch_shopper,user_location,cohort_id,user_password) VALUES ('sue doe', 'suedoe@mail.com', false, false, false, 'birmingham',1,'password');
INSERT INTO allergies (allergy_name) VALUES ('Some Dietary Requirement');
INSERT INTO dietary_restrictions (user_id, allergen_id) VALUES(2, 1);