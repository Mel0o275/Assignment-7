import { db } from "../../db/connection.js";

export const LogCollection = async (input) => {
    const cappedCollection = db.collection("Logs");
    const result = await cappedCollection.insertOne(input);
    return result;
}
