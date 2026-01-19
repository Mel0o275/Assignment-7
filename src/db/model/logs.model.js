import { db } from "../connection";

export const bookModel = db.createCollection("Logs", { capped: true, size: 1000 });