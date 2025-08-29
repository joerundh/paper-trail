import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = "PaperTrailDb";

if (!uri) {
    throw new Error("No URI provided.");
}

const client = new MongoClient(process.env.MONGODB_URI, {});

export async function connectToDatabase() {
    try {
        await client.connect();
        return client.db(dbName);
    }
    catch (e) {
        console.log(e);
    }
}