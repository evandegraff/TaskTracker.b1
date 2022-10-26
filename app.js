//importing modules
const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// BODY PARSER
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  //sending a file/rendering index.html
  res.sendFile(__dirname + "/index.html"); // __dirname is the main directory
});
/*
app.post("/addtask", (req, res)=>{
 let newTask = {
    taskName : "task3",
    id :  3
 }
const data = fs.readFileSync(path.join(__dirname + "/data.json"));

    const parsedData = JSON.parse(data); //this gives me the data for parsedData in JSON as a simple object
console.log(parsedData);
});
 // calls on the post form name in the html
*/
app.post("/addtask", (req, res) => {
  let newTask = {
    taskName: `${req.body.tasks}`,
    id: Date.now(),
  };
  const data = fs.readFileSync(path.join(__dirname + "/data.json"));

  const parsedData = JSON.parse(data); //this gives me the data for parsedData in JSON as a simple object
  //PARSED DATA IS NOW A SIMPLE OBJECT
  console.log(parsedData);
  console.log("hello");

  console.log(parsedData[0]); // console logs the first object in the array
  console.log(parsedData[1]);
  parsedData.push(newTask);
  console.log(parsedData);

  const stringifiedData = JSON.stringify(parsedData);
  fs.writeFileSync(__dirname + "/data.json", stringifiedData);
  // PATH             DATA(GIVES IT THE VALUE)
  res.redirect("/");
});

app.listen(3000); // LAST LINE BECAUSE IT NEEDS TO BE OUTSIDE MY CODE AND ESTABLISHES THE HOST TO 3000
