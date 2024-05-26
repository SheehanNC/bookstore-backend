const express = require('express');
const router = express.Router();
const Feedback = require('../Models/feedbackModel');

// Handle feedback submission
router.post("/feedback", async (req, res) => {
    const { email, name, feedbackType, feedback } = req.body;

    try {
        const newFeedback = await Feedback.create({
            email,
            name,
            feedbackType,
            feedback
        });

        res.status(201).json({ message: "Feedback submitted successfully", newFeedback });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
