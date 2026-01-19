import { Router } from "express";
import { LogCollection } from "./logs.service.js";

const router = Router();

router.post('/', async (req, res) => {
    try {

        const result = await LogCollection(req.body);

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

export default router;