const express = require("express");
const app = express();
console.log("* app in funzione *");

var bodyParser = require("body-parser");
const fs = require("fs");
// app.use(express.static("mia_pag"));
app.use(express.static("public"));
require('dotenv').config()
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// const fileUpload = require('express-fileupload');
// app.use(fileUpload());
// NO fileUpload x multer
// NO fileUpload x multer
// NO fileUpload x multer


const listener = app.listen(process.env.PORT || 3000, function () {
    console.log("* Your app is listening on port " + listener.address().port);
});


var { exec, execSync } = require('child_process');
execSync(`curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py&&
python get-pip.py&&
cd .local/bin&&
./pip install videogrep&&
./pip install youtube-dl`);

let i = 0;
app.get('/download', (req, res) => {
    console.log(`req.query`, req.query);
    exec(`cd .local/bin && /app/.local/bin/youtube-dl ${decodeURIComponent(req.query.videoUrl)} -f worst --write-auto-sub&&
./videogrep -i *.mp4 --use-vtt -o 'video_${i}.mp4' --search '${req.query.searchTerm}'&& mv video_${i}.mp4 ../../public/
`, function callback(error, stdout, stderr) {
        console.log(`error`, error);
        console.log(`stderr`, stderr);
        console.log(`stdout`, stdout);
        res.redirect(`/video_${i++}.mp4`);
    })
});


app.get("/", (req, res) => {
    let s = `
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>🎥VideoGrep🎥</title>
    </head>
    
    <body>
    <h3>Lista Filmati ricavati con VideoGrep</h3><br>
    <ul>`;
    fs.readdirSync("public/").forEach(filename => {
        s += `<li><a href='/${filename}'>${filename}</a></li>`;
        // console.log(`filename`, filename);
    });
    s += `</ul></body>
    
    </html>`;
    res.send(s)
})
