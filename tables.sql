CREATE TABLE todos(
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(80) NOT NULL DEFAULT '',
  priority INT NOT NULL DEFAULT 0,
  text TEXT NOT NULL DEFAULT '',
  user_id INT,
  INDEX user_id(`user_id`)
);

CREATE TABLE users(
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(32),
  password_hash VARCHAR(256),
  UNIQUE KEY username(`username`)
);
