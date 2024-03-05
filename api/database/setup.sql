DROP TABLE IF EXISTS flashcard;
DROP TABLE IF EXISTS learn_set;
DROP TABLE IF EXISTS question;
DROP TABLE IF EXISTS quiz;
DROP TABLE IF EXISTS subject;
DROP TABLE IF EXISTS folder;
DROP TABLE IF EXISTS user;

CREATE TABLE user (
    user_id INT GENERATED ALWAYS AS IDENTITY,
    user VARCHAR(255) NOT NULL,
    school_year INT,
    is_teacher BOOLEAN NOT NULL,
    username VARCHAR(50) NOT NULL,
    password CHAR(10) NOT NULL
);

CREATE TABLE subject (
    subject_id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT,
    subject VARCHAR(50) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user (user_id)
);

CREATE TABLE quiz (
    quiz_id INT GENERATED ALWAYS AS IDENTITY,
    subject_id INT NOT NULL,
    quiz_name VARCHAR (255) NOT NULL,
    quiz_description VARCHAR (500) NOT NULL,
    FOREIGN KEY (subject_id) REFERENCES subjects (subject_id)
);

CREATE TABLE question (
    question_id INT GENERATED ALWAYS AS IDENTITY,
    quiz_id INT NOT NULL,
    question VARCHAR (255) NOT NULL,
    good_answer VARCHAR (255) NOT NULL,
    bad_answer1 VARCHAR (255) NOT NULL,
    bad_answer2 VARCHAR (255) NOT NULL,
    bad_answer3 VARCHAR (255) NOT NULL
);

CREATE TABLE folder (
    folder_id INT GENERATED ALWAYS AS IDENTITY,
    folder VARCHAR (50) NOT NULL
);

CREATE TABLE set (
    set_id INT GENERATED ALWAYS AS IDENTITY,
    folder_id INT,
    learn_set VARCHAR (50) NOT NULL
);

CREATE TABLE flashcard (
    flash_id INT GENERATED ALWAYS AS IDENTITY,
    subject_id INT NOT NULL,
    set_id INT,
    user_id INT NOT NULL,
    term VARCHAR (50) NOT NULL,
    definition VARCHAR (255) NOT NULL
);