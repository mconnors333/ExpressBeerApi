// server.js

var mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/beer_api");

var Beer = require("./app/model/beer");


// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
// set up a variable to hold our model here...

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

router.use(function(req, res, next) {
  console.log("Something is happening");
  next();
});


// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
  res.json({ message: 'Welcome to the beer api!' });
});

// more routes for our API will happen here
router.route('/beers')

// create
  .post(function(req, res) {
      Beer.create(req.body.beer).then(function(beer) {
        res.json(beer);
      });
  })

// index
  .get(function(req, res) {
    // code here
    Beer.find(function(err, beers) {
            if (err)
                res.send(err);

            res.json(beers);
        });
  });


router.route('/beers/:name')

  // show
  .get(function(req, res) {
    // code here
    Beer.findOne({name: req.params.name}, function(err, beer) {
            if (err)
                res.send(err);
            res.json(beer);
        });
  })

  // update
  .put(function(req, res) {
    // code here
    Beer.findOneAndUpdate({name: req.body.name}, function(err, beer) {

            if (err)
                res.send(err);

            // save the bear
            beer.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Beer updated!' });
            });

        });
  })

  // destroy
  .delete(function(req, res) {
    // code here
    Beer.remove({
            _name: req.body.name
        }, function(err, beer) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
  });

// View all routes
router.get("/routes", function(req, res){
  console.log(router.stack);
  res.json(router.stack);
});
// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Beer is being served on port ' + port);
