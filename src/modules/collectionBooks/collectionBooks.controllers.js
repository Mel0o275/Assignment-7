import { Router } from "express";
import { createCappedLogCollection, createEx, createImp, createIndex } from "./collectionBooks.service.js";

const router = Router();

router.post("/books", async (req, res) => {
    try {
        const result = await createEx(req.body);

        res.status(201).json({
            message: "Book added successfully",
            data: result
        });

    } catch (error) {
        res.status(400).json({
            message: "Validation failed",
            error: error.message
        });
    }
});

router.post("/authors", async (req, res) => {
    try {
        const result = await createImp(req.body);

        res.status(201).json({
            message: "Author added successfully",
            data: result
        });

    } catch (error) {
        res.status(400).json({
            message: "Validation failed",
            error: error.message
        });
    }
});

router.post('/logs/capped', async (req, res) => {
    try {

        const result = await createCappedLogCollection(req.body);

        res.status(201).json({
            message: "Log entry added successfully",
            data: result
        });

    } catch (error) {
        res.status(400).json({
            message: "Failed to add log entry",
            error: error.message
        });
    }
});

router.post('/books/index', async (req, res) => {
    try {

        const result = await createIndex();

        res.status(201).json({
            message: "Index created successfully",
            data: result
        });

    } catch (error) {
        res.status(400).json({
            message: "Failed to create index",
            error: error.message
        });
    }
});

export default router;