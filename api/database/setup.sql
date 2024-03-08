DROP TABLE IF EXISTS token;
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
    password CHAR(60) NOT NULL
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
    subject_id INT NOT NULL,
    colour VARCHAR (50) DEFAULT '#BDE1C3',
    PRIMARY KEY (set_id),
    FOREIGN KEY (folder_id) REFERENCES folder (folder_id),
    FOREIGN KEY (subject_id) REFERENCES subject (subject_id)
);

CREATE TABLE flashcard (
    flash_id INT GENERATED ALWAYS AS IDENTITY,
    subject_id INT NOT NULL,
    set_id INT,
    client_id INT NOT NULL,
    term VARCHAR (50) NOT NULL,
    definition VARCHAR (255) NOT NULL,
    colour VARCHAR (50) DEFAULT '#808080',
    PRIMARY KEY (flash_id),
    FOREIGN KEY (subject_id) REFERENCES subject (subject_id),
    FOREIGN KEY (set_id) REFERENCES learn_set (set_id),
    FOREIGN KEY (client_id) REFERENCES client (client_id)    
);

CREATE TABLE token (
    token_id INT GENERATED ALWAYS AS IDENTITY,
    client_id INT NOT NULL,
    token CHAR(36) UNIQUE NOT NULL,
    PRIMARY KEY (token_id),
    FOREIGN KEY (client_id) REFERENCES client ("client_id")
);

INSERT INTO client (client, is_teacher, username, password) VALUES ('Henrietta', true, 'Henrie91', '$2b$10$kTzybm7/ThVab2bsNoVHZeEeghkj.cuXYxfJHlgJilqh2xnum9XOW' );

INSERT INTO subject ( client_id, subject) VALUES (1, 'Chemistry');

INSERT INTO quiz ( subject_id, quiz_name, quiz_description) VALUES (1, 'Periodic Table', 'All to know about atomic structure');
INSERT INTO quiz ( subject_id, quiz_name, quiz_description) VALUES (1, 'World Capitals', 'Capital cities of countries around the world');
INSERT INTO quiz ( subject_id, quiz_name, quiz_description) VALUES (1, 'Geometry', 'Identify geometric principles');
INSERT INTO quiz ( subject_id, quiz_name, quiz_description) VALUES (1, 'World History', 'Identify significant historical events');
INSERT INTO quiz ( subject_id, quiz_name, quiz_description) VALUES (1, 'English Literature', 'Famous authors and their work');

INSERT INTO question ( quiz_id, question, good_answer, bad_answer1, bad_answer2, bad_answer3) VALUES ( 1, 'What is an isotope?', 'same number of protons, different number of neutrons', 'same number of protons and different number of electrons', 'same number of neutrons, different number of electrons', 'same number of protons and neutrons');
INSERT INTO question ( quiz_id, question, good_answer, bad_answer1, bad_answer2, bad_answer3) VALUES ( 2, 'What is the capital of France?', 'Paris', 'Lagos', 'Cannes', 'Cape Town');
INSERT INTO question ( quiz_id, question, good_answer, bad_answer1, bad_answer2, bad_answer3) VALUES ( 4, 'Who was Anne Frank?', 'A Jewish girl who wrote a famous diary while hiding from the Nazis during World War II', 'A famous painter from the Renaissance period', 'An astronaut who traveled to the moon in the 1960s', 'A medieval queen known for her military conquests');
INSERT INTO question ( quiz_id, question, good_answer, bad_answer1, bad_answer2, bad_answer3) VALUES ( 5, 'Which Shakespeare play features the characters Romeo and Juliet?', 'Romeo and Juliet', 'Hamlet', 'Macbeth', 'Othello');

INSERT INTO folder ( folder ) VALUES ('Science');

INSERT INTO learn_set ( folder_id, learn_set, subject_id) VALUES (1, 'Science Set', 1);
INSERT INTO learn_set ( folder_id, learn_set, subject_id, colour) VALUES (1, 'Geography Set', 1, '#BDE1C3');
INSERT INTO learn_set ( folder_id, learn_set, subject_id, colour) VALUES (1, 'Maths Set', 1, '#E9DBDB');
INSERT INTO learn_set ( folder_id, learn_set, subject_id, colour) VALUES (1, 'English Set', 1, '#CCDCE8');
INSERT INTO learn_set ( folder_id, learn_set, subject_id, colour) VALUES (1, 'History Set', 1, '#E9DBDB');
INSERT INTO learn_set ( folder_id, learn_set, subject_id, colour) VALUES (1, 'Computer Science Set', 1, '#FFDAB9');

INSERT INTO flashcard ( subject_id, set_id, client_id, term, definition) VALUES ( 1, 1, 1, 'Atom', 'The basic building block for all matter in the universe');
INSERT INTO flashcard ( subject_id, set_id, client_id, term, definition) VALUES ( 1, 1, 1, 'Hydrocarbons', 'A compound made up of hydrogen and carbon atoms only');
INSERT INTO flashcard ( subject_id, set_id, client_id, term, definition) VALUES ( 1, 2, 1, 'Stalactite', 'A mineral formation that hangs from the ceiling of caves, typically composed of calcium carbonate minerals');
INSERT INTO flashcard ( subject_id, set_id, client_id, term, definition) VALUES ( 1, 3, 1, 'Pythagoras Theorem', 'In a right-angled triangle, the square of the length of the hypotenuse is equal to the sum of the squares of the lengths of the other two sides.');
INSERT INTO flashcard ( subject_id, set_id, client_id, term, definition) VALUES ( 1, 3, 1, 'Interquartile range (IQR)', 'The difference between the third quartile (Q3) and the first quartile (Q1) in a dataset.');

INSERT INTO token ( client_id, token) VALUES (1, 'b0036e07-d0b4-4a34-8b32-58f889d75598');