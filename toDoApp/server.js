let express = require("express");
let mongodb = require("mongodb");
let ourApp = express();
let db;
const port = 3000
let connectionString =
  "mongodb+srv://Sourav:q3h@@QmKtjDbr-f@cluster0.suecd.mongodb.net/ToDoApp?retryWrites=true&w=majority";
mongodb.connect(
  connectionString,
  { useNewUrlParser: true },
  function (err, client) {
    db = client.db();

    // ourApp.listen(3000);
  }
);

ourApp.use(express.urlencoded({ extended: false }));

ourApp.get("/", function (req, res) {
  res.send(
    `<!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Simple To-Do App</title>
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">
        </head>
        <body>
          <div class="container">
            <h1 class="display-4 text-center py-1">To-Do App</h1>
            
            <div class="jumbotron p-3 shadow-sm">
              <form action='/create-item' method='POST'>
                <div class="d-flex align-items-center">
                  <input autofocus name='item' autocomplete="off" class="form-control mr-3" type="text" style="flex: 1;">
                  <button class="btn btn-primary">Add New Item</button>
                </div>
              </form>
            </div>
            
            <ul class="list-group pb-5">
              <li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
                <span class="item-text">Fake example item #1</span>
                <div>
                  <button class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
                  <button class="delete-me btn btn-danger btn-sm">Delete</button>
                </div>
              </li>
              <li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
                <span class="item-text">Fake example item #2</span>
                <div>
                  <button class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
                  <button class="delete-me btn btn-danger btn-sm">Delete</button>
                </div>
              </li>
              <li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
                <span class="item-text">Fake example item #3</span>
                <div>
                  <button class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
                  <button class="delete-me btn btn-danger btn-sm">Delete</button>
                </div>
              </li>
            </ul>
            
          </div>
          
        </body>
        </html>
        `
  );
});

ourApp.post("/create-item", function (req, res) {
  console.log("we are typing this..", req.body.item);
  db.collection("items").insertOne({ text: req.body.item }, function () {
    res.send("Thanks for submitting the form..");
  });
  res.send(`

    <p> Thanks for submitting the form .</p>
    <a href='/'>Back to the main page</a>
    `);
});
// ourApp.listen(3000);

ourApp.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
 })