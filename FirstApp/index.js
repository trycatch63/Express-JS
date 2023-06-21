const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const app  = express();

//String Response
app.get("/one", function (req, res) {
    res.send("This is simple string response");
})

app.post("/two", function (req, res) {
    res.send("Home Page");
})

//Status Code Response
app.get("/three", function (req, res) {

    res.status(401).end("Unauthorized..........");
})

//JSON  Response
app.get("/four", function (req, res) {

    let jsonArray = [
        {
            name: "Pavel",
            id: 1,
            class: "One"
        },
        {
            name: "Safiq",
            id: 2,
            class: "Two"
        }
    ]

    res.json(jsonArray);
})

//Download Response
app.get("/five", function (req, res) {
    res.download('./uploads/response.jpg');
})

//Response Redirect
app.get("/bangladesh", function (req, res) {
    const url  = "http://localhost:8000/india";
    res.redirect(url);
})

app.get("/india", function (req, res) {
    res.end("Welcome to india from bangladesh!!!");
})

// Response Header
app.get("/header", function (req, res) {
    res.append("name", "Pavel Mahmud.");
    res.append("age", "32 years old.")
    res.end("Append data in headers.");
})

// Response Header
app.get("/cookie", function (req, res) {
    res.cookie("name", "Pavel Mahmud.");
    res.cookie("age", "32 years old.")
    res.end("Added data in cookie");
})

//Query Parameter
app.get("/query", function (req, res) {
    let firstName = req.query.firstname;
    let lastName = req.query.lastname;

    let fullName = firstName + ' ' + lastName;

    res.send(fullName);
})

//Body Parser
// Parse JSON bodies
app.use(bodyParser.json())
// app.post("/", function (req, res) {
//     let JSONData = req.body;
//     let JSONString = JSON.stringify(JSONData);
//     res.send(JSONString);
// })



// for parsing multipart/form-data
// let myMulter = multer();
// app.use(myMulter.array());
// app.use(express.static('public'));
//
// app.post('/', function (req, res) {
//     let JSONData = req.body;
//     res.send(JSON.stringify(JSONData));
//
// })

//file upload using multer
let storage = multer.diskStorage({
    destination:function (req, file, callback) {
        callback(null,'./uploads');
    },
    filename:function (req, file, callback) {
        callback(null,file.originalname);
    }
});

let upload = multer({storage}).single('myfile');
app.post('/', function (req, res) {
    upload(req,res,function (error) {
        if(error)
            res.send("File upload Fail");
        else
            res.send("File Upload Success");
    })
})

app.listen(8000, function () {
    console.log("Server Run Success");
})