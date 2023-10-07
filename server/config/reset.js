import { pool } from "./database.js";
import './dotenv.js'
import ctfData from "../data/ctfsData.js";

const createctfsTable=async ()=>{
    const createTableQuery=`
    DROP TABLE IF EXISTS ctfs;
    CREATE TABLE IF NOT EXISTS ctfs (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        audience VARCHAR(255) NOT NULL,
        location VARCHAR(50) NOT NULL,
        image VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        LocationClass TEXT,
        link TEXT
    );
    `
    try{
        const res =await pool.query(createTableQuery)
        console.log('ctfs table created')
    }
    catch (err){
        console.error('Error creating ctfs table',err)
    }
}
// Place ctf data into ctf table
const seedctfsTable=async () =>{
    await createctfsTable()
    ctfData.forEach((ctf)=>{
        const insertQuery={
            text:'Insert INTO ctfs(name, audience, location, image, description, LocationClass, link) VALUES ($1, $2, $3, $4, $5, $6, $7)'
        }

        const values = [
            ctf.name,
            ctf.audience,
            ctf.location,
            ctf.image,
            ctf.description,
            ctf.LocationClass,
            ctf.link
        ]

        pool.query(insertQuery,values,(err,res)=>{
            if (err){
                console.error(` Error inserting ctf ${ctf.id}`,err)
                return
            }

            console.log(`${ctf.name} added!`)
        })

    })

}
seedctfsTable()