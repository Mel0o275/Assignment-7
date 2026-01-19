import 'dotenv/config';
import { MongoClient } from 'mongodb';

const url = process.env.DB_URL;
export const client = new MongoClient(url);

export const  connectDB = async () => {
  try {
    await client.connect();
    console.log('Database connected successfully');

  } catch (error) {
    console.log('Database connection failed');
    console.log(error);
  }
}

export const db = client.db('LibraryDB');