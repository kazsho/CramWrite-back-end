DROP TABLE IF EXISTS flashcard;
DROP TABLE IF EXISTS learn_set;
DROP TABLE IF EXISTS question;
DROP TABLE IF EXISTS quiz;
DROP TABLE IF EXISTS subject;
DROP TABLE IF EXISTS folder;
DROP TABLE IF EXISTS client;

CREATE TABLE client (
    client_id INT UNIQUE GENERATED ALWAYS AS IDENTITY,
    client VARCHAR(255) NOT NULL,
    is_teacher BOOLEAN NOT NULL,
    username VARCHAR(50) NOT NULL,
    password CHAR(10) NOT NULL
);

CREATE TABLE subject (
    subject_id INT GENERATED ALWAYS AS IDENTITY,
    client_id INT,
    subject VARCHAR(50) NOT NULL,
    PRIMARY KEY (subject_id),
    FOREIGN KEY (client_id) REFERENCES client (client_id)
);

CREATE TABLE quiz (
    quiz_id INT GENERATED ALWAYS AS IDENTITY,
    subject_id INT NOT NULL,
    quiz_name VARCHAR (255) NOT NULL,
    quiz_description VARCHAR (500) NOT NULL,
    PRIMARY KEY (quiz_id),
    FOREIGN KEY (subject_id) REFERENCES subject (subject_id)
);

CREATE TABLE question (
    question_id INT GENERATED ALWAYS AS IDENTITY,
    quiz_id INT NOT NULL,
    question VARCHAR (255) NOT NULL,
    good_answer VARCHAR (255) NOT NULL,
    bad_answer1 VARCHAR (255) NOT NULL,
    bad_answer2 VARCHAR (255) NOT NULL,
    bad_answer3 VARCHAR (255) NOT NULL,
    PRIMARY KEY (question_id),
    FOREIGN KEY (quiz_id) REFERENCES quiz (quiz_id)
);

CREATE TABLE folder (
    folder_id INT UNIQUE GENERATED ALWAYS AS IDENTITY,
    folder VARCHAR (50) NOT NULL
);

CREATE TABLE learn_set (
    set_id INT GENERATED ALWAYS AS IDENTITY,
    folder_id INT,
    learn_set VARCHAR (50) NOT NULL,
    PRIMARY KEY (set_id),
    FOREIGN KEY (folder_id) REFERENCES folder (folder_id)
);

CREATE TABLE flashcard (
    flash_id INT GENERATED ALWAYS AS IDENTITY,
    subject_id INT NOT NULL,
    set_id INT,
    client_id INT NOT NULL,
    term VARCHAR (50) NOT NULL,
    definition VARCHAR (255) NOT NULL,
    PRIMARY KEY (flash_id),
    FOREIGN KEY (subject_id) REFERENCES subject (subject_id),
    FOREIGN KEY (set_id) REFERENCES learn_set (set_id),
    FOREIGN KEY (client_id) REFERENCES client (client_id)    
);

INSERT INTO client (client, is_teacher, username, password) VALUES ('Henrietta', true, 'Henrie91', 'lafosse24!' );

INSERT INTO subject ( client_id, subject) VALUES (1, 'Chemistry');

INSERT INTO quiz ( subject_id, quiz_name, quiz_description) VALUES (1, 'Periodic Table', 'All to know about atomic structure');

INSERT INTO question ( quiz_id, question, good_answer, bad_answer1, bad_answer2, bad_answer3) VALUES ( 1, 'What is an isotope?', 'same number of protons, different number of neutrons', 'same number of protons and different number of electrons', 'same number of neutrons, different number of electrons', 'same number of protons and neutrons');

INSERT INTO folder ( folder ) VALUES ('Science');

INSERT INTO learn_set ( folder_id, learn_set) VALUES (1, 'Science Set');

INSERT INTO flashcard ( subject_id, set_id, client_id, term, definition) VALUES ( 1, 1, 1, 'Atom', 'The basic building block for all matter in the universe');