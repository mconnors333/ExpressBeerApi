var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var BeerSchema = new Schema(
  {
    name: String,
    kind: String,
    price: Number
  }
);

module.exports = mongoose.model('Beer', BeerSchema);
