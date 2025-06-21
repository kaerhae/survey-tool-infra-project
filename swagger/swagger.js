import swaggerAutogen from "swagger-autogen";

const host = process.env.IP_ADDR ? process.env.IP_ADDR : "localhost";
const port = process.env.PORT ? process.env.PORT : "3000";
const doc = {
    info: {
        title: "Survey-tool API Documentation",
        description: ""
    },
    host: `${host}:${port}`
};

const outFile = "./swagger.json";
const routes = [
    "../src/app.ts",
];

swaggerAutogen(outFile, routes, doc);

