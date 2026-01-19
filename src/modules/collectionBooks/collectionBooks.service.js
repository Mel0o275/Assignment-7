import { db } from "../../db/connection.js";

export const createEx = async (input) => {
    const booksCollection = db.collection("Books");
    const result = await booksCollection.insertOne(input);
    return result;
};

export const createImp = async (input) => {
    const authorsCollection = db.collection("Author");
    const result = await authorsCollection.insertOne(input);
    return result;
}

export const createCappedLogCollection = async (input) => {
    const cappedCollection = db.collection("Logs");
    const result = await cappedCollection.insertOne(input);
    return result;
}

export const createIndex = async() => {
    const booksCollection = db.collection("Books");
    const result = await booksCollection.createIndex({ title: 1 });
    return result;
}

