import { Router } from "express";
import { breakGenres, deleteBookBeforeYear, filterBooks, filterBooks2, findBook, findBookAndExcludeGenres, findBookBetweenYears, findWithGener, findWithYearInt, insertDoc, insertManyDoc, joinBooks, skipAndLimit, updateBook } from "./Books.service.js";
const router = Router();

router.post("/", async (req, res) => {
    try {
        const result = await insertDoc(req.body);

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

router.post("/batch", async (req, res) => {
    try {
        const result = await insertManyDoc(req.body);

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

router.patch("/:title", async (req, res) => {
    try {
        const result = await updateBook(req.params.title);

        res.status(200).json({
            message: "Book updated successfully",
            matchedCount: result.matchedCount,
            modifiedCount: result.modifiedCount
        });

    } catch (error) {
        res.status(400).json({
            message: "Update failed",
            error: error.message
        });
    }
});

router.get("/title", async(req, res) => {
    const title = req.query.title;
    try {
        const result = await findBook(title);
        res.status(200).json({
            message: "Book fetched successfully",
            data: result
        });
    } catch (error) {
        res.status(400).json({
            message: "Fetch failed",
            error: error.message
        });
    }
})

router.get("/year", async(req, res) => {
    const starrYear = parseInt(req.query.from);
    const endYear = parseInt(req.query.to);
    try {
        const result = await findBookBetweenYears(starrYear, endYear);
        res.status(200).json({
            message: "Books fetched successfully",
            data: result
        });
    } catch (error) {
        res.status(400).json({
            message: "Fetch failed",
            error: error.message
        });
    }
})

router.get("/genre", async(req, res) => {
    const genre = req.query.genre;
    try {
        const result = await findWithGener(genre);
        res.status(200).json({
            message: "Books fetched successfully",
            data: result
        });
    } catch (error) {
        res.status(400).json({
            message: "Fetch failed",
            error: error.message
        });
    }
})

router.get("/skip-limit", async(req, res) => {
    try {
        const result = await skipAndLimit();
        res.status(200).json({
            message: "Books fetched successfully",
            data: result
        });
    } catch (error) {
        res.status(400).json({
            message: "Fetch failed",
            error: error.message
        });
    }
})

router.get("/year-integer", async(req, res) => {
    try {
        const result = await findWithYearInt();
        res.status(200).json({
            message: "Books fetched successfully",
            data: result
        });
    } catch (error) {
        res.status(400).json({
            message: "Fetch failed",
            error: error.message
        });
    }
})

router.get("/exclude-genres", async(req, res) => {
    try {
        const result = await findBookAndExcludeGenres();
        res.status(200).json({
            message: "Books fetched successfully",
            data: result
        });
    } catch (error) {
        res.status(400).json({
            message: "Fetch failed",
            error: error.message
        });
    }
})

router.delete("/before-year", async(req, res) => {
    try {
        const year = parseInt(req.query.year);
        const result = await deleteBookBeforeYear(year);
        res.status(200).json({
            message: "Books deleted successfully",
            deletedCount: result.deletedCount
        });
    } catch (error) {
        res.status(400).json({
            message: "Delete failed",
            error: error.message
        });
    }
})

router.get("/aggregate1", async(req, res) => {
    try {
        const result = await filterBooks();
        res.status(200).json({
            message: "Books fetched successfully",
            data: result
        });
    } catch (error) {
        res.status(400).json({
            message: "Fetch failed",
            error: error.message
        });
    }
})

router.get("/aggregate2", async(req, res) => {
    try {
        const result = await filterBooks2();
        res.status(200).json({
            message: "Books fetched successfully",
            data: result
        });
    } catch (error) {
        res.status(400).json({
            message: "Fetch failed",
            error: error.message
        });
    }
})

router.get("/aggregate3", async(req, res) => {
    try {
        const result = await breakGenres();
        res.status(200).json({
            message: "Books aggregated successfully",
            data: result
        });
    } catch (error) {
        res.status(400).json({
            message: "Aggregation failed",
            error: error.message
        });
    }
})

router.get("/aggregate4", async(req, res) => {
    try {
        const result = await joinBooks();
        res.status(200).json({
            message: "Books aggregated successfully",
            data: result
        });
    } catch (error) {
        res.status(400).json({
            message: "Aggregation failed",
            error: error.message
        });
    }
})
export default router;