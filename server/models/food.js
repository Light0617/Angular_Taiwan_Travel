const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var foodSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    featured: {
        type: Boolean,
        default: false
    },
    description: {
        type: String,
        default: ''
    },
    delicious: {
        type: Number,
        default: 5
    },
    cost: {
        type: Number,
        default: 5
    }
  }, {
    timestamps: true
});

var Foods = mongoose.model('Food', foodSchema);

module.exports = Foods;
