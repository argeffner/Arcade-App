
CREATE TABLE snake (
  name VARCHAR(25) PRIMARY KEY,
  score INTEGER CHECK (score >= 0 and score <= 1200) NOT NULL
);

