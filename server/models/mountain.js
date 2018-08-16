const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var mountainSchema = new Schema({
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
    starts: {
        type: Number,
        default: 5
    }
  }, {
    timestamps: true
});

var Mountains = mongoose.model('Mountain', mountainSchema);

module.exports = Mountains;
