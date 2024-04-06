const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs").promises;

dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: false}));
app.use(express.static(path.resolve(__dirname, "../client/dist")));

app.get("/to-do-data", (req, res) => {
    try {
        let data = fs.readFile('to-do.json', 'utf8');
        res.status(200).send({status: true, data: JSON.parse(data)});

    } catch (err) {
        console.log("🚀 ~ to-do-data ~ err:", err);
        res.status(500).send({status: false, message: err.message});
    }
});

app.listen(PORT, function() {
    console.log("🚀 App listening on port " + PORT + "!");
});