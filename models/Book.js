const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const BookSchema = new Schema ({
    title: {
        type: String,
        required: true
    },
    type: {
        type: String,
    },
    description: {
        type: String,
    },
    saved: {
        type: Boolean,
        default: false
    }
});

const Book = mongoose.model("Book", BookSchema);

module.exports = Book;
