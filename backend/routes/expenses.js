import express from "express";
import Expense from "../models/Expense.js";

const router = express.Router();

// POST - Add new expense
router.post("/", async (req, res) => {
  try {
    const { title, amount, category, note } = req.body;

    const newExpense = new Expense({
      title,
      amount,
      category,
      note, // ✅ save note
    });

    await newExpense.save();
    res.status(201).json(newExpense);
  } catch (err) {
    res.status(500).json({ error: "Failed to add expense" });
  }
});

// DELETE - Delete an expense by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedExpense = await Expense.findByIdAndDelete(req.params.id);
    if (!deletedExpense) return res.status(404).json({ error: "Expense not found" });
    res.json({ message: "Expense deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete expense" });
  }
});

// PUT - Update an expense by ID
router.put("/:id", async (req, res) => {
  try {
    const { title, amount, category, note } = req.body;
    const updatedExpense = await Expense.findByIdAndUpdate(
      req.params.id,
      { title, amount, category, note },
      { new: true } // return the updated document
    );
    if (!updatedExpense) return res.status(404).json({ error: "Expense not found" });
    res.json(updatedExpense);
  } catch (err) {
    res.status(500).json({ error: "Failed to update expense" });
  }
});

// GET - Fetch all expenses
router.get("/", async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ createdAt: -1 });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch expenses" });
  }
});

export default router;
