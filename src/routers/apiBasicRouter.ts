import express from 'express';
import { apiVersion } from '../consts';
const router = express.Router();

//
// Todo: Log incoming request
//

router.get("/api", (_, res) => {
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

router.get("/", (_, res) => {
    res.status(200).send("Server up and running!");
});




export default router;