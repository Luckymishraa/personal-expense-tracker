# **Personal Expense Tracker**
Personal Expense Tracker

A modern, responsive Expense Tracker built with React.js, Axios, and Tailwind CSS. Track your daily expenses, categorize them, and visualize spending patterns with charts. Includes CRUD operations, filtering, and real-time summaries.

---

# **Table of Contents**

- Features  
- Screenshots  
- Installation  
- Usage  
- Assumptions & Design  
- Sample Inputs/Outputs  
- Future Enhancements  

---

# **Features**

### Must-Have (Implemented)
- **Add Expense:** Enter title, amount, category, note, and date.  
- **View Expenses:** List of all expenses with category badges, notes, and timestamps.  
- **Edit Expense:** Modify any expense inline.  
- **Delete Expense:** Remove expenses with confirmation modal.  
- **Save Data:** Data persists via backend API (MongoDB).  
- **Validation:** Inline validation messages, positive amount check, required fields.  

### Optional / Good-to-Have (Implemented)
- **Categories:** Food, Travel, Shopping, Bills, Entertainment, Other.  
- **Filters:** By date range and category.  
- **Summary Reports:** Total spent and per-category breakdown.  
- **Charts:** Pie chart visualization of spending per category.  
- **Responsive & Modern UI:** Tailwind CSS with hover effects and gradients.  

---

# **Screenshots**

<img width="1440" height="900" alt="Screenshot 1" src="https://github.com/user-attachments/assets/941f1528-bc9f-41db-9f39-d7a3dcaffd06" />

<img width="1440" height="900" alt="Screenshot 2" src="https://github.com/user-attachments/assets/fabf7b71-5bbe-410a-a25a-a549f0b901f9" />

<img width="1440" height="900" alt="Screenshot 3" src="https://github.com/user-attachments/assets/619dd5db-a8c7-4c32-826f-9286ca9db5cd" />

<img width="495" height="688" alt="Screenshot 4" src="https://github.com/user-attachments/assets/35ae0e8c-92e7-48b5-9715-a2dc7fa6aff0" />

---

# **Installation**


Clone the repository:
git clone <https://github.com/Luckymishraa/personal-expense-tracker.git>
cd personal-expense-tracker

Install dependencies:
npm install

Start the backend (Node.js + Express + MongoDB):
cd backend
npm install
npm start

Start the frontend:
cd frontend
npm start

Open http://localhost:3000 in your browser.

### Usage
Add Expense: Click “Add Expense”, fill the form, and submit.
View Expenses: Check the expense list, use filters to narrow by category or date.
Edit/Delete Expense: Use Edit or Delete buttons in the expense cards.
Summary & Chart: See total expenses and category-wise pie chart update automatically.

### Assumptions & Design

Assumptions:
Each expense has a unique ID from the backend database.
Amount is in ₹ (INR).
Category must be selected; note is optional.
Date defaults to the current timestamp if not provided.

Design Choices:
Frontend: React.js + Tailwind CSS for responsive, modern UI.
Backend: REST API (Node.js + Express) with MongoDB for data persistence.
State Management: React useState and useEffect.
Charts: react-chartjs-2 for category visualization.
Validation: Inline, real-time feedback instead of alert()s.
Filters & Summaries: Client-side filtering and aggregation for instant updates.

### Sample Inputs / Outputs

Add Expense Input:
{
  "title": "Lunch at Cafe",
  "amount": 450,
  "category": "Food",
  "note": "With friends"
}

Sample Output (View Expenses):
Title	Amount	Category	Note	Date/Time
Lunch at Cafe	₹450	Food	With friends	2025-10-05 12:30
Movie Tickets	₹400	Entertainment	Avengers movie	2025-10-04 20:00

Chart Visualization:
Food: 38%
Entertainment: 62%

### Future Enhancements
User authentication and multi-user support.
Monthly and yearly reports with graphs.
Export to CSV / PDF functionality.
Recurring expenses and budget alerts.
