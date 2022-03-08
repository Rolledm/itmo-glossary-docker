import express from 'express';

let app = express();

app.all("*", (req, res) => {
    res.send("Hello")
});

app.listen(80)