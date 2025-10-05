Expense Tracker - Documentation
1. Assumptions

Amounts are numeric and greater than zero.

Each expense has a title, amount, category, optional note, and automatically generated date/time.

Categories are predefined: Food, Travel, Shopping, Bills, Entertainment, Other.

Notes are optional and limited to 200 characters.

Users can filter expenses by category or date range.

Editing and deleting expenses is allowed.

The app is responsive and works on desktop and mobile screens.

2. Design Overview
Frontend

Framework: React.js

Styling: Tailwind CSS, gradient backgrounds, hover effects, and modern UI.

Components:

AddExpense.jsx: Form for adding new expenses with inline validation.

ViewExpenses.jsx: Displays all expenses, allows filtering, editing, deleting, and shows charts & summary.

Navbar.jsx & Home.jsx: Navigation and home page UI.

Backend

API: Axios calls to backend endpoints (e.g., /api/expenses).

Storage: MongoDB (or JSON file if using local storage).

Endpoints:

POST /api/expenses → Add expense

GET /api/expenses → Fetch all expenses

PUT /api/expenses/:id → Update expense

DELETE /api/expenses/:id → Delete expense

Features

Add, view, edit, and delete expenses

Filter expenses by category or date range

Summary cards showing total spent and spending by category

Chart visualization for category-wise spending (pie chart)

Inline validation with clear messages

3. Sample Inputs & Outputs
Example 1: Adding an Expense

Input:

Title: Lunch
Amount: 150
Category: Food
Note: Lunch with team


Output in ViewExpenses:

Title: Lunch
Amount: ₹150
Category: Food (green badge)
Note: Lunch with team
Date: 05/10/2025, 12:30 PM

Example 2: Filtering

Filter: Category = Travel
Output: Displays only expenses tagged as Travel

Filter: Date range = 01/10/2025 to 05/10/2025
Output: Displays only expenses within that date range

Example 3: Summary & Charts
Total Spent: ₹1200
Food: ₹500
Travel: ₹300
Shopping: ₹400


Pie chart shows proportion of spending per category.

4. Notes

Validation ensures title, amount, and category are filled.

Notes are optional but limited to 200 characters.

The app is fully responsive and includes modern UI enhancements.

Inline validation replaces alerts for better UX.

