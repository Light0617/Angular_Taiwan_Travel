const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var cultureSchema = new Schema({
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

var Cultures = mongoose.model('Culture', cultureSchema);

module.exports = Cultures;
