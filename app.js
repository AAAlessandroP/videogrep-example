const express = require("express");
const app = express();
console.log("* app in funzione *");
const uri = `mongodb+srv://corona:${process.env.PASS}@miocluster2-igwb8.mongodb.net/test?retryWrites=true&w=majority`;
const { ObjectId } = require("mongodb");
const MongoClient = require("mongodb").MongoClient;
var bodyParser = require("body-parser");
const fetch = require("node-fetch");
app.use(express.static("mia_pag"));
app.use(express.static("public"));
require('dotenv').config()
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// const fileUpload = require('express-fileupload');
// app.use(fileUpload());
// NO fileUpload x multer
// NO fileUpload x multer
// NO fileUpload x multer

app.get("/data/:file",/*loggedck*/(req, res) => {
    res.sendFile('./data/' + req.params.file, { root: __dirname })
})


const listener = app.listen(process.env.PORT || 3000, function () {
    console.log("* Your app is listening on port " + listener.address().port);
});


var exec = require('child_process').exec;

app.get('/download', (req, res) =>
    exec(`curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py&&
python get-pip.py&&
cd .local/bin&&
./pip install videogrep&&
./pip install youtube-dl&&
/app/.local/bin/youtube-dl ${req.query.videoUrl} --write-auto-sub&&
./videogrep -i *.mp4 --use-vtt --search '${req.query.searchTerm}'&& mv supercut.mp4 ../../public/
`, function callback(error, stdout, stderr) {
        console.log(`error`, error);
        console.log(`stderr`, stderr);
        console.log(`stdout`, stdout);
        res.redirect("/supercut.mp4");
    }));


// var aws = require('aws-sdk')
// var multer = require('multer')
// var multerS3 = require('multer-s3')
// var config = new aws.Config({

//     accessKeyId: process.env.accessKeyId,
//     secretAccessKey: process.env.secretAccessKey,
//     region: 'eu-de',
//     endpoint: 's3.eu-de.cloud-object-storage.appdomain.cloud',
//     s3BucketEndpoint: false
// });

// var s3 = new aws.S3(config
// )

// var upload = multer({
//     storage: multerS3({
//         s3: s3,
//         bucket: process.env.bucketName,
//         metadata: function (req, file, cb) {
//             console.log(`file`, file);
//             cb(null, { fieldName: file.fieldname });
//         },
//         key: function (req, file, cb) {
//             cb(null, file.originalname)
//         }
//     })
// })

// app.post('/upload', upload.array('photos', 3), function (req, res, next) {
//     res.send('Successfully uploaded ' + req.files.length + ' files!')
// })

// async function getImage() {
//     const data = s3.getObject(
//         {
//             Bucket: process.env.bucketName,
//             Key: 'pic.jpg'
//         }

//     ).promise();
//     return data;
// }
