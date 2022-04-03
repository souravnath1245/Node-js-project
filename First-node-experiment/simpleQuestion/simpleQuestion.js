let express = require("express");
let ourApp = express();

ourApp.use(express.urlencoded({extended: false}))

ourApp.get("/", function (req, res) {
  res.send(`
    <form action="/answer" method="POST">
    <p>What color is the sky on a clear and sunny day?
    </p>
    <input name="skyColor" autocomplet="off">
    <button>submit Answer</button>
    </form>
    `);
});
// ourApp.post('/answer', function(req,res){
//     res.send(  `
//     Thank You for submitting the form.
//     `)
//    
// })
// ourApp.get("/answer", function(req,res){
//     res.send(' Sorry, I don't find this page.')
// })
ourApp.post('/answer', function(req,res){
    if(req.body.skyColor.toLowerCase() == 'blue'){
        res.send(`
        <p> Congrats, That is the correct answer!</p>
        <a href='/'> Back to homepage</a>
        `)
    }else[
        res.send(`
        <p> Sorry, That is incorrect.</p>
        <a href='/'> Back to homepage</a>
        `)
    ]
})
ourApp.listen(3000);
