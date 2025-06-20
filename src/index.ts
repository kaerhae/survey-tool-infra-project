import app from './app.js';

const port = process.env.PORT ? process.env.PORT : 3000;

app.listen(port, () => {
    return console.log(`Server running at http://localhost:${port}`);
})