let express = require("express");
let mongodb = require("mongodb");

let ourApp = express();
let db;
// const port = 3000;

ourApp.use(express.static("public"));
ourApp.use(express.json());
ourApp.use(express.urlencoded({ extended: false }));

let connectionString =
  "mongodb+srv://Sourav:q3h@@QmKtjDbr-f@cluster0.suecd.mongodb.net/ToDoApp?retryWrites=true&w=majority";

mongodb.connect(
  connectionString,
  // { useNewUrlParser: true },
  { useUnifiedTopology: true },
  function (err, client) {
    db = client.db();
    if (err) throw err;

    ourApp.listen(3000);
  }
);

ourApp.get("/", function (req, res) {
  db.collection("items")
    .find()
    .toArray(function (err, items) {
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
                  <form id="create-form" action='/create-item' method='POST'>
                    <div class="d-flex align-items-center">
                      <input id="create-field" autofocus name='item' autocomplete="off" class="form-control mr-3" type="text" style="flex: 1;">
                      <button class="btn btn-primary">Add New Item</button>
                    </div>
                  </form>
                </div>

                
                <p> There is ${items.length} number of items..</p>
               
                
                <ul id="item-list" class="list-group pb-5">
                
                  
                </ul>
              </div>
                

              
              <script >
              let items = ${JSON.stringify(items)}
              </script>
              <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
              <script src="/browser.js"></script>
            </body>
            </html>
            `
      );
    });
});

ourApp.post("/create-item", function (req, res) {
  db.collection("items").insertOne({ text: req.body.text }, function (err, info) {
    res.json(info.ops[0])
    // res.send(`Thanks for submitting the form..
    // <a href='/'>Back to the main page</a>`);
  });
});

ourApp.post("/update-item", function (req, res) {
  console.log(req.body.id);
  db.collection("items").findOneAndUpdate(
    { _id: new mongodb.ObjectId(req.body.id) },
    { $set: { text: req.body.text } },
    function () {
      res.send("action is compleate successfully...");
    }
  );
});

ourApp.post("/delete-item", function (req, res) {
  console.log(req.body.id);
  db.collection("items").deleteOne(
    { _id: new mongodb.ObjectId(req.body.id) },
    function () {
      res.send("delete item is compleate successfully...");
    }
  );
  // console.log(req.body.text)
  // res.send( `Update successfully`)
});




// ${items
//   .map(
//     (item) => `
//   <li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
//     <span class="item-text">${item.text}</span>
//     <div>
//       <button data-id="${item._id}" class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
//       <button data-id="${item._id}" class="delete-me btn btn-danger btn-sm">Delete</button>
//     </div>
//   </li>`
//   )
//   .join("")}
  