const express = require('express');
const router = express.Router();
const Rating = require('../Models/ratingModel');

// POST route to create a new rating
router.post('/ratings', async (req, res) => {
  try {
    const { bookId, userId, rating } = req.body;

    // Create a new rating document
    const newRating = new Rating({
      bookId,
      userId,
      rating
    });

    // Save the new rating to the database
    await newRating.save();

    res.status(201).json({ success: true, message: 'Rating added successfully' });
  } catch (error) {
    console.error('Error creating rating:', error);
    res.status(500).json({ success: false, message: 'Failed to add rating' });
  }
});


router.get("/ratings/:bookId", async (req, res) => {
  try {
    const { bookId } = req.params;

    // Find all ratings from the database with the given bookId
    const ratingsForBook = await Rating.find({ bookId });

    // If there are ratings for the bookId, calculate the average rating
    if (ratingsForBook.length > 0) {
      const sumOfRatings = ratingsForBook.reduce((acc, rating) => acc + rating.rating, 0);
      const averageRating = (sumOfRatings / ratingsForBook.length).toFixed(1);

      res.json({ bookId, averageRating });
    } else {
      // If no ratings are found for the bookId, return a message
      res.json({ bookId, averageRating: 0, message: "No ratings found for this book" });
    }
  } catch (error) {
    console.error("Error fetching ratings:", error);
    res.status(500).json({ error: "Failed to fetch ratings" });
  }
});


module.exports = router;
