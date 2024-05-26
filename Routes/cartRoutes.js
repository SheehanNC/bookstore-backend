const express = require('express');
const router = express.Router();
const CartItem = require("../Models/cartModel");
const Order = require("../Models/ordersModel");

router.post("/cart-items", async (req, res) => {
    try {
      const { bookId, quantity, email, price, bookName } = req.body;
      const cartItem = new CartItem({  bookId, quantity, email, price, bookName });
      await cartItem.save();
      res.status(201).json({ message: "Successfully added to cart!", cartItem });
    } catch (error) {
      console.error("Error adding cart item:", error);
      res.status(500).json({ error: "Failed to add cart item" });
    }
  });

  router.get("/cart-items/:email", async (req, res) => {
    try {
        const { email } = req.params;
        const cartItems = await CartItem.find({ email });
        res.status(200).json(cartItems);
    } catch (error) {
        console.error("Error fetching cart items:", error);
        res.status(500).json({ error: "Failed to fetch cart items" });
    }
});

router.post("/checkout/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // Find the cart item by ID
    const cartItem = await CartItem.findById(id);
    console.log(cartItem)
    if (!cartItem) {
      return res.status(404).json({ error: "Cart item not found" });
    }
    // Create a new order document
    const order = new Order({
      bookName: cartItem.bookName,
      bookId: cartItem.bookId,
      quantity: cartItem.quantity,
      price: cartItem.price,
      userEmail: cartItem.email 
    });
    await order.save();
    // Remove the cart item
    await CartItem.findByIdAndDelete(id);
    res.status(201).json({ message: "Item checked out successfully" });
  } catch (error) {
    console.error("Error checking out item:", error);
    res.status(500).json({ error: "Failed to checkout item (From backend)" });
  }
});

router.delete("/cart-items/:email", async (req, res) => {
  try {
    const { email } = req.params;
    // Delete all cart items for the given email
    await CartItem.deleteMany({ email });
    res.status(200).json({ message: "Cart emptied successfully" });
  } catch (error) {
    console.error("Error emptying cart:", error);
    res.status(500).json({ error: "Failed to empty cart" });
  }
});

// Add this to your existing router file (e.g., cartRoutes.js or create a new orderRoutes.js)
router.get("/orders/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const orders = await Order.find({ userEmail: email }).sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});


module.exports = router;
  