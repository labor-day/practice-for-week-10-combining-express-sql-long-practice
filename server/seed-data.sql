-- BASIC PHASE 1A - DROP and CREATE table
-- Your code here
DROP TABLE IF EXISTS trees;

-- BASIC PHASE 1B - INSERT seed data
-- Your code here

CREATE TABLE trees(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tree VARCHAR(32),
  location VARCHAR(64),
  height_ft FLOAT,
  ground_circumference_ft FLOAT
);

INSERT INTO
TREES (tree, location, height_ft, ground_circumference_ft)
VALUES
('General Sherman', 'Sequoia National Park', 274.9, 102.6),
('General Grant', 'Kings National Park', 268.1, 107.5),
('President', 'Sequioa National Park', 240.9, 93.0),
('Lincoln', 'Sequioa National Park', 255.8, 98.3),
('Stagg', 'Private Land', 243.0, 109.0);
