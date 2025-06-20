import express from 'express';

const router = express.Router();

// Todo: Log incoming request
router.get("/", (_, res) => {
    res.send("Server up and running!");
});


export default router;