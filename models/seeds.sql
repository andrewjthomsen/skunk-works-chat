USE exampledb;
INSERT INTO users(username, email, password, createdAt, updatedAt) 
VALUES("Johnny Bravo", "Johnny@me.com", "abcd", current_timestamp(), current_timestamp()); 