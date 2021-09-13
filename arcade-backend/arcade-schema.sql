
CREATE TABLE snake (
  name VARCHAR(25) PRIMARY KEY,
  score INTEGER CHECK (score >= 0 && score <= 160) NOT NULL
);

