import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddExpense() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [note, setNote] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};

    if (!title.trim()) newErrors.title = "Title is required.";
    else if (title.length > 50) newErrors.title = "Title must be ≤ 50 characters.";

    if (!amount) newErrors.amount = "Amount is required.";
    else if (Number(amount) <= 0) newErrors.amount = "Amount must be positive.";

    if (!category) newErrors.category = "Category is required.";

    if (note.length > 200) newErrors.note = "Note must be ≤ 200 characters.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await axios.post("http://localhost:5000/api/expenses", {
        title: title.trim(),
        amount: Number(amount),
        category,
        note: note.trim(),
      });
      navigate("/viewexpenses");
    } catch (err) {
      console.error("Error adding expense:", err);
      setErrors({ submit: "Failed to add expense. Please try again." });
    }
  };

  const inputClass =
    "w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:outline-none shadow-sm transition duration-200 hover:shadow-md";

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-yellow-100 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-lg bg-white shadow-2xl rounded-2xl border border-gray-200 p-8 animate-fadeIn">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800">
          Add New Expense
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter expense title"
              className={inputClass}
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Amount <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className={inputClass}
            />
            {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount}</p>}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={inputClass + " bg-white"}
            >
              <option value="">Select category</option>
              <option value="Food">🍔 Food</option>
              <option value="Travel">✈️ Travel</option>
              <option value="Shopping">🛍️ Shopping</option>
              <option value="Bills">📑 Bills</option>
              <option value="Other">✨ Other</option>
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">{errors.category}</p>
            )}
          </div>

          {/* Note */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Note (Optional)
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Write any extra details..."
              rows="3"
              className={inputClass}
            />
            {errors.note && <p className="text-red-500 text-sm mt-1">{errors.note}</p>}
          </div>

          {/* Submit Error */}
          {errors.submit && <p className="text-red-500 text-center">{errors.submit}</p>}

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-semibold shadow-lg hover:from-purple-600 hover:to-pink-600 transition duration-300 transform hover:-translate-y-0.5"
          >
            ➕ Add Expense
          </button>
        </form>
      </div>
    </div>
  );
}
