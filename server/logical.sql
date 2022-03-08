DROP TABLE IF EXISTS users CASCADE; 
DROP TABLE IF EXISTS cohort CASCADE; 
DROP TABLE IF EXISTS events CASCADE; 
DROP TABLE IF EXISTS recipes CASCADE; 
DROP TABLE IF EXISTS dietary_restrictions CASCADE; 
DROP TABLE IF EXISTS allergies CASCADE; 
DROP TABLE IF EXISTS recipe_allergies CASCADE; 

CREATE TABLE cohort(
    id SERIAL PRIMARY KEY,
    class_number INT NOT NULL,
    region VARCHAR(30) NOT NULL
);

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    user_name VARCHAR(60) NOT NULL,
    user_email VARCHAR(256) NOT NULL,
    is_admin BOOLEAN NOT NULL,
    is_lunch_maker BOOLEAN NOT NULL,
    is_lunch_shopper BOOLEAN NOT NULL,
    user_location VARCHAR(120) NOT NULL,
    cohort_id INT REFERENCES cohort(id),
    user_password VARCHAR(10240) NOT NULL
);

CREATE TABLE recipes(
    id SERIAL PRIMARY KEY,
    recipe_name VARCHAR(90) NOT NULL,
    cooking_instructions VARCHAR(600) NOT NULL,
    ingredients VARCHAR(360) NOT NULL,
    servings INT NOT NULL,
    ratings INT NOT NULL,
    difficulty VARCHAR(20) NOT NULL,
    preparation_time INT NOT NULL,
    total_time INT NOT NULL
);

CREATE TABLE events(
    id SERIAL PRIMARY KEY,
    meeting_location VARCHAR(1024),
    meeting_postcode VARCHAR(30),
    meeting_address_1 VARCHAR(1024),
    meeting_city VARCHAR(1024),
    meeting_start TIMESTAMP,
    meeting_end TIMESTAMP,
    break_time TIMESTAMP,
    lunch_maker_id INT REFERENCES users(id), 
    lunch_shopper_id INT REFERENCES users(id),
    budget INT,
    lunchers INT,
    recipe_id INT REFERENCES recipes(id) 
);

CREATE TABLE allergies(
    id SERIAL PRIMARY KEY,
    allergy_name VARCHAR(60) NOT NULL
);

CREATE TABLE dietary_restrictions(
    user_id INT REFERENCES users(id) NOT NULL,
    allergen_id INT REFERENCES allergies(id) NOT NULL
);

CREATE TABLE recipe_allergies(
    recipe_id INT REFERENCES recipes(id) NOT NULL,
    allergy_id INT REFERENCES allergies(id) NOT NULL
);

INSERT INTO cohort (class_number,region) VALUES (3, 'West Midlands');
INSERT INTO users (user_name,user_email,is_admin,is_lunch_maker,is_lunch_shopper,user_location,cohort_id,user_password) VALUES ('john doe', 'johndoe@mail.com', false, false, false, 'birmingham',1,'password');