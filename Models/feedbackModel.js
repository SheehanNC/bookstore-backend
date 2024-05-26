const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
    email: {
        type: String,
        required: false,
        match: [/.+\@.+\..+/, 'Please fill a valid email address']
    },
    name: {
        type: String,
        required: false
    },
    feedbackType: {
        type: String,
        enum: ['Website Functionality', 'Content', 'User Experience', 'Product Suggestions', 'Others'],
        required: true
    },
    feedback: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    }
});

module.exports = mongoose.model("Feedback", feedbackSchema);
