import { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function ViewExpenses() {
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [currentExpense, setCurrentExpense] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
    note: "",
  });

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [expenseToDelete, setExpenseToDelete] = useState(null);

  // Filters
  const [filterCategory, setFilterCategory] = useState("");
  const [filterStartDate, setFilterStartDate] = useState("");
  const [filterEndDate, setFilterEndDate] = useState("");

  const fetchExpenses = () => {
    axios
      .get("http://localhost:5000/api/expenses")
      .then((res) => {
        setExpenses(res.data);
        setFilteredExpenses(res.data);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  useEffect(() => {
    let filtered = [...expenses];
    if (filterCategory) {
      filtered = filtered.filter(
        (exp) => exp.category.toLowerCase() === filterCategory.toLowerCase()
      );
    }
    if (filterStartDate) {
      filtered = filtered.filter(
        (exp) => new Date(exp.createdAt) >= new Date(filterStartDate)
      );
    }
    if (filterEndDate) {
      filtered = filtered.filter(
        (exp) => new Date(exp.createdAt) <= new Date(filterEndDate)
      );
    }
    setFilteredExpenses(filtered);
  }, [filterCategory, filterStartDate, filterEndDate, expenses]);

  const getCategoryColor = (category) => {
    switch (category.toLowerCase()) {
      case "food":
        return "bg-green-100 text-green-700";
      case "travel":
        return "bg-blue-100 text-blue-700";
      case "shopping":
        return "bg-pink-100 text-pink-700";
      case "bills":
        return "bg-yellow-100 text-yellow-700";
      case "entertainment":
        return "bg-purple-100 text-purple-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const COLORS = ["#4ade80", "#60a5fa", "#f472b6", "#facc15", "#a78bfa", "#cbd5e1"];

  const openDeleteModal = (exp) => {
    setExpenseToDelete(exp);
    setIsDeleteOpen(true);
  };
  const confirmDelete = () => {
    axios
      .delete(`http://localhost:5000/api/expenses/${expenseToDelete._id}`)
      .then(() => {
        fetchExpenses();
        setIsDeleteOpen(false);
      })
      .catch((err) => console.error(err));
  };

  const handleEdit = (exp) => {
    setCurrentExpense(exp);
    setFormData({
      title: exp.title,
      amount: exp.amount,
      category: exp.category,
      note: exp.note || "",
    });
    setIsEditOpen(true);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/expenses/${currentExpense._id}`, formData)
      .then(() => {
        fetchExpenses();
        setIsEditOpen(false);
      })
      .catch((err) => console.error(err));
  };

  // --- Summary ---
  const totalExpenses = filteredExpenses.reduce((sum, exp) => sum + exp.amount, 0);
  const categorySummary = filteredExpenses.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
    return acc;
  }, {});
  const chartData = Object.keys(categorySummary).map((key) => ({
    name: key,
    value: categorySummary[key],
  }));

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-100 via-pink-50 to-yellow-100 py-10">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Your Expenses
      </h2>

      {/* Filters */}
      <div className="max-w-5xl mx-auto mb-8 px-4 flex flex-col md:flex-row gap-4 items-center justify-between bg-white shadow-md rounded-xl p-4">
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
        >
          <option value="">All Categories</option>
          <option value="Food">🍔 Food</option>
          <option value="Travel">✈️ Travel</option>
          <option value="Shopping">🛍️ Shopping</option>
          <option value="Bills">📑 Bills</option>
          <option value="Entertainment">🎬 Entertainment</option>
          <option value="Other">✨ Other</option>
        </select>

        <div className="flex gap-2">
          <input
            type="date"
            value={filterStartDate}
            onChange={(e) => setFilterStartDate(e.target.value)}
            className="border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
          />
          <input
            type="date"
            value={filterEndDate}
            onChange={(e) => setFilterEndDate(e.target.value)}
            className="border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Summary Cards */}
      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6 px-4 mb-10">
        <div className="bg-white shadow-md rounded-xl p-6 text-center">
          <h3 className="text-lg font-semibold text-gray-700">Total Spent</h3>
          <p className="text-2xl font-bold text-green-600 mt-2">₹{totalExpenses}</p>
        </div>
        {Object.keys(categorySummary).map((cat) => (
          <div key={cat} className="bg-white shadow-md rounded-xl p-6 text-center">
            <h3 className="text-lg font-semibold text-gray-700">{cat}</h3>
            <p className="text-xl font-bold mt-2">₹{categorySummary[cat]}</p>
          </div>
        ))}
      </div>

      {/* Chart */}
      {chartData.length > 0 && (
        <div className="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-6 mb-10">
          <h3 className="text-lg font-semibold text-gray-700 text-center mb-4">Spending by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Empty state */}
      {filteredExpenses.length === 0 && (
        <div className="text-center text-gray-500 text-lg mt-20">
          No expenses match the selected filters. 🧐
        </div>
      )}

      {/* Expense Grid */}
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 px-4">
        {filteredExpenses.map((exp) => (
          <div
            key={exp._id}
            className="bg-white shadow-md rounded-xl p-6 transform transition duration-300 hover:scale-105 hover:shadow-xl"
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-xl font-semibold text-gray-800">{exp.title}</h3>
              <span className="text-lg font-bold text-green-600">₹{exp.amount}</span>
            </div>

            <span
              className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${getCategoryColor(
                exp.category
              )}`}
            >
              {exp.category}
            </span>

            {exp.note && (
              <p className="text-gray-600 italic border-l-4 border-blue-500 pl-3 mt-3">
                “{exp.note}”
              </p>
            )}

            <p className="text-xs text-gray-400 mt-3">
              {new Date(exp.createdAt).toLocaleString()}
            </p>

            <div className="mt-4 flex gap-3">
              <button
                onClick={() => handleEdit(exp)}
                className="px-4 py-2 bg-yellow-400 text-yellow-900 rounded-lg hover:bg-yellow-500 transition transform hover:-translate-y-0.5"
              >
                Edit
              </button>
              <button
                onClick={() => openDeleteModal(exp)}
                className="px-4 py-2 bg-red-400 text-red-900 rounded-lg hover:bg-red-500 transition transform hover:-translate-y-0.5"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {isEditOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md relative transform transition duration-300 scale-95 animate-fadeIn">
            <h3 className="text-xl font-semibold mb-4">Edit Expense</h3>
            <form onSubmit={handleUpdate} className="space-y-3">
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Title"
                className="w-full border px-3 py-2 rounded-lg"
                required
              />
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="Amount"
                className="w-full border px-3 py-2 rounded-lg"
                required
              />
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Category"
                className="w-full border px-3 py-2 rounded-lg"
                required
              />
              <textarea
                name="note"
                value={formData.note}
                onChange={handleChange}
                placeholder="Note (optional)"
                className="w-full border px-3 py-2 rounded-lg"
              />
              <div className="flex justify-end gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => setIsEditOpen(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {isDeleteOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md relative transform transition duration-300 scale-95 animate-fadeIn">
            <h3 className="text-xl font-semibold mb-4 text-red-600">Confirm Delete</h3>
            <p className="mb-4">
              Are you sure you want to delete <strong>{expenseToDelete.title}</strong>?
            </p>
            <div className="flex justify-end gap-2 mt-2">
              <button
                onClick={() => setIsDeleteOpen(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
