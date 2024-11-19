CREATE TABLE "User" (
    userid SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    height INT NOT NULL,
    mot_lvl VARCHAR(10) CHECK (mot_lvl IN ('low', 'medium', 'high')),
    avg_standing_hrs INT,
    times_moved INT,
    calories_burned INT
    );

CREATE TABLE Profile (
    profileid SERIAL PRIMARY KEY,
    userid INT NOT NULL,
    title VARCHAR(255),
    deskHeight INT NOT NULL,
    timer_standing INT NOT NULL,
    timer_sitting INT NOT NULL,
    FOREIGN KEY (userid) REFERENCES "User"(userid)
);

CREATE TABLE Manager (
    managerid SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL
);

INSERT INTO "User" (username, "password", email, height, mot_lvl) VALUES 
    ('user1', 'password1', 'user1@gmail.com', 180, 'low'),
    ('user2', 'password2', 'user2@gmail.com', 150, 'low');
