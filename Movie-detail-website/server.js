let express = require("express");
let mongodb = require("mongodb");

let app = express();
let db;

app.use(express.urlencoded({ extended: false }));

let connectionString =
  "mongodb+srv://Sourav:q3h@@QmKtjDbr-f@cluster0.suecd.mongodb.net/MovieDetails?retryWrites=true&w=majority";

mongodb.connect(
  connectionString,
  { useUnifiedTopology: true },
  function (err, client) {
    db = client.db();

    if (err) {
      console.log(err);
    }

    app.listen(3000);
  }
);

app.get("/", function (req, res) {
  db.collection("items")
    .find()
    .toArray(function (err, items) {
      res.send(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Movie detail site.</title>
      
          <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
            rel="stylesheet"
            integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
            crossorigin="anonymous"
          />
      
          <style>
            .movie--header {
              width: 80%;
              margin: 0 auto;
              text-align: center;
            }
            .movie--header h1 {
              font-size: 2.5rem;
              font-weight: 900;
              text-transform: uppercase;
            }
          </style>
        </head>
        <body>
          <div class="container movie--section">
            <div class="movie--header">
              <h1>Movie-Details</h1>
            </div>
            <div class="jumbotron p-3 shadow-sm my-3 movie--input">
              <form action="/movie-details" method="POST">
                <input
                name="title"  
                  autofocus
                  type="text"
                  autocomplete="off"
                  class="form-control my-3"
                  placeholder="Movie Name"
                />
                <input
                  autofocus
                  type="url"
                  autocomplete="off"
                  class="form-control my-3"
                  placeholder="Movie Image url"
                  name: "url"
                />
                <input
                  autofocus
                  type="text"
                  autocomplete="off"
                  class="form-control my-3"
                  placeholder="Movie Actors Name"
                name='actors'
                />
                <input
                  autofocus
                  type="text"
                  autocomplete="off"
                  class="form-control my-3"
                  placeholder="Movie Producer Name"
                  name="producer"
                  
                />
                <input
                  autofocus
                  type="number"
                  autocomplete="off"
                  class="form-control my-3"
                  placeholder="Movie Rate"
                  name="rate"
                 
                />
                <input
                  autofocus
                  type="number"
                  autocomplete="off"
                  class="form-control my-3"
                  placeholder="How Many Star You Give It Out Of 5"
                  name="stars"
                
                />
      
                <textarea
                  class="form-control"
                  placeholder="Write about this movie detaily... "
                  id="floatingTextarea2"
                  style="height: 100px"
                  name="details"
                ></textarea>
                <button class="btn btn-primary my-4">Add New Item</button>
              </form>
            </div>
            <div class="movie--output">
              <table class="table table-dark table-sm">
                <thead>
                  <tr>
                
                    <th scope="col">Name</th>
                    <th scope="col">Actors Name</th>
                    <th scope="col">Producer  Name</th>
                    <th scope="col">Movie  Rate</th>
                    <th scope="col">Stars</th>
                  </tr>
                </thead>
                <tbody>
                ${items.map(
                  (item) => `
                <tr>
                
                <td>${item.title}</td>
                <td>${item.title}</td>
                <td>${item.title}</td>
                <td>${item.title}</td>
                <td>${item.title}</td>
              </tr>
                `
                )}
                 
                  
                </tbody>
              </table>
            </div>
          </div>
      
          <script
            src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
            crossorigin="anonymous"
          ></script>
        </body>
      </html>
      
      
      `);
    });
});

app.post("/movie-details", function (req, res) {
  console.log(req.body.title);
  db.collection("items").insertOne(
    {
      title: req.body.title,
      url: req.body.url,
      actors: req.body.actors,
      producer: req.body.producer,
      rate: req.body.rate,
      star: req.body.stars,
      details: req.body.details,
    },
    function () {
      res.send("thanks for submiting");
    }
  );
});
// app.listen(3000);
