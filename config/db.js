import dotenv  from "dotenv";
dotenv.config();
import mysql from 'mysql2';


const db = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: 24186,
    waitForConnections: true,
    connectionLimit: 100,
    ssl: {
        rejectUnauthorized: false,
    },
});

db.getConnection((err, connection) => {
    if (err) {
        console.error('Database Connection Error!', err);
    } else {
        console.log('Database Connected!');
        connection.release();
    }
});


const createVOTERTable = `
CREATE TABLE IF NOT EXISTS voters (
    id INT AUTO_INCREMENT PRIMARY KEY,
    voters_id VARCHAR(255),
    name_hash TEXT,
    precinct_number INT NOT NULL,
    password VARCHAR(255) NOT NULL,
    status TINYINT(1) DEFAULT 0,
    role VARCHAR(20)
);`;

const createCANDIDATETable = `
CREATE TABLE IF NOT EXISTS candidates (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255),
    position VARCHAR(255),
    partylist VARCHAR(255),
    total_vote INT DEFAULT 0
);`;

const createVOTINGTable = `
CREATE TABLE IF NOT EXISTS voting (
    id INT AUTO_INCREMENT PRIMARY KEY,
    voter_id INT,
    candidate_id INT,
    receipt_hash VARCHAR(255),
    tx_id VARCHAR(255) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (voter_id) REFERENCES voters(id),
    FOREIGN KEY (candidate_id) REFERENCES candidates(id)
);`;

db.query(createVOTINGTable, (err) => {
    if (err) console.error('Voting Table Error!', err);
    else console.log('Voting Table Ready!');
})
db.query(createVOTERTable, (err) => {
    if (err) console.error('Voter Table Error!', err);
    else console.log('Voter Table Ready');
});

db.query(createCANDIDATETable, (err) => {
    if (err) console.error('Candidate Table Error', err);
    else console.log('Candidate Table Ready!');
});

export default db;