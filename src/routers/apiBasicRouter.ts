import express from 'express';
import { apiVersion } from '../consts';
import { logRequest } from '../logger/logger';
const router = express.Router();



router.get("/api", (req, res) => {
    logRequest(req);
    res.status(200).send(`Server API version: ${apiVersion}`);
});


// TODO: Maybe something more elegant in future integrations?
router.get("/healthcheck", (_, res) => {
    res.status(200).json({
        "type": "healthcheck",
        "status": "200",
        "message": "OK"
    });
})

router.get("/", (req, res) => {
    logRequest(req);
    res.status(200).send("Server up and running!");
});

export default router;