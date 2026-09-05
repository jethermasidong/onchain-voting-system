import pg from 'pg';
import dotenv  from "dotenv";
dotenv.config();


const { Pool } = pg;

const db = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
});

db.query("SELECT NOW()")
    .then(result => {
        console.log("Database Connected");
        console.log(result.rows[0]);
    })
    .catch(err => console.log(err));


const createVOTERTable = `
CREATE TABLE IF NOT EXISTS voters (
    id SERIAL PRIMARY KEY,
    voters_id VARCHAR(255),
    name_hash TEXT,
    precinct_number INT NOT NULL,
    password VARCHAR(255) NOT NULL,
    status SMALLINT DEFAULT 0,
    role VARCHAR(20)
);`;

const createCANDIDATETable = `
CREATE TABLE IF NOT EXISTS candidates (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    position VARCHAR(255),
    partylist VARCHAR(255),
    total_vote INT DEFAULT 0
);`;

const createVOTINGTable = `
CREATE TABLE IF NOT EXISTS voting (
    id SERIAL PRIMARY KEY,
    voter_id INT,
    candidate_id INT,
    receipt_hash VARCHAR(255),
    tx_id VARCHAR(255) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (voter_id) REFERENCES voters(id),
    FOREIGN KEY (candidate_id) REFERENCES candidates(id)
);`;

db.query(createVOTERTable, (err) => {
    if (err) console.error('Voter Table Error!', err);
    else console.log('Voter Table Ready');
});

db.query(createCANDIDATETable, (err) => {
    if (err) console.error('Candidate Table Error', err);
    else console.log('Candidate Table Ready!');
});

db.query(createVOTINGTable, (err) => {
    if (err) console.error('Voting Table Error!', err);
    else console.log('Voting Table Ready!');
})

export default db;