let express = require("express");
let app = express();
const { MongoClient, ObjectId } = require("mongodb");

const port = process.env.PORT || 5000;
app.use(express.json());

const uri = 'mongodb+srv://Sourav:q3h@@QmKtjDbr-f@cluster0.suecd.mongodb.net/ToDoApp?retryWrites=true&w=majority';
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    await client.connect();
    const database = client.db("NewToDoApp");
    const items = database.collection("items");
    // Query for a movie that has the title 'Back to the Future'
    //   const query = { title: 'Back to the Future' };
    //   const movie = await movies.findOne(query);
    //   console.log(movie);
  
    app.post("/create-items", async (req, res) => {
        const newItem = req.body.item;
        const result = await items.insertOne({text : newItem}  );
        console.log("Hitting The Post Products", result);
        res.json(result);
      });


  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

app.get("/", function (req, res) {
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






app.post("/create-item", function (req, res) {
    console.log("we are typing this..", req.body.item);
    db.collection("items").insertOne({ text: req.body.item }, function () {
      res.send("Thanks for submitting the form..");
    });
    res.send(`
  
      <p> Thanks for submitting the form .</p>
      <a href='/'>Back to the main page</a>
      `);
  });

app.get("/", async (req, res) => {
    res.send("Welcome to my Server");
  });

app.listen(port, () => {
    console.log(`Server is running, ${port}`);
  });
