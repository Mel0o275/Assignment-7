import { db } from "../../db/connection.js";

export const insertDoc = async (input) => {
    const booksCollection = db.collection("Books");
    const result = await booksCollection.insertOne(input);
    return result;
};

export const insertManyDoc = async (input) => {
    const booksCollection = db.collection("Books");
    if (!Array.isArray(input) || input.length < 3) {
        throw new Error("You must insert at least 3 records");
    }

    const result = await booksCollection.insertMany(input);
    return result;
};

export const updateBook = async (title) => {
    const booksCollection = db.collection("Books");
    const result = await booksCollection.updateOne(
        { title: title },
        { $set: { year: 2022 } }
    );
    return result;
}

export const findBook = async (title) => {
    const booksCollection = db.collection("Books");
    const result = await booksCollection.findOne({ title: title });
    return result;
}

export const findBookBetweenYears = async (startYear, endYear) => {
    const booksCollection = db.collection("Books");
    const result = await booksCollection.find({
        year: { $gte: startYear, $lte: endYear }
    }).toArray();
    return result;
}

export const findWithGener = async (genre) => {
    const booksCollection = db.collection("Books");
    const result = await booksCollection.find({
        genres: genre
    }).toArray();
    return result
}

export const skipAndLimit = async () => {
    const booksCollection = db.collection("Books");
    const result = await booksCollection.find()
        .sort({ year: -1 })
        .skip(2)
        .limit(3)
        .toArray();
    return result;
}

export const findWithYearInt = async () => {
    const booksCollection = db.collection("Books");
    const result = await booksCollection.find({
        year: { $type: "int" }
    }).toArray();
    return result;
}

export const findBookAndExcludeGenres = async () => {
    const booksCollection = db.collection("Books");
    const result = await booksCollection.find(
        { genres: { $in: ["Horror", "Science Fiction"] } },
    ).toArray();
    return result;
}

export const deleteBookBeforeYear = async (year) => {
    const booksCollection = db.collection("Books");
    const result = await booksCollection.deleteMany({
        year: { $lt: year }
    });
    return result;
}

export const filterBooks = async () => {
    const booksCollection = db.collection("Books");
    const result = await booksCollection.aggregate([
        {
            $match: {
                year: { $gt: 2000 }
            }
        },
        {
            $sort: {
                year: -1
            }
        }
    ]).toArray();

    return result;
};

export const filterBooks2 = async () => {
    const booksCollection = db.collection("Books");
    const result = await booksCollection.aggregate([
        {
            $match: {
                year: { $gt: 2000 }
            }
        },
        {
            $sort: {
                year: -1
            }
        },
        {
            $project: {
                _id: 0,
                title: 1,
                author: 1,
                year: 1
            }
        }
    ]).toArray();

    return result;
};

export const breakGenres = async () => {
    const booksCollection = db.collection("Books");
    const result = await booksCollection.aggregate([
        {
            $unwind: "$genres"
        },
        {
            $project: {
                title: 1,
                genre: "$genres",
                _id: 0
            }
        }
    ]).toArray();

    return result;
}

export const joinBooks = async () => {
    const logsCollection = db.collection("Logs");

    const result = await logsCollection.aggregate([
        {
            $addFields: {
                bookObjId: { $toObjectId: "$bookId" }
            }
        },
        {
            $lookup: {
                from: "Books",
                localField: "bookObjId",
                foreignField: "_id",
                as: "book_details"
            }
        },
        { $unwind: "$book_details" },
        {
            $project: {
                _id: 0,
                action: 1,
                book: {
                    title: "$book_details.title",
                    year: "$book_details.year",
                    genres: "$book_details.genres"
                }
            }
        }
    ]).toArray();

    return result;
};
