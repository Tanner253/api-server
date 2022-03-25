"use strict";

const express = require("express");

const peopleRouter = require('./routes/people.js');
const musicRouter = require('./routes/music.js');

const app = express();

app.use(express.json());
app.use(peopleRouter);
app.use(musicRouter);


module.exports = {
    app,
    start: (PORT) => {
        app.listen(PORT, () => {
            console.log(`app is running on PORT: ${PORT}`);
        });
    },
};
