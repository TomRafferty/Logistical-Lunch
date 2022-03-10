INSERT INTO cohort (class_number,region) VALUES (3, 'West Midlands');
INSERT INTO users (user_name,user_email,is_admin,is_lunch_maker,is_lunch_shopper,user_location,cohort_id,user_password) VALUES ('john doe', 'johndoe@mail.com', false, false, false, 'birmingham',1,'password');
INSERT INTO events (meeting_location, meeting_postcode, meeting_address_1, meeting_city,meeting_start,
meeting_end, break_time, lunch_maker_id, lunch_shopper_id, budget, lunchers, recipe_id) VALUES
('the meeting place', 'B1 1AT', 'some place in brum', ' birmingham','2022-03-11 10:00:00', '2022-03-11 16:30:00', '2022-03-11 13:00:00',1,1,20,30,null);